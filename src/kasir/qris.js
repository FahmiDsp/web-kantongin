/**
 * QRIS Dynamic Utility
 *
 * Mengubah string QRIS statis menjadi dinamis dengan menyisipkan nominal transaksi.
 * Berdasarkan standar EMVCo Merchant Presented QR Code Specification.
 *
 * Tag penting QRIS:
 *  - 00: Payload Format Indicator ("01")
 *  - 01: Point of Initiation Method ("11" = statis, "12" = dinamis)
 *  - 26-51: Merchant Account Information
 *  - 52: Merchant Category Code
 *  - 53: Transaction Currency ("360" = IDR)
 *  - 54: Transaction Amount (nominal)
 *  - 58: Country Code ("ID")
 *  - 59: Merchant Name
 *  - 60: Merchant City
 *  - 63: CRC (CRC-16/CCITT-FALSE)
 */

/**
 * Hitung CRC-16/CCITT-FALSE checksum
 * Polynomial: 0x1021, Initial: 0xFFFF
 * @param {string} str - String input
 * @returns {string} 4-digit hex CRC uppercase
 */
export function crc16ccitt(str) {
  let crc = 0xffff;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
    }
    crc &= 0xffff;
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

/**
 * Parse string QRIS menjadi array TLV objects
 * @param {string} qrisString - String QRIS mentah
 * @returns {Array<{tag: string, length: string, value: string}>}
 */
export function parseTLV(qrisString) {
  const tlvs = [];
  let pos = 0;

  while (pos < qrisString.length) {
    if (pos + 4 > qrisString.length) break;

    const tag = qrisString.substring(pos, pos + 2);
    const length = qrisString.substring(pos + 2, pos + 4);
    const len = parseInt(length, 10);

    if (isNaN(len) || pos + 4 + len > qrisString.length) break;

    const value = qrisString.substring(pos + 4, pos + 4 + len);
    tlvs.push({ tag, length, value });
    pos += 4 + len;
  }

  return tlvs;
}

/**
 * Bangun kembali string dari array TLV
 * @param {Array<{tag: string, value: string}>} tlvs
 * @returns {string}
 */
export function buildTLV(tlvs) {
  return tlvs
    .map(({ tag, value }) => {
      const len = value.length.toString().padStart(2, '0');
      return `${tag}${len}${value}`;
    })
    .join('');
}

/**
 * Generate string QRIS dinamis dari string QRIS statis + nominal
 *
 * Langkah:
 * 1. Parse TLV dari string statis
 * 2. Ubah Tag 01 dari "11" (statis) → "12" (dinamis)
 * 3. Hapus Tag 54 lama (jika ada)
 * 4. Sisipkan Tag 54 baru dengan nominal
 * 5. Hapus Tag 63 lama (CRC)
 * 6. Rebuild string + hitung CRC baru
 *
 * @param {string} staticQris - String QRIS statis
 * @param {number} amount - Nominal transaksi (dalam Rupiah, bilangan bulat)
 * @returns {string} String QRIS dinamis
 */
export function generateDynamicQRIS(staticQris, amount) {
  if (!staticQris || !amount || amount <= 0) return staticQris;

  let tlvs = parseTLV(staticQris.trim());

  if (tlvs.length === 0) return staticQris;

  // 1. Ubah Tag 01 (Point of Initiation Method) → "12" (dinamis)
  tlvs = tlvs.map((t) => {
    if (t.tag === '01') {
      return { ...t, value: '12' };
    }
    return t;
  });

  // Jika Tag 01 belum ada, tambahkan setelah Tag 00
  if (!tlvs.find((t) => t.tag === '01')) {
    const idx00 = tlvs.findIndex((t) => t.tag === '00');
    tlvs.splice(idx00 + 1, 0, { tag: '01', value: '12' });
  }

  // 2. Hapus Tag 54 lama (Transaction Amount) jika ada
  tlvs = tlvs.filter((t) => t.tag !== '54');

  // 3. Hapus Tag 63 (CRC) — akan dihitung ulang
  tlvs = tlvs.filter((t) => t.tag !== '63');

  // 4. Sisipkan Tag 54 (Transaction Amount) sebelum Tag 58 (Country Code)
  //    Jika Tag 58 tidak ditemukan, sisipkan sebelum tag terakhir
  const amountStr = amount.toString();
  const tag54 = { tag: '54', value: amountStr };

  const idx58 = tlvs.findIndex((t) => t.tag === '58');
  if (idx58 >= 0) {
    tlvs.splice(idx58, 0, tag54);
  } else {
    // Fallback: sisipkan sebelum elemen terakhir
    tlvs.splice(tlvs.length, 0, tag54);
  }

  // 5. Rebuild string tanpa CRC
  let built = buildTLV(tlvs);

  // 6. Tambahkan Tag 63 placeholder + hitung CRC
  built += '6304';
  const crc = crc16ccitt(built);
  built += crc;

  return built;
}

/**
 * Validasi apakah string terlihat seperti QRIS yang valid
 * @param {string} str - String yang akan divalidasi
 * @returns {{valid: boolean, message: string}}
 */
export function isValidQRIS(str) {
  if (!str || typeof str !== 'string') {
    return { valid: false, message: 'String QRIS tidak boleh kosong.' };
  }

  const trimmed = str.trim();

  // Harus dimulai dengan Payload Format Indicator "000201"
  if (!trimmed.startsWith('000201')) {
    return { valid: false, message: 'Format tidak valid. String QRIS harus dimulai dengan "000201".' };
  }

  // Harus mengandung Tag 63 (CRC) — minimal 8 karakter terakhir: "6304XXXX"
  if (trimmed.length < 20) {
    return { valid: false, message: 'String QRIS terlalu pendek.' };
  }

  // Cek apakah mengandung "6304" (tag CRC)
  const crcIdx = trimmed.lastIndexOf('6304');
  if (crcIdx < 0) {
    return { valid: false, message: 'Tag CRC (6304) tidak ditemukan dalam string QRIS.' };
  }

  // Verifikasi CRC
  const withoutCrc = trimmed.substring(0, crcIdx + 4);
  const existingCrc = trimmed.substring(crcIdx + 4, crcIdx + 8);
  const calculatedCrc = crc16ccitt(withoutCrc);

  if (existingCrc.toUpperCase() !== calculatedCrc) {
    return {
      valid: false,
      message: `CRC tidak cocok. Diharapkan: ${calculatedCrc}, ditemukan: ${existingCrc.toUpperCase()}. Pastikan string QRIS disalin dengan benar.`,
    };
  }

  // Cek Tag 53 (Currency) — harus "360" (IDR)
  if (!trimmed.includes('5303360')) {
    return { valid: false, message: 'Mata uang bukan IDR (Tag 53 ≠ 360). Pastikan ini QRIS Indonesia.' };
  }

  return { valid: true, message: 'String QRIS valid ✓' };
}
