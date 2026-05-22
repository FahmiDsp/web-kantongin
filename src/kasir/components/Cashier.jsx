import React, { useState } from 'react';
import { Search, ShoppingCart, Trash2, Plus, Minus, Phone, Printer, MessageSquare, PlusCircle, AlertCircle } from 'lucide-react';

export default function Cashier({
  products,
  cart,
  setCart,
  settings,
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  paymentReceived,
  setPaymentReceived,
  paymentMethod,
  setPaymentMethod,
  discount,
  setDiscount,
  latestReceipt,
  setLatestReceipt,
  onFinishSale,
  onPrintReceipt,
  onSendWhatsAppReceipt,
  showToast,
  rupiah,
  numberOnly,
  uid
}) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [qrisPayModal, setQrisPayModal] = useState(false);

  // Dynamic categories
  const categories = ['Semua', ...Array.from(new Set(products.map(p => p.category))).sort()];

  // Filter products
  const query = search.trim().toLowerCase();
  const filteredProducts = products
    .filter(product => selectedCategory === 'Semua' || product.category === selectedCategory)
    .filter(product => {
      if (!query) return true;
      return [product.name, product.sku, product.category].some(item => 
        (item || '').toLowerCase().includes(query)
      );
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  // Cart calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const calculatedDiscount = Math.min(numberOnly(discount), subtotal);
  const taxableAmount = subtotal - calculatedDiscount;
  const taxPercent = numberOnly(settings.taxPercent);
  const tax = Math.round(taxableAmount * (taxPercent / 100));
  const total = taxableAmount + tax;
  const paid = paymentMethod === 'Kasbon' ? 0 : numberOnly(paymentReceived);
  const change = paymentMethod === 'Kasbon' ? 0 : Math.max(0, paid - total);

  const canComplete = cart.length > 0 && total > 0 && (paymentMethod === 'Kasbon' || paid >= total);

  const handleAddToCart = (product) => {
    if (product.stock <= 0) {
      showToast('Stok barang tidak tersedia.', 'error');
      return;
    }
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      if (existing.qty >= product.stock) {
        showToast('Jumlah di keranjang sudah sama dengan stok tersedia.', 'warning');
        return;
      }
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        sku: product.sku,
        price: product.price,
        costPrice: product.costPrice || product.price,
        profit: product.profit || 0,
        qty: 1
      }]);
    }
    setLatestReceipt(null);
  };

  const handleUpdateQty = (productId, action) => {
    const item = cart.find(cartItem => cartItem.id === productId);
    const product = products.find(p => p.id === productId);
    if (!item) return;

    if (action === 'increase') {
      if (product && item.qty >= product.stock) {
        showToast('Stok tidak cukup untuk menambah jumlah.', 'warning');
        return;
      }
      setCart(cart.map(i => i.id === productId ? { ...i, qty: i.qty + 1 } : i));
    } else if (action === 'decrease') {
      if (item.qty <= 1) {
        setCart(cart.filter(i => i.id !== productId));
      } else {
        setCart(cart.map(i => i.id === productId ? { ...i, qty: i.qty - 1 } : i));
      }
    } else if (action === 'remove') {
      setCart(cart.filter(i => i.id !== productId));
    }
  };

  const handleClearCart = () => {
    setCart([]);
    setCustomerName('');
    setCustomerPhone('');
    setPaymentReceived(0);
    setDiscount(0);
    setPaymentMethod('Tunai');
  };

  const handleCompleteSale = () => {
    if (paymentMethod === 'QRIS') {
      if (paid < total) {
        showToast('Nominal QRIS masih kurang.', 'error');
        return;
      }
      setQrisPayModal(true);
    } else {
      onFinishSale({ subtotal, discount: calculatedDiscount, taxPercent, tax, total, paid, change });
    }
  };

  const handleConfirmQrisPay = () => {
    setQrisPayModal(false);
    onFinishSale({ subtotal, discount: calculatedDiscount, taxPercent, tax, total, paid, change });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Kasir Penjualan</h2>
          <p className="text-sm text-gray-500 mt-1">Pilih barang, atur jumlah, lalu selesaikan pembayaran.</p>
        </div>
      </div>
      
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 items-start">
        {/* Katalog Barang */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-gray-100 bg-gray-50/50">
            <div>
              <h3 className="font-bold text-gray-800">Daftar Barang</h3>
              <p className="text-xs text-gray-500 mt-0.5">{filteredProducts.length} barang tersedia</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input 
                type="text"
                placeholder="Cari nama, SKU, kategori..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Kategori Navigation */}
          <div className="flex gap-2 p-4 overflow-x-auto border-b border-gray-100 bg-white hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Barang */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <AlertCircle className="w-10 h-10 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">Tidak ada barang yang cocok.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
              {filteredProducts.map((product) => {
                const isOutOfStock = product.stock <= 0;
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    disabled={isOutOfStock}
                    className={`flex flex-col text-left border rounded-xl overflow-hidden transition-all bg-white p-3 group relative ${
                      isOutOfStock
                        ? 'opacity-50 border-gray-150 bg-gray-50 cursor-not-allowed'
                        : 'border-gray-200 hover:border-primary-500 hover:shadow-md active:scale-98'
                    }`}
                  >
                    {/* Media foto/ikon */}
                    <div className="w-full h-24 rounded-lg bg-gray-50 flex items-center justify-center mb-3 overflow-hidden text-2xl relative">
                      {product.photo ? (
                        <img 
                          src={product.photo} 
                          alt={product.name} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div 
                          className="w-full h-full flex items-center justify-center text-white text-lg font-bold"
                          style={{ backgroundColor: product.color || '#15803d' }}
                        >
                          {product.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      {product.stock <= product.minStock && !isOutOfStock && (
                        <span className="absolute top-1 right-1 bg-amber-500 text-white font-bold text-[9px] px-1.5 py-0.5 rounded-full shadow-sm">
                          Stok Tipis
                        </span>
                      )}
                      {isOutOfStock && (
                        <span className="absolute inset-0 bg-gray-900/60 flex items-center justify-center text-white font-extrabold text-xs uppercase tracking-wider">
                          Habis
                        </span>
                      )}
                    </div>
                    
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate mb-0.5">
                      {product.sku || 'TANPA SKU'}
                    </span>
                    <strong className="block text-sm text-gray-800 group-hover:text-primary-700 transition-colors line-clamp-1">
                      {product.name}
                    </strong>
                    <div className="flex justify-between items-center mt-auto pt-2">
                      <span className="text-xs font-bold text-primary-600">
                        {rupiah(product.price)}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        Stok: <strong className="text-gray-600 font-bold">{product.stock}</strong>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Keranjang Belanja */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary-600" />
              <h3 className="font-bold text-gray-800">Keranjang Belanja</h3>
            </div>
            {cart.length > 0 && (
              <button
                type="button"
                onClick={handleClearCart}
                className="text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg transition-all"
              >
                Hapus Semua
              </button>
            )}
          </div>

          <div className="p-4 border-b border-gray-100 bg-white">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Nama Pelanggan</label>
                <input 
                  type="text" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Umum" 
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">No. WhatsApp</label>
                <input 
                  type="text" 
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="08xxxxxxxx" 
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none"
                />
              </div>
            </div>
          </div>

          {/* List Item */}
          <div className="flex-1 max-h-[300px] overflow-y-auto divide-y divide-gray-100">
            {cart.length === 0 ? (
              <div className="py-12 text-center text-gray-400">
                <ShoppingCart className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-xs">Keranjang masih kosong.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between gap-3 hover:bg-gray-50/50 transition-colors">
                  <div className="min-w-0">
                    <strong className="text-xs font-bold text-gray-800 block truncate">{item.name}</strong>
                    <span className="text-[10px] text-primary-600 font-bold block mt-0.5">{rupiah(item.price)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                      <button 
                        type="button" 
                        onClick={() => handleUpdateQty(item.id, 'decrease')}
                        className="p-1 px-2 hover:bg-gray-100 text-gray-500 text-xs transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 py-0.5 text-xs font-bold text-gray-800 bg-gray-50/50 min-w-[24px] text-center">
                        {item.qty}
                      </span>
                      <button 
                        type="button" 
                        onClick={() => handleUpdateQty(item.id, 'increase')}
                        className="p-1 px-2 hover:bg-gray-100 text-gray-500 text-xs transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => handleUpdateQty(item.id, 'remove')}
                      className="p-1.5 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Rincian Pembayaran */}
          <div className="bg-gray-50 border-t border-gray-100 p-4 flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Subtotal</span>
              <strong className="font-semibold text-gray-800">{rupiah(subtotal)}</strong>
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Diskon (Rp)</span>
              <input 
                type="text" 
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-24 px-2 py-1 text-right border border-gray-200 rounded-lg text-xs focus:border-primary-500 outline-none"
              />
            </div>

            {taxPercent > 0 && (
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Pajak ({taxPercent}%)</span>
                <strong className="font-semibold text-gray-800">{rupiah(tax)}</strong>
              </div>
            )}

            <div className="flex justify-between items-center text-sm border-t border-dashed border-gray-200 pt-2.5">
              <strong className="font-bold text-gray-800">Total</strong>
              <strong className="text-base font-extrabold text-accent-600">{rupiah(total)}</strong>
            </div>

            {/* Metode Pembayaran */}
            <div className="mt-1">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Metode Bayar</label>
              <select 
                value={paymentMethod}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  if (e.target.value === 'Kasbon') setPaymentReceived(0);
                }}
                className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-xs bg-white outline-none focus:border-primary-500"
              >
                <option value="Tunai">Tunai</option>
                <option value="QRIS">QRIS</option>
                <option value="Kasbon">Kasbon</option>
              </select>
            </div>

            {/* Jumlah Uang Diterima */}
            {paymentMethod !== 'Kasbon' && (
              <div className="flex items-center justify-between gap-3 mt-1.5">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Uang Diterima</label>
                  <input 
                    type="text" 
                    value={paymentReceived}
                    onChange={(e) => setPaymentReceived(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:border-primary-500 outline-none text-right font-bold"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setPaymentReceived(total)}
                  className="px-3 py-1.5 bg-primary-50 hover:bg-primary-100 text-primary-700 border border-primary-200 rounded-lg text-xs font-bold transition-all mt-4.5 self-end"
                >
                  Uang Pas
                </button>
              </div>
            )}

            {/* Kembalian */}
            {paymentMethod !== 'Kasbon' && change > 0 && (
              <div className="flex justify-between items-center p-2.5 bg-green-50 border border-green-100 rounded-xl mt-1 text-xs">
                <span className="text-green-600 font-medium">Kembalian</span>
                <strong className="text-sm font-extrabold text-green-700">{rupiah(change)}</strong>
              </div>
            )}

            <button
              type="button"
              disabled={!canComplete}
              onClick={handleCompleteSale}
              className={`w-full py-3 mt-2 rounded-xl font-bold shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 ${
                canComplete
                  ? 'bg-primary-600 hover:bg-primary-700 text-white hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              }`}
            >
              <span>Selesaikan Transaksi</span>
            </button>
          </div>
        </div>
      </section>

      {/* Tampilan Struk / Struk Terakhir */}
      {latestReceipt && (
        <div className="mt-8 border border-gray-200 rounded-xl p-6 bg-white max-w-md mx-auto shadow-sm">
          <div className="text-center pb-4 border-b border-dashed border-gray-200">
            <h4 className="font-extrabold text-gray-800 text-lg uppercase">{settings.storeName || 'Kantongin'}</h4>
            {settings.storeAddress && <p className="text-[11px] text-gray-500 mt-1">{settings.storeAddress}</p>}
            <p className="text-[10px] text-gray-400 mt-2">Kode: {latestReceipt.code}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Tanggal: {new Date(latestReceipt.date).toLocaleString('id-ID')}</p>
          </div>

          <div className="py-4 border-b border-dashed border-gray-200 divide-y divide-gray-50">
            {latestReceipt.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center py-2 text-xs">
                <div>
                  <strong className="font-bold text-gray-700">{item.name}</strong>
                  <span className="block text-[10px] text-gray-400 mt-0.5">{item.qty} x {rupiah(item.price)}</span>
                </div>
                <strong className="font-semibold text-gray-800">{rupiah(item.price * item.qty)}</strong>
              </div>
            ))}
          </div>

          <div className="py-4 flex flex-col gap-2 text-xs border-b border-dashed border-gray-200">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>{rupiah(latestReceipt.subtotal)}</span>
            </div>
            {latestReceipt.discount > 0 && (
              <div className="flex justify-between text-gray-500">
                <span>Diskon</span>
                <span>-{rupiah(latestReceipt.discount)}</span>
              </div>
            )}
            {latestReceipt.tax > 0 && (
              <div className="flex justify-between text-gray-500">
                <span>PPN</span>
                <span>{rupiah(latestReceipt.tax)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-gray-800 text-sm pt-1 border-t border-gray-100">
              <span>Total</span>
              <span className="text-accent-600 font-extrabold">{rupiah(latestReceipt.total)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Metode Pembayaran</span>
              <span className="font-bold">{latestReceipt.paymentMethod}</span>
            </div>
            {latestReceipt.paymentMethod !== 'Kasbon' && (
              <>
                <div className="flex justify-between text-gray-500">
                  <span>Bayar</span>
                  <span>{rupiah(latestReceipt.paid)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Kembali</span>
                  <span>{rupiah(latestReceipt.change)}</span>
                </div>
              </>
            )}
          </div>

          <p className="text-center text-[11px] text-gray-400 pt-4 font-medium">Terima kasih atas kunjungan Anda!</p>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <button
              onClick={() => onPrintReceipt(latestReceipt)}
              className="py-2.5 border border-gray-200 hover:bg-gray-50 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all outline-none"
            >
              <Printer className="w-4 h-4" /> Cetak Struk
            </button>
            {latestReceipt.customerPhone && (
              <button
                onClick={() => onSendWhatsAppReceipt(latestReceipt)}
                className="py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 outline-none"
              >
                <MessageSquare className="w-4 h-4" /> Kirim WhatsApp
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modal QRIS Pembayaran */}
      {qrisPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-md p-4" id="qrisPayOverlay">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200">
            <div className="p-5 bg-gradient-to-br from-primary-500 to-primary-700 text-white text-center">
              <h3 className="font-bold text-lg">Pembayaran QRIS</h3>
              <p className="text-primary-100 text-xs">Scan kode QR di bawah untuk menyelesaikan pembayaran</p>
            </div>
            <div className="p-6 flex flex-col items-center">
              <div className="bg-gradient-to-br from-accent-50 to-accent-100 border-2 border-accent-200 rounded-2xl px-6 py-3 mb-5 text-center shadow-sm">
                <span className="block text-xs font-bold text-accent-500 uppercase tracking-wider mb-0.5">Total Pembayaran</span>
                <strong className="text-3xl font-extrabold text-accent-700">{rupiah(total)}</strong>
              </div>
              {settings.qrisImage ? (
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-lg mb-4">
                  <img src={settings.qrisImage} alt="QRIS Toko" className="w-72 h-72 object-contain mx-auto" />
                </div>
              ) : (
                <div className="py-8 px-6 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 mb-5 w-full">
                  <strong className="block text-gray-500 text-sm mb-1">QRIS belum diunggah</strong>
                  <span className="text-xs text-gray-400">Tambahkan gambar QRIS dari Pengaturan Toko di Dashboard</span>
                </div>
              )}
              {change > 0 && (
                <div className="w-full flex items-center justify-between p-3 bg-green-50 border border-green-100 rounded-xl mb-4">
                  <span className="text-sm text-green-600">Kembalian</span>
                  <strong className="text-lg font-extrabold text-green-700">{rupiah(change)}</strong>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3 w-full mt-2">
                <button 
                  type="button" 
                  onClick={() => setQrisPayModal(false)}
                  className="py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all active:scale-95"
                >
                  Batal
                </button>
                <button 
                  type="button" 
                  onClick={handleConfirmQrisPay}
                  className="py-3 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Sudah Bayar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
