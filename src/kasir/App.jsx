import React, { useState, useEffect } from 'react';
import { Store, ShoppingBag, BarChart2, History as HistoryIcon, LogOut, Loader2, AlertCircle } from 'lucide-react';
import Auth from './components/Auth';
import Admin from './components/Admin';
import Cashier from './components/Cashier';
import Dashboard from './components/Dashboard';
import History from './components/History';

const defaultSettings = {
  qrisImage: '',
  taxPercent: 0,
  storeName: 'Kasir Toko',
  storeAddress: '',
  storePhoto: ''
};

const defaultProducts = [
  { id: 'p-beras', name: 'Beras Premium 5 kg', sku: 'BR-5000', category: 'Sembako', costPrice: 65000, profit: 7000, price: 72000, stock: 18, minStock: 5, unit: 'pak', color: '#166534' },
  { id: 'p-minyak', name: 'Minyak Goreng 1 L', sku: 'MY-1000', category: 'Sembako', costPrice: 16000, profit: 2500, price: 18500, stock: 26, minStock: 8, unit: 'botol', color: '#d5962f' },
  { id: 'p-gula', name: 'Gula Pasir 1 kg', sku: 'GL-1000', category: 'Sembako', costPrice: 14000, profit: 2000, price: 16000, stock: 20, minStock: 6, unit: 'kg', color: '#6a7c3c' },
  { id: 'p-kopi', name: 'Kopi Sachet', sku: 'KP-010', category: 'Minuman', costPrice: 2000, profit: 500, price: 2500, stock: 80, minStock: 20, unit: 'pcs', color: '#6c4b3e' },
  { id: 'p-teh', name: 'Teh Celup 25 pcs', sku: 'TH-025', category: 'Minuman', costPrice: 7500, profit: 2000, price: 9500, stock: 14, minStock: 5, unit: 'box', color: '#2f7d50' },
  { id: 'p-mie', name: 'Mie Instan Goreng', sku: 'MI-001', category: 'Makanan', costPrice: 2800, profit: 700, price: 3500, stock: 55, minStock: 15, unit: 'pcs', color: '#c95743' },
  { id: 'p-sabun', name: 'Sabun Mandi', sku: 'SB-001', category: 'Rumah Tangga', costPrice: 3500, profit: 1000, price: 4500, stock: 30, minStock: 10, unit: 'pcs', color: '#355f91' },
  { id: 'p-tisu', name: 'Tisu Gulung', sku: 'TS-001', category: 'Rumah Tangga', costPrice: 9000, profit: 3000, price: 12000, stock: 9, minStock: 10, unit: 'pak', color: '#7d5578' }
];

export default function App() {
  const [loading, setLoading] = useState(true);
  
  // Auth state
  const [token, setToken] = useState(localStorage.getItem('kantongin_token') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('kantongin_user') || 'null'));
  const [authMode, setAuthMode] = useState(new URLSearchParams(window.location.search).get('mode') === 'register' ? 'register' : 'login');
  
  // App views
  const [activeView, setActiveView] = useState('cashier');
  
  // Data states
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [movements, setMovements] = useState([]);
  const [settings, setSettings] = useState(defaultSettings);
  const [adminUsers, setAdminUsers] = useState([]);

  // POS transaction draft state (reset on checkout)
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [discount, setDiscount] = useState(0);
  const [paymentReceived, setPaymentReceived] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Tunai');
  const [latestReceipt, setLatestReceipt] = useState(null);

  // Overlay states
  const [toast, setToast] = useState(null);
  const [printReceipt, setPrintReceipt] = useState(null);

  // Toast handler
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Load initial app data
  useEffect(() => {
    const initApp = async () => {
      setLoading(true);
      if (token && user) {
        if (user.role === 'admin') {
          setActiveView('admin');
          try {
            const res = await fetch('/api/admin/users', {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
              const data = await res.json();
              setAdminUsers(data);
            } else {
              handleLogout();
            }
          } catch (e) {
            console.error('Failed to load admin data:', e);
            handleLogout();
          }
        } else {
          try {
            const res = await fetch('/api/store', {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Session expired');
            const data = await res.json();
            
            // Fallback to defaults if no products exist
            const loadedProducts = data.products && data.products.length > 0 ? data.products : defaultProducts;
            setProducts(loadedProducts);
            setTransactions(data.transactions || []);
            setMovements(data.movements || []);
            setSettings(data.settings || defaultSettings);
            setActiveView('cashier');
          } catch (e) {
            console.error('Failed to init store app:', e);
            handleLogout();
          }
        }
      }
      setLoading(false);
    };

    initApp();
  }, [token, user]);

  // Unified save state and cloud sync
  const saveAll = async (newProducts, newTransactions, newMovements, newSettings) => {
    // Write local storage as immediate cache
    if (newProducts) localStorage.setItem('kantongin_products', JSON.stringify(newProducts));
    if (newTransactions) localStorage.setItem('kantongin_transactions', JSON.stringify(newTransactions));
    if (newMovements) localStorage.setItem('kantongin_movements', JSON.stringify(newMovements));
    if (newSettings) localStorage.setItem('kantongin_settings', JSON.stringify(newSettings));

    if (!token) return;

    try {
      await fetch('/api/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          products: newProducts || products,
          transactions: newTransactions || transactions,
          movements: newMovements || movements,
          settings: newSettings || settings
        })
      });
    } catch (error) {
      console.error('Gagal sinkronisasi data ke cloud:', error);
    }
  };

  const handleAuthSuccess = (newToken, newUser) => {
    localStorage.setItem('kantongin_token', newToken);
    localStorage.setItem('kantongin_user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('kantongin_token');
    localStorage.removeItem('kantongin_user');
    setToken(null);
    setUser(null);
    setProducts([]);
    setTransactions([]);
    setMovements([]);
    setSettings(defaultSettings);
    setCart([]);
    setLatestReceipt(null);
    setActiveView('cashier');
    setAuthMode('login');
  };

  // Helper utility functions
  const rupiah = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Number(val || 0));
  };

  const numberOnly = (val) => {
    return Number(String(val || '').replace(/\D/g, '')) || 0;
  };

  const uid = (prefix) => {
    return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
  };

  // POS transaction finisher
  const handleFinishSale = (totals) => {
    // Deduct stock in UI
    const updatedProducts = products.map(product => {
      const cartItem = cart.find(item => item.id === product.id);
      if (cartItem) {
        return { ...product, stock: Math.max(0, product.stock - cartItem.qty) };
      }
      return product;
    });

    const newTransaction = {
      id: uid('trx'),
      code: `TRX-${new Date().toISOString().replace(/\D/g, '').slice(0, 14)}`,
      date: new Date().toISOString(),
      customerName: customerName.trim() || 'Umum',
      customerPhone: customerPhone.trim(),
      items: cart.map(item => ({ ...item })),
      subtotal: totals.subtotal,
      discount: totals.discount,
      taxPercent: totals.taxPercent,
      tax: totals.tax,
      total: totals.total,
      paid: totals.paid,
      change: totals.change,
      paymentMethod: paymentMethod
    };

    const updatedTransactions = [newTransaction, ...transactions];

    setProducts(updatedProducts);
    setTransactions(updatedTransactions);
    setLatestReceipt(newTransaction);
    
    // Clear cart & variables
    setCart([]);
    setCustomerName('');
    setCustomerPhone('');
    setDiscount(0);
    setPaymentReceived(0);
    setPaymentMethod('Tunai');

    saveAll(updatedProducts, updatedTransactions, null, null);
    showToast('Transaksi selesai dan stok otomatis berkurang.');
  };

  // Cancel transaction
  const handleCancelTransaction = (transactionId) => {
    if (!window.confirm('Batalkan pesanan ini? Stok barang akan otomatis dikembalikan ke inventori.')) return;

    const transactionToCancel = transactions.find(t => t.id === transactionId);
    if (!transactionToCancel) return;

    // Restore stock
    const updatedProducts = products.map(product => {
      const refundItem = transactionToCancel.items.find(item => item.id === product.id);
      if (refundItem) {
        return { ...product, stock: product.stock + refundItem.qty };
      }
      return product;
    });

    const updatedTransactions = transactions.filter(t => t.id !== transactionId);

    setProducts(updatedProducts);
    setTransactions(updatedTransactions);
    if (latestReceipt?.id === transactionId) setLatestReceipt(null);

    saveAll(updatedProducts, updatedTransactions, null, null);
    showToast('Pesanan dibatalkan. Stok berhasil dikembalikan.');
  };

  // Repay Kasbon
  const handleRepayKasbon = (transactionId, method) => {
    const updatedTransactions = transactions.map(t => {
      if (t.id === transactionId) {
        return { ...t, paid: t.total, kasbonPaidMethod: method };
      }
      return t;
    });

    setTransactions(updatedTransactions);
    saveAll(null, updatedTransactions, null, null);
    showToast(`Kasbon berhasil dilunasi via ${method}!`, 'success');
  };

  // Stock mutation updates
  const handleAddStock = (productId, qty, note) => {
    const quantity = numberOnly(qty);
    const updatedProducts = products.map(p => {
      if (p.id === productId) {
        return { ...p, stock: p.stock + quantity };
      }
      return p;
    });

    const newMovement = {
      id: uid('stk'),
      date: new Date().toISOString(),
      productId,
      productName: products.find(p => p.id === productId)?.name || '',
      quantity,
      note: note || 'Tambah stok manual'
    };
    const updatedMovements = [newMovement, ...movements];

    setProducts(updatedProducts);
    setMovements(updatedMovements);

    saveAll(updatedProducts, null, updatedMovements, null);
    showToast(`Stok barang bertambah ${quantity}.`);
  };

  // Expired stock updates
  const handleExpiredStock = (productId, qty, note) => {
    const quantity = numberOnly(qty);
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const costPerUnit = numberOnly(product.costPrice || product.price);
    const totalLoss = costPerUnit * quantity;

    const updatedProducts = products.map(p => {
      if (p.id === productId) {
        return { ...p, stock: Math.max(0, p.stock - quantity) };
      }
      return p;
    });

    const newMovement = {
      id: uid('exp'),
      date: new Date().toISOString(),
      type: 'expired',
      productId,
      productName: product.name,
      quantity,
      costPerUnit,
      totalLoss,
      note: note || 'Barang expired/dibuang'
    };
    const updatedMovements = [newMovement, ...movements];

    setProducts(updatedProducts);
    setMovements(updatedMovements);

    saveAll(updatedProducts, null, updatedMovements, null);
    showToast(`${quantity} ${product.unit} ${product.name} dibuang. Kerugian ${rupiah(totalLoss)} tercatat.`, 'warning');
  };

  // Quick stock mutation directly from table
  const handleQuickStock = (productId, qty) => {
    const quantity = Number(qty);
    const product = products.find(p => p.id === productId);
    if (!product || quantity <= 0) return;

    const updatedProducts = products.map(p => {
      if (p.id === productId) {
        return { ...p, stock: p.stock + quantity };
      }
      return p;
    });

    const newMovement = {
      id: uid('stk'),
      date: new Date().toISOString(),
      productId,
      productName: product.name,
      quantity,
      note: 'Tambah cepat dari tabel inventori'
    };
    const updatedMovements = [newMovement, ...movements];

    setProducts(updatedProducts);
    setMovements(updatedMovements);

    saveAll(updatedProducts, null, updatedMovements, null);
    showToast(`Stok ${product.name} bertambah ${quantity} ${product.unit}.`);
  };

  // Delete product
  const handleDeleteProduct = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const inCart = cart.some(item => item.id === productId);
    if (inCart) {
      showToast('Barang masih ada di keranjang. Hapus dari keranjang dulu.', 'error');
      return;
    }

    if (window.confirm(`Hapus ${product.name} dari inventori?`)) {
      const updatedProducts = products.filter(p => p.id !== productId);
      setProducts(updatedProducts);
      saveAll(updatedProducts, null, null, null);
      showToast('Barang dihapus dari inventori.');
    }
  };

  // Add/Edit product
  const handleSaveProduct = (productData, editingId) => {
    const skuExists = products.some(p => p.sku.toLowerCase() === productData.sku.toLowerCase() && p.id !== editingId);
    if (skuExists) {
      showToast('SKU sudah dipakai barang lain.', 'error');
      return false;
    }

    let updatedProducts;
    if (editingId) {
      updatedProducts = products.map(p => {
        if (p.id === editingId) {
          return {
            ...p,
            ...productData,
            photo: productData.photo || p.photo || ''
          };
        }
        return p;
      });
      // Sync items in cart
      setCart(cart.map(item => item.id === editingId ? { 
        ...item, 
        name: productData.name, 
        sku: productData.sku, 
        price: productData.price, 
        costPrice: productData.costPrice, 
        profit: productData.profit 
      } : item));
      
      showToast('Data barang diperbarui.');
    } else {
      updatedProducts = [
        ...products,
        {
          id: uid('prd'),
          ...productData
        }
      ];
      showToast('Barang baru ditambahkan.');
    }

    setProducts(updatedProducts);
    saveAll(updatedProducts, null, null, null);
    return true;
  };

  // Settings Save
  const handleSaveSettings = (taxPercent, qrisImage) => {
    const updatedSettings = {
      ...settings,
      taxPercent,
      qrisImage
    };
    setSettings(updatedSettings);
    saveAll(null, null, null, updatedSettings);
    showToast('Pengaturan pembayaran disimpan.');
  };

  // Profile Save
  const handleSaveProfile = (storeName, storeAddress, storePhoto) => {
    const updatedSettings = {
      ...settings,
      storeName: storeName || 'Kasir Toko',
      storeAddress,
      storePhoto
    };
    setSettings(updatedSettings);
    saveAll(null, null, null, updatedSettings);
    showToast('Profil toko disimpan.');
  };

  // Remove photo settings
  const handleRemoveQris = () => {
    const updatedSettings = { ...settings, qrisImage: '' };
    setSettings(updatedSettings);
    saveAll(null, null, null, updatedSettings);
    showToast('Gambar QRIS dihapus.');
  };

  const handleRemoveStorePhoto = () => {
    const updatedSettings = { ...settings, storePhoto: '' };
    setSettings(updatedSettings);
    saveAll(null, null, null, updatedSettings);
    showToast('Logo toko dihapus.');
  };

  const handleRemoveProductPhoto = (productId) => {
    const updatedProducts = products.map(p => {
      if (p.id === productId) {
        return { ...p, photo: '' };
      }
      return p;
    });
    setProducts(updatedProducts);
    saveAll(updatedProducts, null, null, null);
    showToast('Foto produk dihapus.');
  };

  // Receipt printing
  const handlePrintReceipt = (receipt) => {
    if (!receipt) return;
    setPrintReceipt(receipt);
    requestAnimationFrame(() => {
      const handleCleanup = () => {
        setPrintReceipt(null);
        window.removeEventListener('afterprint', handleCleanup);
      };
      window.addEventListener('afterprint', handleCleanup);
      window.print();
    });
  };

  // WhatsApp sending
  const handleSendWhatsAppReceipt = (receipt) => {
    if (!receipt || !receipt.customerPhone) {
      showToast('Nomor WhatsApp tidak ditemukan.', 'error');
      return;
    }

    let text = `*STRUK PEMBELIAN*\n`;
    text += `${settings.storeName || 'Kasir Toko'}\n`;
    text += `Kode: ${receipt.code}\n`;
    text += `Tanggal: ${new Date(receipt.date).toLocaleString('id-ID')}\n`;
    text += `Pelanggan: ${receipt.customerName || 'Umum'}\n\n`;

    receipt.items.forEach((item) => {
      text += `${item.name} x ${item.qty}\n`;
      text += `${rupiah(item.price * item.qty)}\n`;
    });

    text += `\nSubtotal: ${rupiah(receipt.subtotal)}\n`;
    if (receipt.discount > 0) text += `Diskon: -${rupiah(receipt.discount)}\n`;
    if (receipt.tax > 0) text += `PPN: ${rupiah(receipt.tax)}\n`;
    text += `*Total: ${rupiah(receipt.total)}*\n`;
    text += `Bayar (${receipt.paymentMethod}${receipt.kasbonPaidMethod ? ' - Lunas via ' + receipt.kasbonPaidMethod : ''}): ${rupiah(receipt.paid)}\n`;
    text += `Kembali: ${rupiah(receipt.change)}\n\n`;
    text += `Terima kasih atas kunjungan Anda!`;
    if (settings.storeAddress) {
      text += `\n\n${settings.storeAddress}`;
    }

    let phone = receipt.customerPhone.replace(/\D/g, '');
    if (phone.startsWith('0')) phone = '62' + phone.substring(1);
    else if (!phone.startsWith('62')) phone = '62' + phone;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // CSV Report exporting
  const handleExportCsv = () => {
    if (!transactions.length) {
      showToast('Tidak ada data untuk diekspor.', 'warning');
      return;
    }

    const headers = ['Kode Transaksi', 'Tanggal', 'Pelanggan', 'Item', 'Subtotal', 'Diskon', 'PPN', 'Total', 'Metode Pembayaran', 'Keuntungan Kotor'];
    
    const rows = transactions.map(t => {
      const date = new Date(t.date).toLocaleString('id-ID');
      const items = t.items.map(i => `${i.name} (${i.qty})`).join('; ');
      const trxProfit = t.items.reduce((sum, item) => sum + (numberOnly(item.profit || 0) * numberOnly(item.qty)), 0);
      return [
        t.code,
        date,
        t.customerName || 'Umum',
        items,
        t.subtotal,
        t.discount,
        t.tax,
        t.total,
        t.paymentMethod === 'Kasbon' ? (t.paid < t.total ? 'Kasbon (Belum Lunas)' : 'Kasbon (Sudah Lunas)') : t.paymentMethod,
        trxProfit
      ].map(value => `"${String(value).replace(/"/g, '""')}"`).join(',');
    });

    // Add expired loss rows
    const expiredMovements = (movements || []).filter((m) => m.type === 'expired');
    const expiredRows = expiredMovements.map(m => {
      const date = new Date(m.date).toLocaleString('id-ID');
      return [
        `EXP-${m.id}`,
        date,
        '-',
        `${m.productName} (${m.quantity} dibuang)`,
        0,
        0,
        0,
        0,
        'Expired/Buang',
        -m.totalLoss
      ].map(value => `"${String(value).replace(/"/g, '""')}"`).join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows, ...expiredRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Laporan_Penjualan_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Laporan berhasil diunduh!');
  };

  // Render Loader if initial loading is active
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-primary-600 mb-4" />
        <span className="text-sm font-semibold text-gray-500">Memuat data Kantongin...</span>
      </div>
    );
  }

  // Render Auth component if token is absent
  if (!token) {
    return (
      <Auth 
        authMode={authMode} 
        setAuthMode={setAuthMode} 
        onAuthSuccess={handleAuthSuccess} 
        showToast={showToast} 
      />
    );
  }

  // Render Super Admin dashboard if user is super admin
  if (user && user.role === 'admin') {
    return (
      <Admin 
        adminUsers={adminUsers} 
        token={token} 
        onLogout={handleLogout} 
        showToast={showToast} 
      />
    );
  }

  // Normal Store Cashier view
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Printable Receipt overlay */}
      {printReceipt && (
        <div className="print-receipt bg-white text-black p-4 w-72 font-mono text-[11px] leading-tight select-none">
          <div className="text-center pb-2 border-b border-dashed border-black">
            <h4 className="font-bold text-sm uppercase">{settings.storeName || 'Kantongin'}</h4>
            {settings.storeAddress && <p className="text-[9px] mt-0.5">{settings.storeAddress}</p>}
            <p className="text-[9px] mt-1.5">Kode: {printReceipt.code}</p>
            <p className="text-[9px]">Tanggal: {new Date(printReceipt.date).toLocaleString('id-ID')}</p>
          </div>
          <div className="py-2 border-b border-dashed border-black">
            {printReceipt.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start py-0.5">
                <div className="pr-2">
                  <div>{item.name}</div>
                  <div className="text-[9px] text-gray-500">{item.qty} x {rupiah(item.price)}</div>
                </div>
                <div className="font-semibold text-right shrink-0">{rupiah(item.price * item.qty)}</div>
              </div>
            ))}
          </div>
          <div className="py-2 flex flex-col gap-0.5 border-b border-dashed border-black">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{rupiah(printReceipt.subtotal)}</span>
            </div>
            {printReceipt.discount > 0 && (
              <div className="flex justify-between">
                <span>Diskon:</span>
                <span>-{rupiah(printReceipt.discount)}</span>
              </div>
            )}
            {printReceipt.tax > 0 && (
              <div className="flex justify-between">
                <span>PPN:</span>
                <span>{rupiah(printReceipt.tax)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold pt-1 border-t border-black">
              <span>Total:</span>
              <span>{rupiah(printReceipt.total)}</span>
            </div>
            <div className="flex justify-between">
              <span>Metode:</span>
              <span>{printReceipt.paymentMethod}</span>
            </div>
            {printReceipt.paymentMethod !== 'Kasbon' && (
              <>
                <div className="flex justify-between">
                  <span>Bayar:</span>
                  <span>{rupiah(printReceipt.paid)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kembali:</span>
                  <span>{rupiah(printReceipt.change)}</span>
                </div>
              </>
            )}
          </div>
          <div className="text-center pt-2 text-[10px]">Terima kasih atas kunjungan Anda!</div>
        </div>
      )}

      {/* Main app UI (hidden during print) */}
      <div className="flex-1 flex flex-col print:hidden">
        {/* Navigation Header */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm px-4 py-3">
          <div className="max-w-[1480px] mx-auto flex items-center justify-between gap-4">
            
            {/* Store details */}
            <div className="flex items-center gap-3">
              {settings.storePhoto ? (
                <img 
                  src={settings.storePhoto} 
                  alt="Logo" 
                  className="w-10 h-10 object-contain rounded-lg border bg-white shadow-sm shrink-0" 
                />
              ) : (
                <div className="w-10 h-10 text-white bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg p-2.5 shadow-md flex items-center justify-center font-bold uppercase shrink-0">
                  {settings.storeName?.substring(0, 2) || 'KT'}
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <h1 className="text-base font-extrabold text-gray-900 leading-tight truncate">
                  {settings.storeName || 'Kasir Toko'}
                </h1>
                <span className="text-[10px] text-gray-500 font-medium">@{user?.username}</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex items-center gap-1.5">
              <button
                onClick={() => { setActiveView('cashier'); setLatestReceipt(null); }}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition-all active:scale-95 ${
                  activeView === 'cashier'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-650 hover:bg-gray-150 hover:text-gray-900'
                }`}
              >
                <ShoppingBag className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Kasir POS</span>
              </button>
              <button
                onClick={() => { setActiveView('dashboard'); setLatestReceipt(null); }}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition-all active:scale-95 ${
                  activeView === 'dashboard'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-650 hover:bg-gray-150 hover:text-gray-900'
                }`}
              >
                <BarChart2 className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Dashboard Stok</span>
              </button>
              <button
                onClick={() => { setActiveView('history'); setLatestReceipt(null); }}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition-all active:scale-95 ${
                  activeView === 'history'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-650 hover:bg-gray-150 hover:text-gray-900'
                }`}
              >
                <HistoryIcon className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Laporan & Riwayat</span>
              </button>
            </nav>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="px-3 py-2 text-red-600 hover:bg-red-50 text-xs font-bold rounded-lg transition-all active:scale-95 flex items-center gap-1 shrink-0 border border-transparent hover:border-red-100"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </header>

        {/* View container */}
        <main className="flex-1 max-w-[1480px] w-full mx-auto p-4 sm:p-6">
          {activeView === 'cashier' && (
            <Cashier
              products={products}
              cart={cart}
              setCart={setCart}
              settings={settings}
              customerName={customerName}
              setCustomerName={setCustomerName}
              customerPhone={customerPhone}
              setCustomerPhone={setCustomerPhone}
              paymentReceived={paymentReceived}
              setPaymentReceived={setPaymentReceived}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              discount={discount}
              setDiscount={setDiscount}
              latestReceipt={latestReceipt}
              setLatestReceipt={setLatestReceipt}
              onFinishSale={handleFinishSale}
              onPrintReceipt={handlePrintReceipt}
              onSendWhatsAppReceipt={handleSendWhatsAppReceipt}
              showToast={showToast}
              rupiah={rupiah}
              numberOnly={numberOnly}
              uid={uid}
            />
          )}

          {activeView === 'dashboard' && (
            <Dashboard
              products={products}
              transactions={transactions}
              movements={movements}
              settings={settings}
              onSaveProduct={handleSaveProduct}
              onDeleteProduct={handleDeleteProduct}
              onQuickStock={handleQuickStock}
              onAddStock={handleAddStock}
              onHandleExpiredStock={handleExpiredStock}
              onSaveSettings={handleSaveSettings}
              onSaveProfile={handleSaveProfile}
              onRemoveQris={handleRemoveQris}
              onRemoveStorePhoto={handleRemoveStorePhoto}
              onRemoveProductPhoto={handleRemoveProductPhoto}
              showToast={showToast}
              rupiah={rupiah}
              numberOnly={numberOnly}
            />
          )}

          {activeView === 'history' && (
            <History
              transactions={transactions}
              movements={movements}
              settings={settings}
              onPrintReceipt={handlePrintReceipt}
              onSendWhatsAppReceipt={handleSendWhatsAppReceipt}
              onCancelTransaction={handleCancelTransaction}
              onRepayKasbon={handleRepayKasbon}
              onExportCsv={handleExportCsv}
              showToast={showToast}
              rupiah={rupiah}
              numberOnly={numberOnly}
            />
          )}
        </main>
      </div>

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom duration-200">
          <div className={`px-4 py-3 rounded-xl shadow-lg border flex items-center gap-2.5 font-semibold text-xs text-white ${
            toast.type === 'error'
              ? 'bg-red-600 border-red-700'
              : toast.type === 'warning'
              ? 'bg-orange-500 border-orange-600'
              : 'bg-primary-600 border-primary-750'
          }`}>
            <AlertCircle className="w-4.5 h-4.5" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
