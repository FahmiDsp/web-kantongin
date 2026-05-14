# 🛒 Kantongin — Kasir Niaga Toko Klontong dan Lainnya

**Kantongin** adalah solusi aplikasi kasir digital *all-in-one* berbasis web (Full-Stack) yang dirancang khusus untuk mempermudah pencatatan transaksi, manajemen stok, dan pemantauan keuangan bagi warung, toko kelontong, dan UMKM.

![Versi](https://img.shields.io/badge/version-2.0.0-blue)
![Status](https://img.shields.io/badge/status-Aktif-success)
![Lisensi](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Fitur Unggulan

| Fitur | Keterangan |
|-------|-----------|
| 🔐 **Multi-Toko dengan OTP** | 1 akun = 1 toko. Login & registrasi dilindungi OTP 6 digit via email |
| 👑 **Panel Super Admin** | Dashboard pusat untuk memantau seluruh toko, jumlah barang, transaksi, dan reset password |
| 🛒 **Kasir Cepat (POS)** | Antarmuka kasir responsif dengan diskon, PPN otomatis, Tunai, QRIS, dan Kasbon |
| 📦 **Manajemen Inventori** | Kelola barang, kategori, harga modal vs harga jual, peringatan stok rendah/habis |
| ⏰ **Buang Stok Expired** | Form khusus untuk mencatat barang expired/rusak, otomatis kurangi stok dan catat kerugian |
| 📊 **Pencatatan Penjualan** | Ringkasan omzet per periode dengan **+Keuntungan**, **-Kerugian Expired**, dan **Keuntungan Bersih** |
| 📋 **Tabel Laporan Detail** | Tabel lengkap semua transaksi & expired dengan kolom untung/rugi/bersih + pagination |
| 🧾 **Struk Digital & Cetak** | Cetak struk thermal atau kirim via WhatsApp pelanggan |
| 📥 **Export CSV** | Download seluruh data laporan ke CSV (Excel) termasuk data expired |
| 🍽️ **Dine In / Take Away** | Pilihan tipe pesanan di setiap transaksi |

---

## 🚀 Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan arsitektur **Full-Stack JavaScript** yang ringan, tanpa *framework* berat.

### Frontend (Antarmuka)
- **HTML5 & CSS3** — Struktur halaman dan *styling*
- **Tailwind CSS** (CDN) — Utility-first CSS untuk *styling* cepat & responsif
- **Vanilla JavaScript** — Seluruh logika UI dikelola secara murni tanpa React/Vue
- **Google Fonts (Inter)** — Tipografi modern dan bersih

### Backend (Server)
- **Node.js** — Lingkungan *runtime* JavaScript
- **Express.js** — *Routing* REST API
- **JSON Web Token (JWT)** — Autentikasi sesi yang aman
- **Nodemailer** — Pengiriman email OTP otomatis via SMTP Gmail
- **MongoDB Atlas** — Cloud database NoSQL untuk skalabilitas & Serverless

### Hosting
- **Vercel** — Deploy otomatis dari GitHub dengan Serverless Functions

---

## 📁 Struktur Proyek

```
web kantongin/
│
├── index.html              # Landing page / company profile
├── style.css               # CSS untuk landing page
├── script.js               # JS untuk landing page (animasi, dll)
├── app.js                  # (legacy, tidak digunakan)
│
├── assets/
│   └── images/             # Gambar logo, fitur, dll untuk landing page
│
├── kasir/                  # Aplikasi kasir utama (SPA)
│   ├── index.html          # Entry point aplikasi kasir
│   ├── app.js              # Seluruh logika aplikasi kasir (~2500 baris)
│   ├── styles.css           # Styling tambahan untuk struk & print
│   └── database.json       # (legacy/backup data lokal)
│
├── api/
│   └── index.js            # Backend REST API (Express + MongoDB + JWT)
│
├── vercel.json             # Konfigurasi deploy Vercel (rewrites API)
├── package.json            # Dependency Node.js
└── README.md               # Dokumentasi ini
```

---

## 🔍 Penjelasan Kode

### 1. Backend API — `api/index.js`

File ini adalah server Express.js yang menangani semua operasi backend:

```
api/index.js (213 baris)
├── Koneksi MongoDB          → Auto-connect saat request pertama masuk
├── Konfigurasi Nodemailer   → SMTP Gmail untuk kirim OTP
├── Middleware authenticate  → Verifikasi JWT token di setiap request
│
├── POST /api/register/request-otp  → Kirim OTP ke email untuk registrasi
├── POST /api/register/verify       → Verifikasi OTP dan buat akun baru
├── POST /api/login/request-otp     → Kirim OTP ke email untuk login
├── POST /api/login/verify          → Verifikasi OTP dan kembalikan JWT token
│
├── GET  /api/store          → Ambil data toko (products, transactions, movements, settings)
├── POST /api/store          → Simpan/sync data toko ke MongoDB
│
├── GET  /api/admin/users    → [Admin] Lihat semua pengguna terdaftar
└── POST /api/admin/users/:id/reset-password → [Admin] Reset password user
```

**Alur autentikasi:**
```
User → Masukkan username/password → Server kirim OTP ke email
     → User masukkan OTP → Server verifikasi → Kembalikan JWT token
     → Token dipakai untuk semua request berikutnya
```

**Data toko disimpan per-user di MongoDB:**
```json
{
  "userId": "usr_xxxxx",
  "products": [...],        // Daftar barang
  "transactions": [...],    // Riwayat transaksi
  "movements": [...],       // Riwayat stok masuk & expired
  "settings": {             // Pengaturan toko
    "storeName": "...",
    "storeAddress": "...",
    "storePhoto": "...",    // Base64
    "qrisImage": "...",     // Base64
    "taxPercent": 11
  }
}
```

---

### 2. Aplikasi Kasir — `kasir/app.js`

Ini adalah jantung aplikasi. Seluruh UI di-render secara dinamis menggunakan **Vanilla JS** dengan pendekatan *reactive state-based rendering* (mirip React, tapi tanpa framework).

#### A. State Management (Baris 63-92)

```javascript
const state = {
  activeView: "cashier",     // View aktif: cashier | dashboard | history
  products: [],              // Daftar produk
  transactions: [],          // Riwayat transaksi
  movements: [],             // Riwayat stok masuk & expired
  settings: {...},           // Pengaturan toko
  cart: [],                  // Keranjang belanja
  search: "",                // Pencarian kasir
  paymentMethod: "Tunai",    // Metode bayar: Tunai | QRIS | Kasbon
  salesTableLimit: 10,       // Pagination tabel laporan
  // ... state lainnya
};
```

Setiap perubahan state diikuti pemanggilan `render()` yang akan membangun ulang seluruh HTML berdasarkan state terkini.

#### B. Sistem Rendering (Baris ~327-464)

```
render()
├── Jika belum login    → renderAuth()        // Form login/register/OTP
├── Jika admin          → renderAdminView()    // Dashboard admin
└── Jika user biasa     → Layout utama
    ├── Header + Navigasi (Kasir | Dashboard | Riwayat)
    └── renderActiveView()
        ├── "cashier"   → renderCashier()
        ├── "dashboard" → renderDashboard()
        └── "history"   → renderHistory()
```

#### C. Fitur Kasir — `renderCashier()` (Baris ~738-881)

Halaman utama kasir terdiri dari 2 kolom:
- **Kiri:** Daftar barang dengan filter kategori dan pencarian
- **Kanan:** Keranjang belanja dengan:
  - Input pelanggan & nomor WA
  - Pilihan Dine In / Take Away
  - Diskon, metode pembayaran, nominal
  - Ringkasan (subtotal, diskon, PPN, total, kembali)
  - Tombol "Selesaikan" dan "Uang Pas"

**Alur transaksi:**
```
Pilih barang → Masuk keranjang → Atur qty → Isi pembayaran
→ Klik "Selesaikan" → Stok otomatis berkurang → Transaksi tersimpan
→ Struk muncul (bisa cetak / kirim WA)
```

#### D. Dashboard Barang — `renderDashboard()` (Baris ~994-1070)

```
renderDashboard()
├── Metric Cards (Total barang, Nilai stok, Stok rendah, Penjualan hari ini)
├── renderSalesOverview()   → Ringkasan penjualan per periode (6 kartu)
│   └── Setiap kartu menampilkan:
│       ├── Omzet (revenue)
│       ├── + Keuntungan kotor (hijau)
│       ├── - Kerugian expired (merah)
│       └── Keuntungan Bersih (emerald/merah)
├── renderSalesTable()      → Tabel detail laporan penjualan
│   └── Kolom: Tanggal | Kode | Keterangan | Pelanggan | Metode | Total | +Untung | -Rugi | Bersih
│   └── Pagination: 10 baris per halaman + tombol "Tampilkan Lainnya"
│   └── Footer: Total keseluruhan
├── Form Tambah/Ubah Barang
├── Form Tambah Stok
├── Form Buang Stok (Expired)    → Kurangi stok + catat kerugian di harga modal
├── Pengaturan Pembayaran (PPN, QRIS)
├── Profil Toko (Nama, Alamat, Logo)
└── Tabel Inventori (dengan aksi quick-stock, edit, hapus)
```

#### E. Perhitungan Keuangan — `salesSummaryFrom()` (Baris ~302-320)

```javascript
function salesSummaryFrom(startDate) {
  // 1. Filter transaksi dari startDate
  // 2. Filter movements expired dari startDate
  // 3. Hitung:
  //    - revenue      = total semua transaksi
  //    - grossProfit   = Σ (profit per item × qty)
  //    - expiredLoss   = Σ (harga modal × qty dibuang)
  //    - netProfit     = grossProfit - expiredLoss
}
```

**Periode yang tersedia:** Hari ini, 1 Minggu, 1 Bulan, 3 Bulan, 6 Bulan, 1 Tahun.

#### F. Sistem Expired — `handleExpiredStock()` (Baris ~2186-2222)

Ketika barang dibuang karena expired:
1. Stok produk **dikurangi** sesuai jumlah yang dibuang
2. Movement baru dicatat dengan `type: 'expired'`
3. Kerugian dihitung dari **harga modal (costPrice) × qty**
4. Kerugian muncul sebagai **minus (-)** di Pencatatan Penjualan
5. **Keuntungan Bersih** = Keuntungan dari penjualan − Kerugian expired

```javascript
// Contoh data movement expired:
{
  id: "exp-abc12345",
  date: "2026-05-14T...",
  type: "expired",
  productId: "prd-xxx",
  productName: "Mie Instan Goreng",
  quantity: 10,
  costPerUnit: 2800,      // Harga modal per unit
  totalLoss: 28000,       // Total kerugian
  note: "Kadaluarsa"
}
```

#### G. Tabel Laporan Penjualan — `renderSalesTable()` (Baris ~1132-1255)

Tabel ini menggabungkan **transaksi penjualan** dan **pencatatan expired** dalam satu tabel:

| Tipe | Kode | + Untung | - Rugi | Bersih |
|------|------|----------|--------|--------|
| Penjualan | TRX-2026... | +Rp7.000 | - | +Rp7.000 |
| Expired | EXP-abc... | - | -Rp28.000 | -Rp28.000 |
| **Total** | | **+Rp7.000** | **-Rp28.000** | **-Rp21.000** |

- Baris expired ditandai dengan background merah muda dan ikon ⏰
- Footer menampilkan total keseluruhan
- Default menampilkan **10 baris**, tombol "Tampilkan Lainnya" untuk load lebih

#### H. Sinkronisasi Data — `saveAll()` (Baris ~144-169)

```
saveAll()
├── Simpan ke localStorage (backup lokal)
└── POST /api/store (sync ke MongoDB Atlas)
    └── Body: { products, transactions, movements, settings }
```

Data di-sync ke server setiap kali ada perubahan (tambah barang, transaksi selesai, stok masuk, expired, dll).

#### I. Export CSV — `exportToCSV()` (Baris ~2340-2400)

Menghasilkan file CSV dengan kolom:
```
Kode Transaksi | Tanggal | Pelanggan | Tipe Pesanan | Item | Subtotal | 
Diskon | PPN | Total | Metode Pembayaran | Keuntungan Kotor
```
- Baris transaksi normal memiliki keuntungan **positif**
- Baris expired ditambahkan di bawah dengan keuntungan **negatif** (`-totalLoss`)

---

### 3. Landing Page — `index.html` + `style.css` + `script.js`

Halaman pemasaran/*company profile* dengan fitur:
- **Loading screen** animasi logo
- **Navbar** responsif dengan hamburger menu mobile
- **Hero section** dengan animasi mockup window dan floating cards
- **Fitur section** — 4 kartu fitur utama dengan animasi reveal on scroll
- **Tentang section** — Animasi mesin POS dengan floating coins
- **Footer** — Branding, tech stack icons (SVG), dan link sosial media

### 4. Konfigurasi Vercel — `vercel.json`

```json
{
  "version": 2,
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/index.js" }
  ]
}
```
Semua request ke `/api/*` diarahkan ke satu file Serverless Function (`api/index.js`).

---

## 📦 Cara Instalasi & Menjalankan Lokal

### 1. Persyaratan
- **Node.js** (v18+)
- Akun **MongoDB Atlas** (untuk cloud database)
- Akun **Gmail** + App Password (untuk OTP)

### 2. Instalasi
```bash
# Clone repository
git clone https://github.com/FahmiDsp/kantongin.git
cd kantongin

# Install dependencies
npm install
```

### 3. Konfigurasi Backend
Buka `api/index.js` dan ubah:
- **`MONGODB_URI`** — Connection string MongoDB Atlas Anda
- **`transporter.auth.user`** — Email Gmail Anda
- **`transporter.auth.pass`** — App Password Gmail (bukan password biasa)

### 4. Jalankan Server
```bash
node api/index.js
# ✅ Backend berjalan di http://localhost:3000
```

### 5. Jalankan Frontend
- Buka folder proyek di **VS Code**
- Install ekstensi **Live Server**
- Klik kanan `index.html` → *Open with Live Server*
- Atau buka `kasir/index.html` untuk langsung ke aplikasi kasir

---

## 🔐 Akses Panel Super Admin

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `Fahmi12345#` |

> **Catatan:** Akun admin otomatis dibuat saat server pertama kali menyala. Ubah email admin di `api/index.js` sebelum menjalankan server.

---

## ☁️ Deploy ke Vercel

Proyek ini sudah dikonfigurasi untuk Vercel:

1. Push kode ke GitHub
2. Hubungkan repository di [vercel.com](https://vercel.com)
3. Tambahkan Environment Variable `MONGODB_URI` di Vercel Dashboard
4. Deploy otomatis setiap push ke `main`

---

## 👨‍💻 Dikembangkan Oleh

**Fahmi Dwisaputro** © 2026

Proyek ini dibuat dengan ❤️ menggunakan kombinasi HTML, CSS, JavaScript Murni, dan Node.js.
