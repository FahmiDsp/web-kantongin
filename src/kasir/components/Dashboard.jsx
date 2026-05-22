import React, { useState, useRef } from 'react';
import { Plus, Settings, User, Box, Save, Trash2, ArrowUpRight, ArrowDownRight, Package, X, Upload, Edit, Eye, ShieldAlert, FileSpreadsheet } from 'lucide-react';

export default function Dashboard({
  products,
  transactions,
  movements,
  settings,
  onSaveProduct,
  onDeleteProduct,
  onQuickStock,
  onAddStock,
  onHandleExpiredStock,
  onSaveSettings,
  onSaveProfile,
  onRemoveQris,
  onRemoveStorePhoto,
  onRemoveProductPhoto,
  showToast,
  rupiah,
  numberOnly
}) {
  const [activeModal, setActiveModal] = useState(null); // 'product', 'stock', 'expired', 'settings', 'profile'
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // File refs
  const qrisInputRef = useRef(null);
  const storePhotoRef = useRef(null);
  const productPhotoRef = useRef(null);

  // Form local state
  const [productForm, setProductForm] = useState({
    name: '', sku: '', category: '', costPrice: 0, profit: 0, price: 0, stock: 0, minStock: 5, unit: 'pcs', color: '#15803d'
  });
  const [stockForm, setStockForm] = useState({ productId: '', quantity: 0, note: '' });
  const [expiredForm, setExpiredForm] = useState({ productId: '', quantity: 0, note: '' });
  const [settingsForm, setSettingsForm] = useState({ taxPercent: settings.taxPercent || 0 });
  const [profileForm, setProfileForm] = useState({ storeName: settings.storeName || '', storeAddress: settings.storeAddress || '' });

  // Calculations for Metrics
  const totalBarang = products.length;
  const nilaiInvestasi = products.reduce((sum, p) => sum + (numberOnly(p.costPrice || p.price) * p.stock), 0);
  const stokTipis = products.filter(p => p.stock <= p.minStock && p.stock > 0).length;

  const todayStr = new Date().toISOString().split('T')[0];
  const pendapatanHariIni = transactions
    .filter(t => t.date.split('T')[0] === todayStr)
    .reduce((sum, t) => sum + t.total, 0);

  // Filtered Products for Inventory table
  const query = searchQuery.trim().toLowerCase();
  const filteredProducts = products.filter(p => {
    if (!query) return true;
    return [p.name, p.sku, p.category].some(item => (item || '').toLowerCase().includes(query));
  });

  const openAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '', sku: '', category: '', costPrice: '', profit: '', price: 0, stock: '', minStock: '5', unit: 'pcs', color: '#15803d'
    });
    setActiveModal('product');
  };

  const openEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      sku: product.sku || '',
      category: product.category,
      costPrice: product.costPrice || '',
      profit: product.profit || '',
      price: product.price,
      stock: product.stock,
      minStock: product.minStock || 5,
      unit: product.unit || 'pcs',
      color: product.color || '#15803d'
    });
    setActiveModal('product');
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.sku || !productForm.category || !productForm.unit) {
      showToast('Lengkapi data barang terlebih dahulu.', 'error');
      return;
    }
    const cost = numberOnly(productForm.costPrice);
    const profit = numberOnly(productForm.profit);
    const price = cost + profit;

    const file = productPhotoRef.current?.files?.[0];
    let photoData = '';
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('Ukuran foto produk maksimal 2 MB.', 'error');
        return;
      }
      photoData = await readFileAsDataUrl(file);
    }

    const payload = {
      ...productForm,
      costPrice: cost,
      profit: profit,
      price: price,
      stock: numberOnly(productForm.stock),
      minStock: numberOnly(productForm.minStock),
      photo: photoData
    };

    const success = onSaveProduct(payload, editingProduct?.id);
    if (success) {
      setActiveModal(null);
      setEditingProduct(null);
    }
  };

  const handleStockSubmit = (e) => {
    e.preventDefault();
    if (!stockForm.productId || stockForm.quantity <= 0) {
      showToast('Pilih barang dan isi jumlah stok masuk.', 'error');
      return;
    }
    onAddStock(stockForm.productId, stockForm.quantity, stockForm.note);
    setActiveModal(null);
    setStockForm({ productId: '', quantity: 0, note: '' });
  };

  const handleExpiredSubmit = (e) => {
    e.preventDefault();
    if (!expiredForm.productId || expiredForm.quantity <= 0) {
      showToast('Pilih barang dan isi jumlah yang dibuang.', 'error');
      return;
    }
    const product = products.find(p => p.id === expiredForm.productId);
    if (expiredForm.quantity > product.stock) {
      showToast(`Jumlah melebihi stok tersedia (${product.stock} ${product.unit}).`, 'error');
      return;
    }
    onHandleExpiredStock(expiredForm.productId, expiredForm.quantity, expiredForm.note);
    setActiveModal(null);
    setExpiredForm({ productId: '', quantity: 0, note: '' });
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    const file = qrisInputRef.current?.files?.[0];
    let qrisData = settings.qrisImage;

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('Ukuran gambar QRIS maksimal 2 MB.', 'error');
        return;
      }
      qrisData = await readFileAsDataUrl(file);
    }

    onSaveSettings(numberOnly(settingsForm.taxPercent), qrisData);
    setActiveModal(null);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const file = storePhotoRef.current?.files?.[0];
    let photoData = settings.storePhoto;

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('Ukuran logo maksimal 2 MB.', 'error');
        return;
      }
      photoData = await readFileAsDataUrl(file);
    }

    onSaveProfile(profileForm.storeName, profileForm.storeAddress, photoData);
    setActiveModal(null);
  };

  const readFileAsDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard Inventori</h2>
          <p className="text-sm text-gray-500 mt-1">Kelola data barang, stok masuk, stok kadaluarsa, dan profil toko.</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Total Barang</span>
            <strong className="text-2xl font-extrabold text-gray-800">{totalBarang}</strong>
          </div>
        </div>

        <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
            <ArrowUpRight className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Nilai Investasi Stok</span>
            <strong className="text-2xl font-extrabold text-gray-800">{rupiah(nilaiInvestasi)}</strong>
          </div>
        </div>

        <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 animate-pulse">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Stok Menipis</span>
            <strong className="text-2xl font-extrabold text-red-600">{stokTipis}</strong>
          </div>
        </div>

        <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
            <ArrowDownRight className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Pendapatan Hari Ini</span>
            <strong className="text-2xl font-extrabold text-gray-800">{rupiah(pendapatanHariIni)}</strong>
          </div>
        </div>
      </div>

      {/* Quick Action Panel */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-6 flex flex-wrap gap-3">
        <button 
          onClick={openAddProduct}
          className="flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 outline-none"
        >
          <Plus className="w-4 h-4" /> Tambah Barang
        </button>
        <button 
          onClick={() => {
            setActiveModal('stock');
            setStockForm({ productId: products[0]?.id || '', quantity: '', note: '' });
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-50 shadow-sm transition-all active:scale-95 outline-none"
        >
          <ArrowUpRight className="w-4 h-4 text-green-500" /> Stok Masuk
        </button>
        <button 
          onClick={() => {
            setActiveModal('expired');
            setExpiredForm({ productId: products[0]?.id || '', quantity: '', note: '' });
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-50 shadow-sm transition-all active:scale-95 outline-none"
        >
          <ArrowDownRight className="w-4 h-4 text-red-500" /> Barang Kadaluarsa
        </button>
        <button 
          onClick={() => {
            setActiveModal('settings');
            setSettingsForm({ taxPercent: settings.taxPercent || 0 });
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-50 shadow-sm transition-all active:scale-95 outline-none ml-auto"
        >
          <Settings className="w-4 h-4 text-gray-500" /> Pengaturan Pembayaran
        </button>
        <button 
          onClick={() => {
            setActiveModal('profile');
            setProfileForm({ storeName: settings.storeName || '', storeAddress: settings.storeAddress || '' });
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-50 shadow-sm transition-all active:scale-95 outline-none"
        >
          <User className="w-4 h-4 text-gray-500" /> Pengaturan Toko
        </button>
      </div>

      {/* Inventory Table Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h3 className="font-bold text-gray-800">Tabel Inventori Barang</h3>
            <p className="text-xs text-gray-500 mt-0.5">Kelola informasi barang dan update stok cepat</p>
          </div>
          <div className="relative w-full sm:w-64">
            <X className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer hidden" />
            <input 
              type="text" 
              placeholder="Cari barang..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-xl text-sm focus:border-primary-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap border-collapse">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-5 py-3 border-b border-gray-100">SKU</th>
                <th className="px-5 py-3 border-b border-gray-100">Barang</th>
                <th className="px-5 py-3 border-b border-gray-100">Kategori</th>
                <th className="px-5 py-3 border-b border-gray-100 text-center">Stok</th>
                <th className="px-5 py-3 border-b border-gray-100 text-right">Harga Beli</th>
                <th className="px-5 py-3 border-b border-gray-100 text-right">Harga Jual</th>
                <th className="px-5 py-3 border-b border-gray-100 text-right">Profit Margin</th>
                <th className="px-5 py-3 border-b border-gray-100 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-5 py-12 text-center text-gray-500">
                    Tidak ada barang dalam inventori.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const profit = p.price - (p.costPrice || p.price);
                  const isLow = p.stock <= p.minStock;
                  return (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <span className="font-mono text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200">
                          {p.sku || '-'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          {p.photo ? (
                            <img src={p.photo} alt={p.name} className="w-10 h-10 object-cover rounded-lg border border-gray-200 bg-white" />
                          ) : (
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white uppercase text-xs" style={{ backgroundColor: p.color || '#15803d' }}>
                              {p.name.substring(0,2)}
                            </div>
                          )}
                          <div>
                            <strong className="text-gray-800 block leading-normal">{p.name}</strong>
                            <span className="text-[10px] text-gray-400 font-medium">Unit: {p.unit || 'pcs'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-gray-600 font-medium">{p.category}</span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <span className={`px-2.5 py-1 rounded-md font-bold text-xs ${
                          isLow 
                            ? 'bg-red-50 text-red-600 border border-red-100 animate-pulse'
                            : 'bg-green-50 text-green-700 border border-green-100'
                        }`}>
                          {p.stock}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right font-semibold text-gray-700">
                        {rupiah(p.costPrice || p.price)}
                      </td>
                      <td className="px-5 py-3.5 text-right font-semibold text-primary-600">
                        {rupiah(p.price)}
                      </td>
                      <td className="px-5 py-3.5 text-right font-bold text-accent-600">
                        {rupiah(profit)}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="inline-flex gap-1.5">
                          <button
                            onClick={() => {
                              const amount = Number(prompt(`Tambah stok cepat untuk ${p.name}:`, '10'));
                              if (amount > 0) onQuickStock(p.id, amount);
                            }}
                            className="px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-lg border border-green-100 hover:bg-green-100 transition-all active:scale-95"
                          >
                            + Stok
                          </button>
                          <button
                            onClick={() => openEditProduct(p)}
                            className="p-1 px-2 border border-gray-200 text-gray-600 hover:text-primary-600 rounded-lg hover:bg-gray-50 transition-all"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteProduct(p.id)}
                            className="p-1 px-2 bg-red-50 border border-red-100 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-100 transition-all"
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
      </div>

      {/* Modal 1: Product Form (Tambah/Edit) */}
      {activeModal === 'product' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">{editingProduct ? 'Ubah Data Barang' : 'Tambah Barang Baru'}</h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleProductSubmit} className="p-5 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Nama Barang</label>
                  <input 
                    type="text" 
                    value={productForm.name} 
                    onChange={e => setProductForm({ ...productForm, name: e.target.value })} 
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 text-sm outline-none" required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">SKU / Kode Barang</label>
                  <input 
                    type="text" 
                    value={productForm.sku} 
                    onChange={e => setProductForm({ ...productForm, sku: e.target.value })} 
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 text-sm outline-none" required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Kategori</label>
                  <input 
                    type="text" 
                    value={productForm.category} 
                    onChange={e => setProductForm({ ...productForm, category: e.target.value })} 
                    placeholder="Makanan, Minuman, dsb."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 text-sm outline-none" required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Satuan Unit</label>
                  <input 
                    type="text" 
                    value={productForm.unit} 
                    onChange={e => setProductForm({ ...productForm, unit: e.target.value })} 
                    placeholder="pcs, pack, kg, dsb."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 text-sm outline-none" required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Harga Beli (Rp)</label>
                  <input 
                    type="text" 
                    value={productForm.costPrice} 
                    onChange={e => {
                      const cost = numberOnly(e.target.value);
                      const profit = numberOnly(productForm.profit);
                      setProductForm({ ...productForm, costPrice: e.target.value, price: cost + profit });
                    }} 
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 text-sm outline-none text-right font-semibold" required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Margin Laba (Rp)</label>
                  <input 
                    type="text" 
                    value={productForm.profit} 
                    onChange={e => {
                      const cost = numberOnly(productForm.costPrice);
                      const profit = numberOnly(e.target.value);
                      setProductForm({ ...productForm, profit: e.target.value, price: cost + profit });
                    }} 
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 text-sm outline-none text-right font-semibold" required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Harga Jual (Total)</label>
                  <div className="w-full px-3 py-2 bg-gray-50 border border-gray-250 rounded-lg text-sm text-right font-extrabold text-primary-700">
                    {rupiah(productForm.price)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Stok Awal</label>
                  <input 
                    type="text" 
                    value={productForm.stock} 
                    onChange={e => setProductForm({ ...productForm, stock: e.target.value })} 
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 text-sm outline-none text-center font-bold" required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Batas Minimum</label>
                  <input 
                    type="text" 
                    value={productForm.minStock} 
                    onChange={e => setProductForm({ ...productForm, minStock: e.target.value })} 
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 text-sm outline-none text-center font-bold" required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Warna Ikon</label>
                  <input 
                    type="color" 
                    value={productForm.color} 
                    onChange={e => setProductForm({ ...productForm, color: e.target.value })} 
                    className="w-full h-9 border border-gray-200 rounded-lg outline-none cursor-pointer p-0.5" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Foto Produk (Opsional)</label>
                <input 
                  type="file" 
                  ref={productPhotoRef}
                  accept="image/*"
                  className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 transition-all cursor-pointer" 
                />
              </div>

              {editingProduct && editingProduct.photo && (
                <div className="flex items-center gap-4 p-2.5 border border-gray-200 rounded-xl bg-gray-50">
                  <img src={editingProduct.photo} alt="Produk" className="w-12 h-12 object-cover rounded-lg border" />
                  <div>
                    <span className="block text-xs font-bold text-gray-800">Foto Tersimpan</span>
                    <button type="button" onClick={() => onRemoveProductPhoto(editingProduct.id)} className="text-[10px] font-bold text-red-500 hover:underline">Hapus Foto</button>
                  </div>
                </div>
              )}

              <button type="submit" className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5">
                <Save className="w-4 h-4" /> Simpan Barang
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Stock Mutation (Stok Masuk) */}
      {activeModal === 'stock' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Form Mutasi Stok Masuk</h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleStockSubmit} className="p-5 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Pilih Barang</label>
                <select 
                  value={stockForm.productId}
                  onChange={e => setStockForm({ ...stockForm, productId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:border-primary-500" required
                >
                  <option value="" disabled>-- Pilih Barang --</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (Stok: {p.stock})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Jumlah Stok Masuk</label>
                <input 
                  type="text" 
                  value={stockForm.quantity} 
                  onChange={e => setStockForm({ ...stockForm, quantity: e.target.value })}
                  placeholder="Masukkan angka..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 text-sm text-center font-bold" required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Keterangan / Catatan</label>
                <textarea 
                  value={stockForm.note} 
                  onChange={e => setStockForm({ ...stockForm, note: e.target.value })}
                  placeholder="Contoh: Kulakan supplier, sisa retur, dll."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 text-sm min-h-[80px]"
                />
              </div>

              <button type="submit" className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95">
                Simpan Mutasi Stok
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Expired Stock (Barang Kadaluarsa) */}
      {activeModal === 'expired' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-red-600 flex items-center gap-1.5"><ShieldAlert className="w-5 h-5" /> Catat Barang Kadaluarsa</h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleExpiredSubmit} className="p-5 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Pilih Barang</label>
                <select 
                  value={expiredForm.productId}
                  onChange={e => setExpiredForm({ ...expiredForm, productId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:border-primary-500" required
                >
                  <option value="" disabled>-- Pilih Barang --</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (Stok: {p.stock})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Jumlah Dibuang / Kadaluarsa</label>
                <input 
                  type="text" 
                  value={expiredForm.quantity} 
                  onChange={e => setExpiredForm({ ...expiredForm, quantity: e.target.value })}
                  placeholder="Masukkan angka..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 text-sm text-center font-bold text-red-600" required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Keterangan / Alasan Dibuang</label>
                <textarea 
                  value={expiredForm.note} 
                  onChange={e => setExpiredForm({ ...expiredForm, note: e.target.value })}
                  placeholder="Contoh: Kadaluarsa tanggal 12/05, rusak berjamur, dll."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 text-sm min-h-[80px]"
                />
              </div>

              <button type="submit" className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95">
                Simpan & Potong Stok
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal 4: Settings (Pengaturan Pembayaran) */}
      {activeModal === 'settings' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Pengaturan Pembayaran</h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSettingsSubmit} className="p-5 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Pajak Toko (%)</label>
                <input 
                  type="text" 
                  value={settingsForm.taxPercent} 
                  onChange={e => setSettingsForm({ ...settingsForm, taxPercent: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 text-sm text-center font-bold" required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Gambar QRIS (Max 2 MB)</label>
                <input 
                  type="file" 
                  ref={qrisInputRef}
                  accept="image/*"
                  className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 transition-all cursor-pointer" 
                />
              </div>

              {settings.qrisImage && (
                <div className="flex items-center gap-4 p-2.5 border border-gray-200 rounded-xl bg-gray-50">
                  <img src={settings.qrisImage} alt="QRIS" className="w-12 h-12 object-contain rounded-lg border bg-white" />
                  <div>
                    <span className="block text-xs font-bold text-gray-800">QRIS Tersimpan</span>
                    <button type="button" onClick={onRemoveQris} className="text-[10px] font-bold text-red-500 hover:underline">Hapus QRIS</button>
                  </div>
                </div>
              )}

              <button type="submit" className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95">
                Simpan Pengaturan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal 5: Profile (Pengaturan Toko) */}
      {activeModal === 'profile' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Pengaturan Profil Toko</h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleProfileSubmit} className="p-5 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Nama Toko</label>
                <input 
                  type="text" 
                  value={profileForm.storeName} 
                  onChange={e => setProfileForm({ ...profileForm, storeName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 text-sm" required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Alamat Toko</label>
                <textarea 
                  value={profileForm.storeAddress} 
                  onChange={e => setProfileForm({ ...profileForm, storeAddress: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 text-sm min-h-[80px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Logo Toko (Max 2 MB)</label>
                <input 
                  type="file" 
                  ref={storePhotoRef}
                  accept="image/*"
                  className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 transition-all cursor-pointer" 
                />
              </div>

              {settings.storePhoto && (
                <div className="flex items-center gap-4 p-2.5 border border-gray-200 rounded-xl bg-gray-50">
                  <img src={settings.storePhoto} alt="Logo" className="w-12 h-12 object-contain rounded-lg border bg-white" />
                  <div>
                    <span className="block text-xs font-bold text-gray-800">Logo Tersimpan</span>
                    <button type="button" onClick={onRemoveStorePhoto} className="text-[10px] font-bold text-red-500 hover:underline">Hapus Logo</button>
                  </div>
                </div>
              )}

              <button type="submit" className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95">
                Simpan Profil Toko
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
