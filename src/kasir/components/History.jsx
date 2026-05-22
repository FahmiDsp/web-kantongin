import React, { useState } from 'react';
import { Search, FileSpreadsheet, Printer, MessageSquare, Trash2, CheckCircle2, X, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function History({
  transactions,
  movements,
  settings,
  onPrintReceipt,
  onSendWhatsAppReceipt,
  onCancelTransaction,
  onRepayKasbon,
  onExportCsv,
  showToast,
  rupiah,
  numberOnly
}) {
  const [historySearch, setHistorySearch] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('Hari ini'); // 'Hari ini', '1 Minggu', '1 Bulan', '3 Bulan', '6 Bulan', '1 Tahun'
  const [salesTableLimit, setSalesTableLimit] = useState(10);
  const [kasbonPayModal, setKasbonPayModal] = useState(null); // transaction object

  // Helper date functions
  const startOfToday = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const startOfDaysAgo = (days) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - days);
    return d;
  };

  const startOfMonthsAgo = (months) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setMonth(d.getMonth() - months);
    return d;
  };

  const getPeriodStartDate = () => {
    switch (selectedPeriod) {
      case '1 Minggu': return startOfDaysAgo(7);
      case '1 Bulan': return startOfMonthsAgo(1);
      case '3 Bulan': return startOfMonthsAgo(3);
      case '6 Bulan': return startOfMonthsAgo(6);
      case '1 Tahun': return startOfMonthsAgo(12);
      case 'Hari ini':
      default:
        return startOfToday();
    }
  };

  const startDate = getPeriodStartDate();

  // Filter transactions and movements by date & search query
  const filteredTransactions = transactions.filter(t => {
    const tDate = new Date(t.date);
    if (tDate < startDate) return false;

    const query = historySearch.trim().toLowerCase();
    if (!query) return true;

    const itemsStr = t.items.map(i => i.name).join(' ');
    return [t.code, t.customerName, t.customerPhone, t.paymentMethod, itemsStr].some(field => 
      (field || '').toLowerCase().includes(query)
    );
  });

  const periodMovements = (movements || []).filter(m => {
    const mDate = new Date(m.date);
    return mDate >= startDate;
  });

  // Calculate metrics for selected period
  const omzetKotor = filteredTransactions.reduce((sum, t) => sum + t.total, 0);
  const totalTransaksi = filteredTransactions.length;
  const totalBarangTerjual = filteredTransactions.reduce(
    (sum, t) => sum + t.items.reduce((s, item) => s + item.qty, 0), 0
  );

  const labaKotor = filteredTransactions.reduce(
    (sum, t) => sum + t.items.reduce((s, item) => s + (numberOnly(item.profit || 0) * numberOnly(item.qty)), 0), 0
  );

  const kerugianExpired = periodMovements
    .filter(m => m.type === 'expired')
    .reduce((sum, m) => sum + (m.totalLoss || 0), 0);

  const labaBersih = labaKotor - kerugianExpired;

  // Repayment handles
  const handleOpenRepay = (trx) => {
    setKasbonPayModal({
      ...trx,
      _selectedMethod: 'Tunai'
    });
  };

  const handleConfirmRepay = () => {
    if (!kasbonPayModal) return;
    onRepayKasbon(kasbonPayModal.id, kasbonPayModal._selectedMethod);
    setKasbonPayModal(null);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Riwayat Penjualan & Laporan</h2>
          <p className="text-sm text-gray-500 mt-1">Pantau performa penjualan harian, laba kotor, kerugian expired, dan laba bersih.</p>
        </div>
      </div>

      {/* Period Filter Selector */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-6 flex flex-wrap gap-2.5 items-center">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-2">Rentang Waktu Laporan:</span>
        {['Hari ini', '1 Minggu', '1 Bulan', '3 Bulan', '6 Bulan', '1 Tahun'].map((period) => (
          <button
            key={period}
            type="button"
            onClick={() => {
              setSelectedPeriod(period);
              setSalesTableLimit(10); // reset table page limit
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              selectedPeriod === period
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {period}
          </button>
        ))}
        <button
          type="button"
          onClick={onExportCsv}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 outline-none ml-auto"
        >
          <FileSpreadsheet className="w-4 h-4" /> Ekspor Laporan CSV
        </button>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-sm">
          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Omzet Kotor</span>
          <strong className="text-sm font-extrabold text-gray-800 block truncate">{rupiah(omzetKotor)}</strong>
        </div>
        <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-sm">
          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Transaksi</span>
          <strong className="text-sm font-extrabold text-gray-800 block truncate">{totalTransaksi}</strong>
        </div>
        <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-sm">
          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Barang Terjual</span>
          <strong className="text-sm font-extrabold text-gray-800 block truncate">{totalBarangTerjual}</strong>
        </div>
        <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-sm">
          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Laba Kotor</span>
          <strong className="text-sm font-extrabold text-primary-600 block truncate">{rupiah(labaKotor)}</strong>
        </div>
        <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-sm">
          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 text-red-500">Kerugian Expired</span>
          <strong className="text-sm font-extrabold text-red-500 block truncate">-{rupiah(kerugianExpired)}</strong>
        </div>
        <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-sm bg-primary-50/30 border-primary-200">
          <span className="block text-[10px] font-bold text-primary-600 uppercase tracking-wider mb-1">Laba Bersih</span>
          <strong className={`text-sm font-extrabold block truncate ${labaBersih >= 0 ? 'text-primary-700' : 'text-red-600'}`}>
            {rupiah(labaBersih)}
          </strong>
        </div>
      </div>

      {/* Transaction History Table Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h3 className="font-bold text-gray-800">Daftar Transaksi</h3>
            <p className="text-xs text-gray-500 mt-0.5">Menampilkan {Math.min(salesTableLimit, filteredTransactions.length)} dari {filteredTransactions.length} transaksi</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari kode, nama, item..." 
              value={historySearch}
              onChange={(e) => {
                setHistorySearch(e.target.value);
                setSalesTableLimit(10);
              }}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:border-primary-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap border-collapse">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-5 py-3 border-b border-gray-100">Kode</th>
                <th className="px-5 py-3 border-b border-gray-100">Tanggal</th>
                <th className="px-5 py-3 border-b border-gray-100">Pelanggan</th>
                <th className="px-5 py-3 border-b border-gray-100">Item Belanja</th>
                <th className="px-5 py-3 border-b border-gray-100 text-right">Total</th>
                <th className="px-5 py-3 border-b border-gray-100 text-center">Status</th>
                <th className="px-5 py-3 border-b border-gray-100 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-5 py-12 text-center text-gray-500">
                    Tidak ada transaksi dalam periode ini.
                  </td>
                </tr>
              ) : (
                filteredTransactions.slice(0, salesTableLimit).map((t) => {
                  const isUnpaidKasbon = t.paymentMethod === 'Kasbon' && t.paid < t.total;
                  return (
                    <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <strong className="font-mono text-xs text-gray-800">{t.code}</strong>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-gray-500">
                        {new Date(t.date).toLocaleString('id-ID')}
                      </td>
                      <td className="px-5 py-3.5">
                        <div>
                          <strong className="text-gray-800 block text-xs">{t.customerName || 'Umum'}</strong>
                          {t.customerPhone && <span className="text-[10px] text-gray-400 block">{t.customerPhone}</span>}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 max-w-xs truncate">
                        <span className="text-gray-600 font-medium text-xs">
                          {t.items.map(i => `${i.name} (${i.qty})`).join(', ')}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right font-bold text-gray-850">
                        {rupiah(t.total)}
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        {isUnpaidKasbon ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-600 font-bold text-[10px]">
                            Belum Lunas (Kasbon)
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full bg-green-50 border border-green-200 text-green-700 font-bold text-[10px]">
                            Lunas {t.kasbonPaidMethod ? `via ${t.kasbonPaidMethod}` : `(${t.paymentMethod})`}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="inline-flex gap-1.5">
                          {isUnpaidKasbon && (
                            <button
                              onClick={() => handleOpenRepay(t)}
                              className="px-2 py-1 bg-accent-500 hover:bg-accent-600 text-white text-xs font-bold rounded-lg transition-all active:scale-95"
                            >
                              Lunasi
                            </button>
                          )}
                          <button
                            onClick={() => onPrintReceipt(t)}
                            className="p-1 px-2 border border-gray-200 hover:bg-gray-50 rounded-lg text-gray-600 transition-all"
                            title="Cetak Struk"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                          {t.customerPhone && (
                            <button
                              onClick={() => onSendWhatsAppReceipt(t)}
                              className="p-1 px-2 border border-gray-200 hover:bg-gray-50 rounded-lg text-green-600 transition-all"
                              title="Kirim WA"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() => onCancelTransaction(t.id)}
                            className="p-1 px-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-500 transition-all border border-red-100"
                            title="Batalkan Pesanan"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Load More Button */}
        {filteredTransactions.length > salesTableLimit && (
          <div className="p-4 border-t border-gray-100 text-center bg-gray-50/50">
            <button
              onClick={() => setSalesTableLimit(salesTableLimit + 10)}
              className="px-4 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs rounded-xl shadow-sm transition-all active:scale-95"
            >
              Tampilkan Lebih Banyak
            </button>
          </div>
        )}
      </div>

      {/* Repayment Modal (Lunasi Kasbon) */}
      {kasbonPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4" id="kasbonPayOverlay">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Pelunasan Kasbon</h3>
              <button onClick={() => setKasbonPayModal(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="bg-accent-50 border border-accent-200 p-3.5 rounded-xl text-center">
                <span className="block text-xs font-bold text-accent-500 uppercase tracking-wider mb-0.5">Sisa Hutang Kasbon</span>
                <strong className="text-2xl font-extrabold text-accent-700">{rupiah(kasbonPayModal.total)}</strong>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-2">Metode Pembayaran Pelunasan</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Tunai', 'QRIS'].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setKasbonPayModal({ ...kasbonPayModal, _selectedMethod: method })}
                      className={`py-3 border-2 rounded-xl text-xs font-bold transition-all ${
                        kasbonPayModal._selectedMethod === method
                          ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm'
                          : 'border-gray-200 bg-white text-gray-650 hover:bg-gray-50'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* QRIS Repay Code Preview */}
              {kasbonPayModal._selectedMethod === 'QRIS' && (
                <div className="mt-2 flex flex-col items-center">
                  {settings.qrisImage ? (
                    <img src={settings.qrisImage} alt="QRIS" className="w-48 h-48 object-contain border rounded-lg bg-white p-2" />
                  ) : (
                    <div className="w-full text-center border-2 border-dashed border-gray-200 rounded-lg p-6 bg-gray-50">
                      <span className="block text-xs font-semibold text-gray-400">QRIS Toko belum diset</span>
                    </div>
                  )}
                </div>
              )}

              <button 
                onClick={handleConfirmRepay}
                className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 mt-2 flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" /> Konfirmasi Pelunasan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
