const icons = {
  logo: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5V9H4V6.5Zm0 4h16v7A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-7Zm3 2.25v2.5h3v-2.5H7Zm5 0v2.5h5v-2.5h-5Z"/></svg>',
  cart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 6h15l-2 8H8L6 3H3m6 16h.01M17 19h.01"/></svg>',
  box: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="m4.5 8 7.5 4 7.5-4M12 12v8.5"/></svg>',
  plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 5v14M5 12h14"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="m21 21-4.4-4.4M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z"/></svg>',
  chart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 19V5m5 14v-8m5 8V8m5 11V4"/></svg>',
  history: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5m4-1v5l3 2"/></svg>',
  trash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 7h16m-10 4v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
  edit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m4 16-.8 4 4-.8L18.5 7.9a2.2 2.2 0 0 0-3.1-3.1L4 16Z"/></svg>',
  save: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M5 4h12l2 2v14H5V4Z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M8 4v6h8M8 20v-6h8v6"/></svg>',
  receipt: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M7 3h10v18l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3V3Zm3 5h4m-4 4h4m-4 4h2"/></svg>',
  money: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M4 7h16v10H4V7Z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 10v4m3-2a3 3 0 0 1-6 0 3 3 0 0 1 6 0Z"/></svg>',
  warning: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M12 3 2.8 20h18.4L12 3Z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 9v5m0 3h.01"/></svg>',
  package: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 8.5 12 5l7 3.5v7L12 19l-7-3.5v-7Zm7 3.5 7-3.5M12 12 5 8.5m7 3.5V19"/></svg>',
  drink: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M8 4h8l-1 16H9L8 4Zm1 5h6M7 4h10"/></svg>',
  food: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M6 3v18m4-18v18M6 8h4m8-5v18m0-18c-3 2-3 6 0 8"/></svg>',
  home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m4 11 8-7 8 7v9h-5v-6H9v6H4v-9Z"/></svg>',
  send: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m22 2-7 20-4-9-9-4Z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M22 2 11 13"/></svg>',
  bath: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7Z"/></svg>',
  kitchen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>',
  baby: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>',
  medical: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="18" height="14" x="3" y="6" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M12 10v4M10 12h4"/></svg>',
  pen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="14" height="20" x="5" y="2" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01"/></svg>',
  zap: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
  bill: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>',
  download: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
  key: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>'
};

const STORAGE = {
  products: "kasir-toko-products-v1",
  transactions: "kasir-toko-transactions-v1",
  movements: "kasir-toko-stock-movements-v1",
  settings: "kasir-toko-settings-v1"
};

const defaultSettings = {
  qrisImage: "",
  taxPercent: 0,
  storeName: "Kasir Toko",
  storeAddress: "",
  storePhoto: ""
};

const defaultProducts = [
  { id: "p-beras", name: "Beras Premium 5 kg", sku: "BR-5000", category: "Sembako", costPrice: 65000, profit: 7000, price: 72000, stock: 18, minStock: 5, unit: "pak", color: "#166534", image: "package" },
  { id: "p-minyak", name: "Minyak Goreng 1 L", sku: "MY-1000", category: "Sembako", costPrice: 16000, profit: 2500, price: 18500, stock: 26, minStock: 8, unit: "botol", color: "#d5962f", image: "drink" },
  { id: "p-gula", name: "Gula Pasir 1 kg", sku: "GL-1000", category: "Sembako", costPrice: 14000, profit: 2000, price: 16000, stock: 20, minStock: 6, unit: "kg", color: "#6a7c3c", image: "package" },
  { id: "p-kopi", name: "Kopi Sachet", sku: "KP-010", category: "Minuman", costPrice: 2000, profit: 500, price: 2500, stock: 80, minStock: 20, unit: "pcs", color: "#6c4b3e", image: "drink" },
  { id: "p-teh", name: "Teh Celup 25 pcs", sku: "TH-025", category: "Minuman", costPrice: 7500, profit: 2000, price: 9500, stock: 14, minStock: 5, unit: "box", color: "#2f7d50", image: "drink" },
  { id: "p-mie", name: "Mie Instan Goreng", sku: "MI-001", category: "Makanan", costPrice: 2800, profit: 700, price: 3500, stock: 55, minStock: 15, unit: "pcs", color: "#c95743", image: "food" },
  { id: "p-sabun", name: "Sabun Mandi", sku: "SB-001", category: "Rumah Tangga", costPrice: 3500, profit: 1000, price: 4500, stock: 30, minStock: 10, unit: "pcs", color: "#355f91", image: "home" },
  { id: "p-tisu", name: "Tisu Gulung", sku: "TS-001", category: "Rumah Tangga", costPrice: 9000, profit: 3000, price: 12000, stock: 9, minStock: 10, unit: "pak", color: "#7d5578", image: "package" }
];

const urlParams = new URLSearchParams(window.location.search);
const initialAuthMode = urlParams.get('mode') === 'register' ? 'register' : 'login';

const state = {
  activeView: "cashier",
  products: [],
  transactions: [],
  movements: [],
  settings: structuredClone(defaultSettings),
  cart: [],
  search: "",
  dashboardSearch: "",
  historySearch: "",
  customerName: "",
  customerPhone: "",
  selectedCategory: "Semua",
  paymentReceived: 0,
  paymentMethod: "Tunai",
  orderType: "Dine In",
  discount: 0,
  editingId: null,
  latestReceipt: null,
  printReceipt: null,
  toast: null,
  token: localStorage.getItem('kantongin_token') || null,
  user: JSON.parse(localStorage.getItem('kantongin_user') || 'null'),
  authMode: initialAuthMode,
  adminUsers: [],
  tempAuthPayload: null,
  adminModal: null,
  kasbonPayModal: null
};

window.logout = function() {
  state.token = null;
  state.user = null;
  localStorage.removeItem('kantongin_token');
  localStorage.removeItem('kantongin_user');
  state.products = [];
  state.transactions = [];
  render();
};

async function initApp() {
  render(); // Menampilkan layar awal / login
  if (state.token && state.user && state.user.role !== 'admin') {
    try {
      const res = await fetch('/api/store', {
        headers: { 'Authorization': `Bearer ${state.token}` }
      });
      if (!res.ok) throw new Error('Session expired');
      const data = await res.json();
      state.products = data.products || [];
      state.transactions = data.transactions || [];
      state.movements = data.movements || [];
      state.settings = data.settings || structuredClone(defaultSettings);
    } catch (e) {
      logout();
      return;
    }
  } else if (state.token && state.user && state.user.role === 'admin') {
    state.activeView = 'admin';
    try {
      const res = await fetch('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${state.token}` }
      });
      if (res.ok) {
        state.adminUsers = await res.json();
      }
    } catch (e) {
      console.error("Gagal load data admin", e);
    }
  }
  render();
}

function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : structuredClone(fallback);
  } catch (error) {
    return structuredClone(fallback);
  }
}

async function saveAll() {
  localStorage.setItem(STORAGE.products, JSON.stringify(state.products));
  localStorage.setItem(STORAGE.transactions, JSON.stringify(state.transactions));
  localStorage.setItem(STORAGE.movements, JSON.stringify(state.movements));
  localStorage.setItem(STORAGE.settings, JSON.stringify(state.settings));
  
  if (state.token && state.user && state.user.role !== 'admin') {
    try {
      await fetch('/api/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.token}`
        },
        body: JSON.stringify({
          products: state.products,
          transactions: state.transactions,
          movements: state.movements,
          settings: state.settings
        })
      });
    } catch (e) {
      console.error("Gagal sinkronisasi data ke server pusat", e);
    }
  }
}

function rupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(Number(value || 0));
}

function numberOnly(value) {
  const normalized = String(value ?? "").replace(",", ".").replace(/[^\d.]/g, "");
  const parsed = Number(normalized || 0);
  return Math.max(0, Number.isFinite(parsed) ? parsed : 0);
}

function formatPercent(value) {
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 2
  }).format(numberOnly(value));
}

function uid(prefix) {
  if (window.crypto && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
  }
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 999)}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function dateLabel(dateValue) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(dateValue));
}

function productIcon(product) {
  return icons[product.image] || icons.package;
}

function productMedia(product) {
  if (product.photo) {
    return `<img src="${escapeHtml(product.photo)}" alt="${escapeHtml(product.name)}" />`;
  }
  return productIcon(product);
}

function categories() {
  return ["Semua", ...Array.from(new Set(state.products.map((product) => product.category))).sort()];
}

function filteredProducts() {
  const query = state.search.trim().toLowerCase();
  return state.products
    .filter((product) => state.selectedCategory === "Semua" || product.category === state.selectedCategory)
    .filter((product) => {
      if (!query) return true;
      return [product.name, product.sku, product.category].some((item) => item.toLowerCase().includes(query));
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

function filteredInventoryProducts() {
  const query = state.dashboardSearch.trim().toLowerCase();
  return state.products
    .filter((product) => {
      if (!query) return true;
      return [product.name, product.sku, product.category].some((item) => item.toLowerCase().includes(query));
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

function filteredHistoryTransactions() {
  const query = state.historySearch.trim().toLowerCase();
  if (!query) return state.transactions;
  return state.transactions.filter((transaction) => {
    const customerText = String(transaction.customerName || "Umum").toLowerCase();
    const itemText = transaction.items
      .map((item) => `${item.name} ${item.sku || ""}`)
      .join(" ")
      .toLowerCase();
    return transaction.code.toLowerCase().includes(query) || customerText.includes(query) || itemText.includes(query) || String(transaction.paymentMethod || "").toLowerCase().includes(query);
  });
}

function cartTotals() {
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = Math.min(numberOnly(state.discount), subtotal);
  const taxableAmount = subtotal - discount;
  const taxPercent = numberOnly(state.settings.taxPercent);
  const tax = Math.round(taxableAmount * (taxPercent / 100));
  const total = taxableAmount + tax;
  const paid = state.paymentMethod === "Kasbon" ? 0 : numberOnly(state.paymentReceived);
  const change = state.paymentMethod === "Kasbon" ? 0 : Math.max(0, paid - total);
  return { subtotal, discount, taxableAmount, taxPercent, tax, total, paid, change };
}

function dailyStats() {
  const todaySales = salesSummaryFrom(startOfToday());
  return {
    productCount: state.products.length,
    stockValue: state.products.reduce((sum, product) => sum + product.price * product.stock, 0),
    lowStock: state.products.filter((product) => product.stock <= product.minStock).length,
    todaysRevenue: todaySales.revenue
  };
}

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function startOfDaysAgo(days) {
  const date = startOfToday();
  date.setDate(date.getDate() - days);
  return date;
}

function startOfMonthsAgo(months) {
  const date = startOfToday();
  date.setMonth(date.getMonth() - months);
  return date;
}

function salesSummaryFrom(startDate) {
  const transactions = state.transactions.filter((transaction) => new Date(transaction.date) >= startDate);
  return {
    revenue: transactions.reduce((sum, transaction) => sum + numberOnly(transaction.total), 0),
    transactions: transactions.length,
    items: transactions.reduce((sum, transaction) => {
      return sum + transaction.items.reduce((itemSum, item) => itemSum + numberOnly(item.qty), 0);
        }, 0),
        profit: transactions.reduce((sum, transaction) => {
          return sum + transaction.items.reduce((itemSum, item) => itemSum + (numberOnly(item.profit || 0) * numberOnly(item.qty)), 0);
        }, 0)
  };
}

function salesPeriods() {
  return [
    { label: "Hari ini", range: "Mulai 00.00", summary: salesSummaryFrom(startOfToday()) },
    { label: "1 Minggu", range: "7 hari terakhir", summary: salesSummaryFrom(startOfDaysAgo(6)) },
    { label: "1 Bulan", range: "1 bulan terakhir", summary: salesSummaryFrom(startOfMonthsAgo(1)) },
    { label: "3 Bulan", range: "3 bulan terakhir", summary: salesSummaryFrom(startOfMonthsAgo(3)) },
    { label: "6 Bulan", range: "6 bulan terakhir", summary: salesSummaryFrom(startOfMonthsAgo(6)) },
    { label: "1 Tahun", range: "12 bulan terakhir", summary: salesSummaryFrom(startOfMonthsAgo(12)) }
  ];
}

function render() {
  const app = document.getElementById("app");
  let html = "";

  if (!state.token) {
    html = renderAuth();
  } else if (state.user?.role === 'admin') {
    html = renderAdminView();
  } else {
    html = `
      <div class="min-h-screen flex flex-col bg-gray-50/50">
        <header class="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div class="w-full max-w-[1480px] mx-auto px-4 md:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3 min-w-0 w-full md:w-auto justify-center md:justify-start">
            ${state.settings.storePhoto ? `<img src="${escapeHtml(state.settings.storePhoto)}" alt="Logo Toko" class="w-11 h-11 object-contain bg-white rounded-xl border border-gray-200 shadow-sm shrink-0" />` : `<div class="w-11 h-11 flex items-center justify-center text-white bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl shadow-md shrink-0 [&>svg]:w-6 [&>svg]:h-6">${icons.logo}</div>`}
            <div class="flex flex-col min-w-0">
              <h1 class="text-lg font-extrabold text-gray-900 leading-tight truncate">${escapeHtml(state.settings.storeName || "Kasir Toko")}</h1>
              <p class="text-xs font-medium text-gray-500 truncate mt-0.5">Penjualan, barang, dan stok dalam satu layar</p>
            </div>
          </div>
          <nav class="flex items-center gap-1.5 p-1.5 bg-gray-100/80 border border-gray-200 rounded-xl overflow-x-auto w-full md:w-auto hide-scrollbar" aria-label="Navigasi utama">
            ${navButton("cashier", icons.cart, "Kasir")}
            ${navButton("dashboard", icons.chart, "Dashboard Barang")}
            ${navButton("history", icons.history, "Riwayat")}
            <button class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg transition-all" onclick="logout()" type="button">Logout</button>
          </nav>
          <div class="hidden lg:block text-sm font-bold text-gray-500 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 shadow-sm shrink-0">
            ${new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date())}
          </div>
        </div>
      </header>
      <main class="flex-1 w-full max-w-[1480px] mx-auto p-4 md:p-6">${renderActiveView()}</main>
      ${state.printReceipt ? `<div class="print-receipt">${renderReceipt(state.printReceipt, { title: "Struk Pembayaran", showButton: false })}</div>` : ""}
      </div>
    `;
  }

  if (state.kasbonPayModal) {
    const kbTrx = state.kasbonPayModal;
    html += `
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4" id="kasbonPayOverlay">
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden border border-gray-100 animate-in">
          <div class="p-4 border-b border-gray-100 bg-gradient-to-r from-accent-50 to-primary-50 flex justify-between items-center">
            <div>
              <h3 class="font-bold text-gray-800">Lunasi Kasbon</h3>
              <p class="text-xs text-gray-500 mt-0.5">${escapeHtml(kbTrx.customerName || "Umum")} — ${escapeHtml(kbTrx.code)}</p>
            </div>
            <button type="button" class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all outline-none" data-close-kasbon-modal>✕</button>
          </div>
          <div class="p-5">
            <div class="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-xl mb-5">
              <span class="text-sm text-gray-500">Total Tagihan</span>
              <strong class="text-lg text-accent-600 font-extrabold">${rupiah(kbTrx.total)}</strong>
            </div>
            <label class="block text-xs font-bold text-gray-600 mb-2">Metode Pembayaran</label>
            <div class="grid grid-cols-2 gap-3 mb-5" id="kasbonPayMethodSelect">
              <button type="button" class="flex flex-col items-center gap-2 p-4 border-2 rounded-xl transition-all hover:shadow-md active:scale-95 border-primary-500 bg-primary-50 text-primary-700 shadow-sm" data-kasbon-method="Tunai">
                <span class="w-7 h-7 [&>svg]:w-full [&>svg]:h-full">${icons.money}</span>
                <span class="text-sm font-bold">Tunai</span>
              </button>
              <button type="button" class="flex flex-col items-center gap-2 p-4 border-2 rounded-xl transition-all hover:shadow-md active:scale-95 border-gray-200 bg-white text-gray-600" data-kasbon-method="QRIS">
                <span class="w-7 h-7 [&>svg]:w-full [&>svg]:h-full">${icons.phone}</span>
                <span class="text-sm font-bold">QRIS</span>
              </button>
            </div>
            ${state.settings.qrisImage ? `<div id="kasbonQrisPreview" class="hidden mb-4 p-3 border border-primary-200 rounded-xl bg-primary-50/50 text-center"><img src="${escapeHtml(state.settings.qrisImage)}" alt="QRIS" class="w-32 h-32 object-contain mx-auto p-1 bg-white border border-gray-200 rounded-lg shadow-sm" /><p class="text-xs text-gray-500 mt-2">Scan QRIS untuk menerima pembayaran</p></div>` : ""}
            <button type="button" class="w-full py-3 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2" data-confirm-kasbon-pay>
              <span class="w-5 h-5 [&>svg]:w-full [&>svg]:h-full">${icons.receipt}</span>
              <span>Konfirmasi Pelunasan</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  if (state.toast) {
    const bgClass = state.toast.type === "error" ? "bg-red-600" : state.toast.type === "warning" ? "bg-amber-600" : "bg-gray-800";
    html += `
      <div class="fixed bottom-6 right-6 z-[100] max-w-[calc(100vw-3rem)] md:max-w-sm" role="status">
        <div class="flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl ${bgClass} text-white">
          <span class="text-sm font-semibold leading-snug">${escapeHtml(state.toast.message)}</span>
        </div>
      </div>
    `;
  }

  app.innerHTML = html;
  bindEvents();
}

function renderAuth() {
  const isLogin = state.authMode === 'login';
  const isOtp = state.authMode.startsWith('otp_');

  if (isOtp) {
    return `
      <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
          <div class="flex justify-center mb-6 text-primary-600 w-16 h-16 mx-auto [&>svg]:w-full [&>svg]:h-full">${icons.logo}</div>
          <h2 class="text-2xl font-bold text-center text-gray-800 mb-2">Verifikasi OTP</h2>
          <p class="text-center text-sm text-gray-500 mb-6">Masukkan 6 digit kode yang dikirim ke email.</p>
          
          <form id="authForm" class="flex flex-col gap-4">
            <div>
              <label class="block text-xs font-bold text-gray-600 mb-1.5">Kode OTP</label>
              <input name="otp" type="text" maxlength="6" class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all text-center tracking-[0.5em] text-xl font-bold" required placeholder="••••••" />
            </div>
            <button type="submit" class="w-full py-3 mt-2 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95">Verifikasi</button>
            <button type="button" class="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all active:scale-95" onclick="state.authMode = state.authMode.replace('otp_', ''); render();">Batal</button>
          </form>
        </div>
      </div>
    `;
  }

  return `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div class="flex justify-center mb-6 text-primary-600 w-16 h-16 mx-auto [&>svg]:w-full [&>svg]:h-full">${icons.logo}</div>
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-2">${isLogin ? 'Login Kasir' : 'Daftar Akun Baru'}</h2>
        <p class="text-center text-sm text-gray-500 mb-6">${isLogin ? 'Masuk ke toko Anda' : 'Satu akun untuk satu toko'}</p>
        
        <form id="authForm" class="flex flex-col gap-4">
          ${!isLogin ? `
            <div>
              <label class="block text-xs font-bold text-gray-600 mb-1.5">Nama Toko / Pemilik</label>
              <input name="name" class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all" required minlength="3" placeholder="Min. 3 karakter" />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-600 mb-1.5">Email</label>
              <input name="email" type="email" class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all" required placeholder="email@contoh.com" />
            </div>
          ` : ''}
          <div>
            <label class="block text-xs font-bold text-gray-600 mb-1.5">Username</label>
            <input name="username" class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all" required ${!isLogin ? 'pattern="[a-z0-9_]{4,}" title="Minimal 4 karakter, hanya huruf kecil, angka, atau underscore" placeholder="Min. 4 karakter"' : 'placeholder="Masukkan username"'} />
            ${!isLogin ? '<p class="text-[10px] text-gray-500 mt-1">*Hanya huruf kecil, angka, dan garis bawah (_), tanpa spasi.</p>' : ''}
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-600 mb-1.5">Password</label>
            <input type="password" name="password" class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all" required ${!isLogin ? 'minlength="6" placeholder="Min. 6 karakter"' : 'placeholder="Masukkan password"'} />
            ${!isLogin ? '<p class="text-[10px] text-gray-500 mt-1">*Minimal 6 karakter untuk keamanan.</p>' : ''}
          </div>
          ${!isLogin ? `
            <div>
              <label class="block text-xs font-bold text-gray-600 mb-1.5">Konfirmasi Password</label>
              <input type="password" name="password_confirm" class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all" required minlength="6" placeholder="Ulangi password" />
            </div>
          ` : ''}
          <button type="submit" class="w-full py-3 mt-2 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95">
            ${isLogin ? 'Masuk' : 'Daftar Sekarang'}
          </button>
        </form>
        
        <p class="text-center mt-6 text-sm text-gray-600">
          ${isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'} 
          <button type="button" class="text-primary-600 font-bold hover:underline" data-switch-auth>
            ${isLogin ? 'Daftar di sini' : 'Login di sini'}
          </button>
        </p>
      </div>
    </div>
  `;
}

function renderAdminView() {
  const totalUsers = state.adminUsers.length;
  const totalProducts = state.adminUsers.reduce((sum, u) => sum + (u.productsCount || 0), 0);
  const totalTrx = state.adminUsers.reduce((sum, u) => sum + (u.transactionsCount || 0), 0);
  
  let modalHtml = '';
  if (state.adminModal) {
    modalHtml = `
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden border border-gray-100">
          <div class="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h3 class="font-bold text-gray-800">Ubah Sandi Pengguna</h3>
            <button type="button" class="text-gray-400 hover:text-gray-600 outline-none" data-close-admin-modal>✕</button>
          </div>
          <form id="adminResetForm" class="p-5 flex flex-col gap-4">
            <div>
              <p class="text-sm text-gray-500 mb-3">Atur ulang password untuk akun toko <strong class="text-gray-800">@${escapeHtml(state.adminModal.username)}</strong>.</p>
              <label class="block text-xs font-bold text-gray-600 mb-1.5">Password Baru</label>
              <input type="password" name="newPassword" class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all" required minlength="6" placeholder="Minimal 6 karakter" />
            </div>
            <button type="submit" class="w-full mt-2 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 flex justify-center items-center gap-2">
              <span class="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">${icons.save}</span> Simpan Password
            </button>
          </form>
        </div>
      </div>
    `;
  }

  return `
    <div class="min-h-screen bg-gray-50 p-6">
      <div class="max-w-[1480px] mx-auto">
        <header class="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div class="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
            <div class="w-11 h-11 text-white bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl p-2.5 shadow-md [&>svg]:w-full [&>svg]:h-full shrink-0">${icons.logo}</div>
            <div class="flex flex-col">
              <h1 class="text-xl font-bold text-gray-900 leading-tight">Super Admin Dashboard</h1>
              <p class="text-xs text-gray-500">Pusat kontrol dan pemantauan aktivitas seluruh toko</p>
            </div>
          </div>
          <button class="w-full sm:w-auto px-4 py-2 bg-red-50 text-red-600 font-bold text-sm rounded-lg hover:bg-red-100 transition-all active:scale-95" onclick="logout()" type="button">Logout Akses</button>
        </header>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          ${metricCard(icons.home, "Total Toko Aktif", totalUsers)}
          ${metricCard(icons.box, "Total Barang Terdaftar", totalProducts)}
          ${metricCard(icons.receipt, "Transaksi Selesai", totalTrx)}
        </div>
        
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div class="p-5 border-b border-gray-100 bg-gray-50/50">
            <h2 class="font-bold text-gray-800 text-lg">Daftar Akun Toko</h2>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left whitespace-nowrap border-collapse">
              <thead>
                <tr class="bg-gray-50 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <th class="px-5 py-3 border-b border-gray-100">Nama Toko / Pemilik</th>
                  <th class="px-5 py-3 border-b border-gray-100">Aktivitas</th>
                  <th class="px-5 py-3 border-b border-gray-100 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                ${state.adminUsers.length === 0 ? '<tr><td colspan="3" class="px-5 py-12 text-center text-gray-500 text-sm">Belum ada pengguna terdaftar</td></tr>' : ''}
                ${state.adminUsers.map(u => `
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-5 py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm uppercase shrink-0">${escapeHtml(u.name.substring(0, 2))}</div>
                        <div>
                          <strong class="text-sm text-gray-800 block">${escapeHtml(u.name)}</strong>
                          <span class="text-xs text-gray-500">@${escapeHtml(u.username)}</span>
                        </div>
                      </div>
                    </td>
                    <td class="px-5 py-4">
                      <div class="flex gap-2">
                        <span class="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-bold text-[11px] border border-blue-100">${u.productsCount || 0} Barang</span>
                        <span class="bg-green-50 text-green-700 px-2.5 py-1 rounded-md font-bold text-[11px] border border-green-100">${u.transactionsCount || 0} Trx</span>
                      </div>
                    </td>
                    <td class="px-5 py-4 text-right">
                      <button class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50 hover:text-primary-600 shadow-sm active:scale-95 transition-all outline-none" type="button" data-reset-pw="${u.id}" data-reset-username="${escapeHtml(u.username)}">
                        <span class="w-3.5 h-3.5 [&>svg]:w-full [&>svg]:h-full">${icons.key}</span> Ubah Sandi
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      ${modalHtml}
    </div>
  `;
}

async function handleAuth(e) {
  e.preventDefault();
  const isLogin = state.authMode === 'login';
  const isOtp = state.authMode.startsWith('otp_');
  const formData = new FormData(e.target);
  const payload = Object.fromEntries(formData);
  
  if (isOtp) {
    const action = state.authMode === 'otp_login' ? 'login' : 'register';
    try {
      const res = await fetch(`/api/${action}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...state.tempAuthPayload, otp: payload.otp })
      });
      
      let data;
      try {
        data = await res.json();
      } catch (e) {
        throw new Error('Gagal memproses respons server. Periksa pesan merah di terminal VS Code.');
      }
      if (!res.ok) throw new Error(data?.error || 'Verifikasi gagal');
      
      if (action === 'login') {
        state.token = data.token;
        state.user = data.user;
        localStorage.setItem('kantongin_token', data.token);
        localStorage.setItem('kantongin_user', JSON.stringify(data.user));
        showToast('Login berhasil!');
        initApp();
      } else {
        state.authMode = 'login';
        state.tempAuthPayload = null;
        showToast('Registrasi berhasil, silakan login.');
        render();
      }
    } catch (err) {
      const errorMsg = (err.message === 'Failed to fetch' || err.message.includes('NetworkError'))
        ? 'Gagal menyambung ke server. Pastikan backend sudah berjalan.'
        : err.message;
      console.error("Detail Error Auth (Verifikasi):", err);
      showToast(errorMsg, 'error');
    }
  } else {
    if (!isLogin && payload.password !== payload.password_confirm) {
      showToast('Password dan konfirmasi password tidak cocok!', 'error');
      return;
    }
    delete payload.password_confirm;

    try {
      const endpoint = isLogin ? '/api/login/request-otp' : '/api/register/request-otp';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      let data;
      try {
        data = await res.json();
      } catch (e) {
        throw new Error('Gagal memproses respons server. Periksa pesan merah di terminal VS Code.');
      }
      if (!res.ok) throw new Error(data?.error || 'Gagal menyambung ke server');
      
      state.tempAuthPayload = payload;
      state.authMode = isLogin ? 'otp_login' : 'otp_register';
      showToast(data.message || 'OTP berhasil dikirim!');
      render();
    } catch (err) {
      const errorMsg = (err.message === 'Failed to fetch' || err.message.includes('NetworkError'))
        ? 'Gagal menyambung ke server. Pastikan backend sudah berjalan.'
        : err.message;
      console.error("Detail Error Auth (Request OTP):", err);
      showToast(errorMsg, 'error');
    }
  }
}

function navButton(view, icon, label) {
  const isActive = state.activeView === view;
  const baseClass = "flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap active:scale-95";
  const activeClass = isActive ? "bg-white text-accent-600 shadow-sm border border-gray-200/50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50 border border-transparent";
  
  return `
    <button class="${baseClass} ${activeClass}" data-view="${view}" type="button">
      <span class="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">${icon}</span><span>${label}</span>
    </button>
  `;
}

function renderActiveView() {
  if (state.activeView === "dashboard") return renderDashboard();
  if (state.activeView === "history") return renderHistory();
  return renderCashier();
}

function renderCashier() {
  const products = filteredProducts();
  const totals = cartTotals();
  const isQris = state.paymentMethod === "QRIS";
  const isKasbon = state.paymentMethod === "Kasbon";
  const canComplete = state.cart.length > 0 && totals.total > 0 && (isKasbon || totals.paid >= totals.total);
  
  return `
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">Kasir Penjualan</h2>
        <p class="text-sm text-gray-500 mt-1">Pilih barang, atur jumlah, lalu selesaikan pembayaran.</p>
      </div>
      <div class="flex gap-2">
        <button class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all font-semibold active:scale-95" data-view="dashboard" type="button">
          <span class="w-5 h-5 [&>svg]:w-full [&>svg]:h-full">${icons.plus}</span><span>Tambah Barang</span>
        </button>
      </div>
    </div>
    
    <section class="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 items-start">
      <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h3 class="font-bold text-gray-800">Daftar Barang</h3>
            <p class="text-xs text-gray-500 mt-0.5">${products.length} barang tersedia</p>
          </div>
          <div class="relative w-full sm:w-64">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 [&>svg]:w-full [&>svg]:h-full">${icons.search}</span>
            <label class="sr-only" for="cashierSearch">Cari barang</label>
            <input id="cashierSearch" class="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all" type="search" placeholder="Cari nama, SKU..." value="${escapeHtml(state.search)}" data-input="cashier-search" />
          </div>
        </div>
        <div class="p-4">
          <div class="flex flex-wrap gap-2 mb-5">
            ${categories().map((category) => `
              <button class="px-3 py-1.5 text-sm font-medium rounded-lg border transition-all ${category === state.selectedCategory ? "bg-primary-500 text-white border-primary-500 shadow-md" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"}" data-category="${escapeHtml(category)}" type="button">${escapeHtml(category)}</button>
            `).join("")}
          </div>
          ${products.length ? `
            <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              ${products.map(renderProductCard).join("")}
            </div>
          ` : `<div class="py-12 px-6 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-gray-500">Barang tidak ditemukan. Tambahkan barang baru lewat Dashboard Barang.</div>`}
        </div>
      </div>
      
      <aside class="bg-white border border-gray-200 rounded-xl shadow-sm lg:sticky lg:top-24 flex flex-col">
        <div class="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50 rounded-t-xl">
          <div>
            <h3 class="font-bold text-gray-800">Keranjang</h3>
            <p class="text-xs text-gray-500 mt-0.5">${state.cart.length} jenis barang</p>
          </div>
          <button class="w-9 h-9 flex items-center justify-center text-red-500 bg-red-50 border border-red-100 rounded-lg hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed" type="button" data-clear-cart title="Kosongkan keranjang" ${state.cart.length ? "" : "disabled"}>
            <span class="w-5 h-5 [&>svg]:w-full [&>svg]:h-full">${icons.trash}</span>
          </button>
        </div>
        <div class="p-4 max-h-[calc(100vh-140px)] overflow-y-auto">
          <div class="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label for="customerName" class="block text-xs font-bold text-gray-600 mb-1.5">Nama pelanggan</label>
              <input id="customerName" class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all" type="text" value="${escapeHtml(state.customerName)}" data-input="customer-name" placeholder="Contoh: Budi" />
            </div>
            <div>
              <label for="customerPhone" class="block text-xs font-bold text-gray-600 mb-1.5">No. WhatsApp</label>
              <input id="customerPhone" class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all" type="tel" value="${escapeHtml(state.customerPhone)}" data-input="customer-phone" placeholder="Contoh: 0812..." />
            </div>
            <div class="col-span-2">
              <label class="block text-xs font-bold text-gray-600 mb-1.5">Tipe Pesanan</label>
              <div class="grid grid-cols-2 gap-2">
                <label class="flex items-center gap-2 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${state.orderType === 'Dine In' ? 'bg-primary-50 border-primary-500 text-primary-700' : ''}">
                  <input type="radio" name="orderType" value="Dine In" data-input="order-type" class="w-4 h-4 text-primary-600 focus:ring-primary-500" ${state.orderType === 'Dine In' ? 'checked' : ''} />
                  <span class="text-sm font-semibold">Dine In</span>
                </label>
                <label class="flex items-center gap-2 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${state.orderType === 'Take Away' ? 'bg-primary-50 border-primary-500 text-primary-700' : ''}">
                  <input type="radio" name="orderType" value="Take Away" data-input="order-type" class="w-4 h-4 text-primary-600 focus:ring-primary-500" ${state.orderType === 'Take Away' ? 'checked' : ''} />
                  <span class="text-sm font-semibold">Take Away</span>
                </label>
              </div>
            </div>
          </div>
          
          ${renderCart()}
          
          <div class="grid grid-cols-2 gap-3 mt-4">
            <div>
              <label for="discountInput" class="block text-xs font-bold text-gray-600 mb-1.5">Diskon</label>
              <input id="discountInput" class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all" type="text" inputmode="numeric" pattern="[0-9]*" value="${state.discount || ""}" data-input="discount" placeholder="0" />
            </div>
            <div>
              <label for="paymentMethod" class="block text-xs font-bold text-gray-600 mb-1.5">Metode</label>
              <select id="paymentMethod" class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all bg-white" data-input="payment-method">
                ${["Tunai", "QRIS", "Kasbon"].map((method) => `<option value="${method}" ${state.paymentMethod === method ? "selected" : ""}>${method}</option>`).join("")}
              </select>
            </div>
            <div class="col-span-2">
              <label for="paidInput" class="block text-xs font-bold text-gray-600 mb-1.5">${isQris ? "Nominal QRIS" : isKasbon ? "Nominal Kasbon" : "Uang diterima"}</label>
              <input id="paidInput" class="w-full px-3 py-2.5 text-base font-bold text-gray-800 border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all bg-gray-50" type="text" inputmode="numeric" pattern="[0-9]*" value="${isKasbon ? rupiah(0) : state.paymentReceived || ""}" data-input="payment" placeholder="${isQris ? "Masukkan nominal QRIS" : isKasbon ? "Belum dibayar" : "Masukkan nominal pembayaran"}" ${isKasbon ? "disabled" : ""} />
            </div>
          </div>
          
          ${isQris ? renderQrisCheckout() : ""}
          
          <div class="mt-5 bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm">
            <div class="flex justify-between text-gray-500 mb-2"><span>Subtotal</span><strong class="text-gray-800">${rupiah(totals.subtotal)}</strong></div>
            <div class="flex justify-between text-gray-500 mb-2"><span>Diskon</span><strong class="text-gray-800">${rupiah(totals.discount)}</strong></div>
            <div class="flex justify-between text-gray-500 mb-3"><span>PPN (${formatPercent(totals.taxPercent)}%)</span><strong class="text-gray-800">${rupiah(totals.tax)}</strong></div>
            <div class="flex justify-between items-center text-gray-800 pt-3 border-t border-dashed border-gray-200 mb-3">
              <span class="font-bold">Total</span><strong class="text-lg text-accent-600">${rupiah(totals.total)}</strong>
            </div>
            <div class="flex justify-between text-gray-500"><span>Kembali</span><strong class="text-gray-800">${rupiah(totals.change)}</strong></div>
          </div>
          
          <div class="grid grid-cols-2 gap-3 mt-4">
            <button class="col-span-2 flex items-center justify-center gap-2 py-3.5 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100" type="button" data-complete-sale ${canComplete ? "" : "disabled"}>
              <span class="w-5 h-5 [&>svg]:w-full [&>svg]:h-full">${icons.receipt}</span><span>Selesaikan</span>
            </button>
            ${isKasbon ? "" : `
              <button class="col-span-2 flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100" type="button" data-fill-exact ${state.cart.length ? "" : "disabled"}>
                <span class="w-5 h-5 [&>svg]:w-full [&>svg]:h-full">${icons.money}</span><span>Uang Pas</span>
              </button>
            `}
          </div>
          
          ${state.latestReceipt ? `<div class="mt-5 pt-5 border-t border-gray-200">${renderReceipt(state.latestReceipt)}</div>` : ""}
        </div>
      </aside>
    </section>
  `;
}

function renderQrisCheckout() {
  if (!state.settings.qrisImage) {
    return `
      <div class="mt-4 p-4 border border-dashed border-gray-300 rounded-xl bg-gray-50 text-center">
        <strong class="block text-gray-600 text-sm mb-1">QRIS belum diunggah</strong>
        <span class="text-xs text-gray-500">Tambahkan gambar QRIS dari Dashboard Barang.</span>
      </div>
    `;
  }
  return `
    <div class="mt-4 flex items-center justify-between gap-4 p-3 border border-primary-200 rounded-xl bg-primary-50/50">
      <div>
        <strong class="block text-sm text-gray-800 mb-1">Scan QRIS toko</strong>
        <span class="text-xs text-gray-500 leading-relaxed">Pembayaran akan tercatat sesuai total belanja.</span>
      </div>
      <img src="${escapeHtml(state.settings.qrisImage)}" alt="QRIS toko" class="w-16 h-16 object-contain p-1 bg-white border border-gray-200 rounded-lg shadow-sm shrink-0" />
    </div>
  `;
}

function renderProductCard(product) {
  const isOut = product.stock <= 0;
  const isLow = product.stock <= product.minStock;
  const badgeClass = isOut ? "bg-red-50 text-red-600" : isLow ? "bg-amber-50 text-amber-600" : "bg-green-50 text-green-600";
  const badgeText = isOut ? "Habis" : isLow ? "Stok rendah" : "Tersedia";
  
  return `
    <article class="flex flex-col bg-white border border-gray-100 rounded-xl p-3.5 shadow-sm hover:shadow-md hover:border-primary-300 transition-all group">
      <div class="flex gap-3 items-center mb-3">
        <div class="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 overflow-hidden text-white ${product.photo ? "border border-gray-100" : ""}" style="${product.photo ? "" : `background-color: ${escapeHtml(product.color || "#166534")}`}">
          ${product.photo ? `<img src="${escapeHtml(product.photo)}" alt="${escapeHtml(product.name)}" class="w-full h-full object-cover" />` : `<div class="w-6 h-6 [&>svg]:w-full [&>svg]:h-full">${productIcon(product)}</div>`}
        </div>
        <div class="min-w-0">
          <h4 class="font-bold text-gray-800 text-sm truncate leading-tight">${escapeHtml(product.name)}</h4>
          <span class="text-xs text-gray-400 truncate block mt-0.5">${escapeHtml(product.sku)}</span>
        </div>
      </div>
      <div class="mt-auto flex flex-col gap-3">
        <div class="font-extrabold text-gray-900 text-[1.1rem]">${rupiah(product.price)}</div>
        <div class="flex items-center justify-between">
          <span class="text-xs font-medium text-gray-500">${product.stock} ${escapeHtml(product.unit)}</span>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-md ${badgeClass}">${badgeText}</span>
        </div>
        <button class="mt-1 w-full flex items-center justify-center gap-1.5 py-2 bg-primary-50 text-primary-600 hover:bg-primary-500 hover:text-white rounded-lg text-sm font-bold transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100" type="button" data-add-product="${product.id}" ${isOut ? "disabled" : ""}>
          <span class="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">${icons.plus}</span><span>Masukkan</span>
        </button>
      </div>
    </article>
  `;
}

function renderCart() {
  if (!state.cart.length) {
    return `<div class="py-8 px-4 text-center border border-dashed border-gray-200 rounded-xl bg-gray-50 text-sm text-gray-500">Keranjang masih kosong. Pilih barang dari daftar.</div>`;
  }
  return `
    <div class="border border-gray-200 rounded-xl bg-white overflow-hidden">
      ${state.cart.map((item, index) => `
        <div class="flex items-center gap-3 p-3 ${index !== state.cart.length - 1 ? "border-b border-gray-100" : ""}">
          <div class="flex-1 min-w-0">
            <div class="font-bold text-gray-800 text-sm truncate">${escapeHtml(item.name)}</div>
            <div class="text-xs text-gray-500 mt-0.5">${rupiah(item.price)}</div>
          </div>
          <div class="flex flex-col items-end gap-2 shrink-0">
            <div class="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg p-0.5">
              <button class="w-7 h-7 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-md transition-colors" type="button" data-cart-action="remove" data-cart-id="${item.id}"><span class="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">${icons.trash}</span></button>
              <button class="w-7 h-7 flex items-center justify-center text-gray-600 bg-white rounded-md shadow-sm border border-gray-200 hover:bg-gray-100 active:scale-95 transition-all" type="button" data-cart-action="decrease" data-cart-id="${item.id}">-</button>
              <span class="text-sm font-bold w-6 text-center text-gray-800">${item.qty}</span>
              <button class="w-7 h-7 flex items-center justify-center text-gray-600 bg-white rounded-md shadow-sm border border-gray-200 hover:bg-gray-100 active:scale-95 transition-all" type="button" data-cart-action="increase" data-cart-id="${item.id}">+</button>
            </div>
            <div class="font-bold text-accent-600 text-sm">${rupiah(item.price * item.qty)}</div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderReceipt(transaction, options = {}) {
  const title = options.title || "Struk terakhir";
  const showButton = options.showButton !== false;
  return `
    <div class="receipt">
      <div class="receipt-header">
        <div style="display: flex; gap: 10px; align-items: center;">
          ${state.settings.storePhoto ? `<img src="${escapeHtml(state.settings.storePhoto)}" alt="Logo Toko" style="max-width: 44px; max-height: 44px; object-fit: contain; border-radius: var(--radius); border: 1px solid var(--line);" />` : ""}
          <div>
            <h4>${escapeHtml(state.settings.storeName || "Kasir Toko")}</h4>
            <small>${escapeHtml(title)}</small>
          </div>
        </div>
          ${showButton ? `
            <div style="display: flex; gap: 8px;">
              <button class="secondary-button receipt-print-button" type="button" data-print-receipt="${escapeHtml(transaction.id)}">${icons.receipt}<span>Cetak</span></button>
              ${transaction.customerPhone ? `<button class="secondary-button receipt-print-button" type="button" data-wa-receipt="${escapeHtml(transaction.id)}">${icons.send}<span>WA</span></button>` : ""}
            </div>
          ` : ""}
      </div>
      <div class="receipt-row"><span>${escapeHtml(transaction.code)}</span><strong>${rupiah(transaction.total)}</strong></div>
      <div class="receipt-row"><span>Tanggal</span><strong>${dateLabel(transaction.date)}</strong></div>
      <div class="receipt-row"><span>Pelanggan</span><strong>${escapeHtml(transaction.customerName || "Umum")}</strong></div>
      <div class="receipt-row"><span>Tipe Pesanan</span><strong>${escapeHtml(transaction.orderType || "Dine In")}</strong></div>
      <div class="receipt-list">
        ${transaction.items.map((item) => `
          <div class="receipt-row"><span>${escapeHtml(item.name)} x ${item.qty}</span><span>${rupiah(item.price * item.qty)}</span></div>
        `).join("")}
      </div>
      <div class="receipt-row"><span>Subtotal</span><strong>${rupiah(transaction.subtotal)}</strong></div>
      <div class="receipt-row"><span>Diskon</span><strong>${rupiah(transaction.discount)}</strong></div>
      <div class="receipt-row"><span>PPN (${formatPercent(transaction.taxPercent || 0)}%)</span><strong>${rupiah(transaction.tax || 0)}</strong></div>
      <div class="receipt-row"><span>Bayar ${escapeHtml(transaction.paymentMethod)}${transaction.kasbonPaidMethod ? ' (Lunas - ' + escapeHtml(transaction.kasbonPaidMethod) + ')' : ''}</span><strong>${rupiah(transaction.paid)}</strong></div>
      <div class="receipt-row"><span>Kembali</span><strong>${rupiah(transaction.change)}</strong></div>
      ${state.settings.storeAddress ? `
        <div style="margin-top: 16px; padding-top: 12px; border-top: 1px dashed var(--line); text-align: center; color: var(--muted); font-size: 0.85rem; white-space: pre-wrap; line-height: 1.4;">${escapeHtml(state.settings.storeAddress)}</div>
      ` : ""}
    </div>
  `;
}

function renderDashboard() {
  const stats = dailyStats();
  const editingProduct = state.products.find((product) => product.id === state.editingId);
  const inventory = filteredInventoryProducts();
  return `
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">Dashboard Barang</h2>
        <p class="text-sm text-gray-500 mt-1">Tambah barang baru, ubah data, dan tambah stok masuk.</p>
      </div>
      <div class="flex gap-2">
        <button class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all font-semibold active:scale-95" type="button" data-view="cashier">
          <span class="w-5 h-5 [&>svg]:w-full [&>svg]:h-full">${icons.cart}</span><span>Buka Kasir</span>
        </button>
      </div>
    </div>
    <section class="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      ${metricCard(icons.box, "Total barang", stats.productCount)}
      ${metricCard(icons.money, "Nilai stok", rupiah(stats.stockValue))}
      ${metricCard(icons.warning, "Stok rendah", stats.lowStock)}
      ${metricCard(icons.receipt, "Penjualan hari ini", rupiah(stats.todaysRevenue))}
    </section>
    ${renderSalesOverview()}
    <section class="grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr] gap-6 items-start">
      <div class="flex flex-col gap-6">
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div class="p-4 border-b border-gray-100 bg-gray-50/50">
            <h3 class="font-bold text-gray-800">${editingProduct ? "Ubah Barang" : "Tambah Barang"}</h3>
            <p class="text-xs text-gray-500 mt-0.5">Data ini akan muncul di layar kasir.</p>
          </div>
          <div class="p-4">${renderProductForm(editingProduct)}</div>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div class="p-4 border-b border-gray-100 bg-gray-50/50">
            <h3 class="font-bold text-gray-800">Tambah Stok</h3>
            <p class="text-xs text-gray-500 mt-0.5">Catat barang masuk tanpa mengubah data harga.</p>
          </div>
          <div class="p-4">${renderStockForm()}</div>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div class="p-4 border-b border-gray-100 bg-gray-50/50">
            <h3 class="font-bold text-gray-800">Pengaturan Pembayaran</h3>
            <p class="text-xs text-gray-500 mt-0.5">Atur QRIS dan PPN untuk transaksi kasir.</p>
          </div>
          <div class="p-4">${renderSettingsForm()}</div>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div class="p-4 border-b border-gray-100 bg-gray-50/50">
            <h3 class="font-bold text-gray-800">Profil Toko</h3>
            <p class="text-xs text-gray-500 mt-0.5">Atur nama, alamat, dan logo toko untuk struk.</p>
          </div>
          <div class="p-4">${renderProfileForm()}</div>
        </div>
      </div>
      <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h3 class="font-bold text-gray-800">Inventori</h3>
            <p class="text-xs text-gray-500 mt-0.5">${inventory.length} barang ditampilkan</p>
          </div>
          <div class="relative w-full sm:w-64">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 [&>svg]:w-full [&>svg]:h-full">${icons.search}</span>
            <label class="sr-only" for="inventorySearch">Cari inventori</label>
            <input id="inventorySearch" class="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all" type="search" placeholder="Cari barang atau SKU" value="${escapeHtml(state.dashboardSearch)}" data-input="dashboard-search" />
          </div>
        </div>
        <div>${renderInventoryTable(inventory)}</div>
      </div>
    </section>
  `;
}

function metricCard(icon, label, value) {
  return `
    <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col gap-1 relative overflow-hidden group hover:border-primary-300 hover:shadow-md transition-all">
      <div class="w-6 h-6 text-primary-500 [&>svg]:w-full [&>svg]:h-full mb-2">${icon}</div>
      <span class="text-xs font-bold text-gray-500 uppercase tracking-wider z-10">${label}</span>
      <strong class="text-2xl font-extrabold text-gray-900 z-10">${value}</strong>
      <div class="absolute -right-4 -bottom-4 w-24 h-24 text-primary-50 opacity-50 group-hover:scale-110 transition-transform [&>svg]:w-full [&>svg]:h-full">${icon}</div>
    </div>
  `;
}

function renderSalesOverview() {
  return `
    <section class="bg-white border border-gray-200 rounded-xl shadow-sm mb-6 overflow-hidden">
      <div class="p-4 border-b border-gray-100 bg-gray-50/50">
        <h3 class="font-bold text-gray-800">Pencatatan Penjualan</h3>
        <p class="text-xs text-gray-500 mt-0.5">Ringkasan omzet berdasarkan transaksi yang sudah selesai.</p>
      </div>
      <div class="p-4">
        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          ${salesPeriods().map((period) => `
            <article class="border border-gray-100 rounded-xl p-4 flex flex-col gap-2 hover:border-primary-200 hover:shadow-sm transition-all bg-gray-50/30">
              <div class="flex flex-col">
                <span class="text-sm font-bold text-gray-800">${escapeHtml(period.label)}</span>
                <small class="text-xs text-gray-500">${escapeHtml(period.range)}</small>
              </div>
              <strong class="text-lg font-extrabold text-accent-600 my-1">${rupiah(period.summary.revenue)}</strong>
              <div class="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 w-fit px-2 py-0.5 rounded-md">
                <span class="w-3 h-3 [&>svg]:w-full [&>svg]:h-full">${icons.plus}</span>
                ${rupiah(period.summary.profit)}
              </div>
              <div class="flex items-center justify-between pt-3 border-t border-dashed border-gray-200 text-xs text-gray-500 mt-1">
                <span>${period.summary.transactions} trx</span>
                <span>${period.summary.items} brg</span>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderProductForm(product) {
  const selectedIcon = product?.image || "package";
  const inputClass = "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all bg-white";
  const labelClass = "block text-xs font-bold text-gray-600 mb-1.5";
  
  return `
    <form id="productForm" class="grid grid-cols-2 gap-4">
      <div class="col-span-2">
        <label for="productName" class="${labelClass}">Nama barang</label>
        <input id="productName" name="name" class="${inputClass}" required placeholder="Contoh: Beras Premium 5 kg" value="${escapeHtml(product?.name || "")}" />
      </div>
      <div>
        <label for="productSku" class="${labelClass}">SKU / kode</label>
        <input id="productSku" name="sku" class="${inputClass}" required placeholder="BR-5000" value="${escapeHtml(product?.sku || "")}" />
      </div>
      <div>
        <label for="productCategory" class="${labelClass}">Kategori</label>
        <select id="productCategory" name="category" class="${inputClass}" required>
          ${Array.from(new Set([
            "Barang", "Sembako & Bahan Pokok", "Kecantikan & Kebersihan", "Perlengkapan Rumah Tangga", "Bumbu Dapur", "Produk Anak-anak", "Obat-obatan", "Alat Tulis", "Makanan", "Minuman", "Pulsa", "Token Listrik", "Tagihan Listrik Bulanan", ...state.products.map((p) => p.category)
          ])).map((c) => `<option value="${escapeHtml(c)}" ${(product?.category || "Barang Umum") === c ? "selected" : ""}>${escapeHtml(c)}</option>`).join("")}
        </select>
      </div>
      <div>
        <label for="productCostPrice" class="${labelClass}">Harga pabrik/agen</label>
        <input id="productCostPrice" name="costPrice" class="${inputClass}" required type="text" inputmode="numeric" pattern="[0-9]*" placeholder="0" value="${product?.costPrice ?? product?.price ?? ""}" />
      </div>
      <div>
        <label for="productProfit" class="${labelClass}">Keuntungan</label>
        <input id="productProfit" name="profit" class="${inputClass}" required type="text" inputmode="numeric" pattern="[0-9]*" placeholder="0" value="${product?.profit ?? ""}" />
      </div>
      <div>
        <label for="productStock" class="${labelClass}">Stok awal</label>
        <input id="productStock" name="stock" class="${inputClass}" required type="text" inputmode="numeric" pattern="[0-9]*" placeholder="0" value="${product?.stock ?? ""}" />
      </div>
      <div>
        <label for="productMinStock" class="${labelClass}">Batas stok rendah</label>
        <input id="productMinStock" name="minStock" class="${inputClass}" type="text" inputmode="numeric" pattern="[0-9]*" placeholder="5" value="${product?.minStock ?? 5}" />
      </div>
      <div>
        <label for="productUnit" class="${labelClass}">Satuan</label>
        <select id="productUnit" name="unit" class="${inputClass}">
          ${["pcs", "kg", "gram", "liter", "ml", "botol", "pak", "box", "kardus", "renceng", "karung", "lusin", "ikat", "kaleng", "roll", "meter"].map((u) => `<option value="${u}" ${(product?.unit || "pcs") === u ? "selected" : ""}>${u}</option>`).join("")}
        </select>
      </div>
      <div>
        <label for="productImage" class="${labelClass}">Ikon</label>
        <select id="productImage" name="image" class="${inputClass}">
          ${[["package", "Barang"], ["box", "Sembako & Bahan Pokok"], ["bath", "Kecantikan & Kebersihan"], ["home", "Perlengkapan Rumah Tangga"], ["kitchen", "Bumbu Dapur"], ["baby", "Produk Anak-anak"], ["medical", "Obat-obatan"], ["pen", "Alat Tulis"], ["food", "Makanan"], ["drink", "Minuman"], ["phone", "Pulsa"], ["zap", "Token Listrik"], ["bill", "Tagihan Listrik Bulanan"]].map(([value, label]) => `<option value="${value}" ${selectedIcon === value ? "selected" : ""}>${label}</option>`).join("")}
        </select>
      </div>
      <div class="col-span-2">
        <label for="productColor" class="${labelClass}">Warna kartu</label>
        <input id="productColor" name="color" class="${inputClass} h-10 p-1 cursor-pointer" type="color" value="${escapeHtml(product?.color || "#166534")}" />
      </div>
      <div class="col-span-2">
        <label for="productPhoto" class="${labelClass}">Foto produk</label>
        <input id="productPhoto" name="photo" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 transition-all cursor-pointer" type="file" accept="image/*" />
      </div>
      ${product?.photo ? `
        <div class="col-span-2 flex items-center gap-4 p-3 border border-gray-200 rounded-xl bg-gray-50">
          <img src="${escapeHtml(product.photo)}" alt="Foto ${escapeHtml(product.name)}" class="w-16 h-16 object-cover rounded-lg shadow-sm border border-gray-200" />
          <div>
            <strong class="block text-sm text-gray-800 mb-1.5">Foto tersimpan</strong>
            <button class="flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors" type="button" data-remove-product-photo="${product.id}">
              <span class="w-3.5 h-3.5 [&>svg]:w-full [&>svg]:h-full">${icons.trash}</span><span>Hapus Foto</span>
            </button>
          </div>
        </div>
      ` : ""}
      <div class="col-span-2 flex gap-3 mt-2">
        <button class="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95" type="submit">
          <span class="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">${icons.save}</span><span>${product ? "Simpan Perubahan" : "Tambah Barang"}</span>
        </button>
        ${product ? `
          <button class="flex items-center justify-center px-4 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all active:scale-95" type="button" data-cancel-edit>Batal</button>
        ` : ""}
      </div>
    </form>
  `;
}

function renderStockForm() {
  const inputClass = "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all bg-white";
  const labelClass = "block text-xs font-bold text-gray-600 mb-1.5";
  
  return `
    <form id="stockForm" class="flex flex-col gap-4">
      <div>
        <label for="stockProduct" class="${labelClass}">Pilih barang</label>
        <select id="stockProduct" name="productId" class="${inputClass}" required>
          <option value="">Pilih barang</option>
          ${[...state.products].sort((a, b) => a.name.localeCompare(b.name)).map((product) => `
            <option value="${product.id}">${escapeHtml(product.name)} - stok ${product.stock}</option>
          `).join("")}
        </select>
      </div>
      <div>
        <label for="stockQuantity" class="${labelClass}">Jumlah stok masuk</label>
        <input id="stockQuantity" name="quantity" class="${inputClass}" required type="text" inputmode="numeric" pattern="[0-9]*" placeholder="Contoh: 12" />
      </div>
      <div>
        <label for="stockNote" class="${labelClass}">Catatan</label>
        <textarea id="stockNote" name="note" class="${inputClass} min-h-[80px] resize-y" placeholder="Contoh: Restock dari supplier"></textarea>
      </div>
      <button class="flex items-center justify-center gap-2 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 mt-2" type="submit">
        <span class="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">${icons.plus}</span><span>Tambah Stok</span>
      </button>
    </form>
  `;
}

function renderSettingsForm() {
  const inputClass = "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all bg-white";
  const labelClass = "block text-xs font-bold text-gray-600 mb-1.5";
  
  return `
    <form id="settingsForm" class="flex flex-col gap-4">
      <div>
        <label for="taxPercent" class="${labelClass}">PPN (%)</label>
        <input id="taxPercent" name="taxPercent" class="${inputClass}" type="text" inputmode="decimal" placeholder="Contoh: 11" value="${formatPercent(state.settings.taxPercent)}" />
      </div>
      <div>
        <label for="qrisImage" class="${labelClass}">Gambar QRIS</label>
        <input id="qrisImage" name="qrisImage" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 transition-all cursor-pointer" type="file" accept="image/*" />
      </div>
      ${state.settings.qrisImage ? `
        <div class="flex items-center gap-4 p-3 border border-gray-200 rounded-xl bg-gray-50">
          <img src="${escapeHtml(state.settings.qrisImage)}" alt="QRIS toko tersimpan" class="w-16 h-16 object-contain p-1 bg-white rounded-lg shadow-sm border border-gray-200" />
          <button class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors" type="button" data-remove-qris>
            <span class="w-3.5 h-3.5 [&>svg]:w-full [&>svg]:h-full">${icons.trash}</span><span>Hapus QRIS</span>
          </button>
        </div>
      ` : `
        <div class="py-6 px-4 text-center border border-dashed border-gray-200 rounded-xl bg-gray-50 text-sm text-gray-500">Belum ada gambar QRIS tersimpan.</div>
      `}
      <button class="flex items-center justify-center gap-2 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 mt-2" type="submit">
        <span class="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">${icons.save}</span><span>Simpan Pengaturan</span>
      </button>
    </form>
  `;
}

function renderProfileForm() {
  const inputClass = "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all bg-white";
  const labelClass = "block text-xs font-bold text-gray-600 mb-1.5";
  
  return `
    <form id="profileForm" class="flex flex-col gap-4">
      <div>
        <label for="storeName" class="${labelClass}">Nama Toko</label>
        <input id="storeName" name="storeName" class="${inputClass}" type="text" placeholder="Contoh: Toko Maju Jaya" value="${escapeHtml(state.settings.storeName || "")}" required />
      </div>
      <div>
        <label for="storeAddress" class="${labelClass}">Alamat Toko</label>
        <textarea id="storeAddress" name="storeAddress" class="${inputClass} min-h-[80px] resize-y" placeholder="Contoh: Jl. Merdeka No. 1">${escapeHtml(state.settings.storeAddress || "")}</textarea>
      </div>
      <div>
        <label for="storePhoto" class="${labelClass}">Logo / Foto Profil Toko</label>
        <input id="storePhoto" name="storePhoto" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 transition-all cursor-pointer" type="file" accept="image/*" />
      </div>
      ${state.settings.storePhoto ? `
        <div class="flex items-center gap-4 p-3 border border-gray-200 rounded-xl bg-gray-50">
          <img src="${escapeHtml(state.settings.storePhoto)}" alt="Logo Toko" class="w-16 h-16 object-contain rounded-lg shadow-sm border border-gray-200 bg-white" />
          <div>
            <strong class="block text-sm text-gray-800 mb-1.5">Logo tersimpan</strong>
            <button class="flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors" type="button" data-remove-store-photo>
              <span class="w-3.5 h-3.5 [&>svg]:w-full [&>svg]:h-full">${icons.trash}</span><span>Hapus Logo</span>
            </button>
          </div>
        </div>
      ` : ""}
      <button class="flex items-center justify-center gap-2 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 mt-2" type="submit">
        <span class="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">${icons.save}</span><span>Simpan Profil</span>
      </button>
    </form>
  `;
}

function renderInventoryTable(products) {
  if (!products.length) return `<div class="py-12 px-6 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-gray-500 m-4">Belum ada barang yang cocok.</div>`;
  return `
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse whitespace-nowrap">
        <thead>
          <tr>
            <th class="px-5 py-4 bg-gray-50/80 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">Barang</th>
            <th class="px-5 py-4 bg-gray-50/80 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">Kategori</th>
            <th class="px-5 py-4 bg-gray-50/80 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">Harga</th>
            <th class="px-5 py-4 bg-gray-50/80 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">Stok</th>
            <th class="px-5 py-4 bg-gray-50/80 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-5 py-4 bg-gray-50/80 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          ${products.map((product) => {
            const isOut = product.stock <= 0;
            const isLow = product.stock <= product.minStock;
            const status = isOut ? "Habis" : isLow ? "Stok rendah" : "Aman";
            const badgeClass = isOut ? "bg-red-50 text-red-600" : isLow ? "bg-amber-50 text-amber-600" : "bg-green-50 text-green-600";
            
            return `
              <tr class="hover:bg-gray-50/50 transition-colors group">
                <td class="px-5 py-3">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 overflow-hidden text-white ${product.photo ? "border border-gray-200" : ""}" style="${product.photo ? "" : `background-color: ${escapeHtml(product.color || "#166534")}`}">
                      ${product.photo ? `<img src="${escapeHtml(product.photo)}" alt="${escapeHtml(product.name)}" class="w-full h-full object-cover" />` : `<div class="w-5 h-5 [&>svg]:w-full [&>svg]:h-full">${productIcon(product)}</div>`}
                    </div>
                    <div>
                      <strong class="text-sm text-gray-800">${escapeHtml(product.name)}</strong><br />
                      <span class="text-xs text-gray-500">${escapeHtml(product.sku)}</span>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-3 text-sm text-gray-600">${escapeHtml(product.category)}</td>
                <td class="px-5 py-3 text-sm font-bold text-gray-800">${rupiah(product.price)}</td>
                <td class="px-5 py-3 text-sm text-gray-600">${product.stock} <span class="text-xs">${escapeHtml(product.unit)}</span></td>
                <td class="px-5 py-3">
                  <span class="text-[10px] font-bold px-2.5 py-1 rounded-md ${badgeClass}">${status}</span>
                </td>
                <td class="px-5 py-3">
                  <div class="flex items-center justify-end gap-2">
                    <button class="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50 shadow-sm active:ring-4 active:ring-gray-200 transition-all outline-none" type="button" data-quick-stock="${product.id}">
                      <span class="w-3.5 h-3.5 [&>svg]:w-full [&>svg]:h-full">${icons.plus}</span><span>Stok</span>
                    </button>
                    <button class="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-primary-600 shadow-sm active:ring-4 active:ring-primary-500/30 transition-all outline-none" type="button" data-edit-product="${product.id}" title="Ubah barang">
                      <span class="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">${icons.edit}</span><span class="sr-only">Ubah</span>
                    </button>
                    <button class="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 shadow-sm active:ring-4 active:ring-red-500/30 transition-all outline-none" type="button" data-delete-product="${product.id}" title="Hapus barang">
                      <span class="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">${icons.trash}</span><span class="sr-only">Hapus</span>
                    </button>
                  </div>
                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderHistory() {
  const transactions = filteredHistoryTransactions();
  const hasTransactions = state.transactions.length > 0;
  return `
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">Riwayat Transaksi</h2>
        <p class="text-sm text-gray-500 mt-1">Semua transaksi yang selesai akan tersimpan di browser ini.</p>
      </div>
      <div class="flex gap-2">
        <button class="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-100 text-green-700 rounded-lg hover:bg-green-500 hover:text-white transition-all font-semibold active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed" type="button" data-export-csv ${state.transactions.length ? "" : "disabled"}>
          <span class="w-5 h-5 [&>svg]:w-full [&>svg]:h-full">${icons.download}</span><span class="hidden sm:inline">Export CSV</span>
        </button>
        <button class="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-100 text-red-600 rounded-lg hover:bg-red-500 hover:text-white transition-all font-semibold active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed" type="button" data-clear-history ${state.transactions.length ? "" : "disabled"}>
          <span class="w-5 h-5 [&>svg]:w-full [&>svg]:h-full">${icons.trash}</span><span class="hidden sm:inline">Hapus Riwayat</span>
        </button>
      </div>
    </div>
    ${hasTransactions ? `
      <div class="mb-6">
        <div class="relative w-full md:w-96">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 [&>svg]:w-full [&>svg]:h-full">${icons.search}</span>
          <label class="sr-only" for="historySearch">Cari transaksi</label>
          <input id="historySearch" class="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all bg-white" type="search" placeholder="Trace kode, pelanggan, metode (kasbon), atau barang" value="${escapeHtml(state.historySearch)}" data-input="history-search" />
        </div>
      </div>
    ` : ""}
    ${transactions.length ? `
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        ${transactions.map((transaction) => `
          <article class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary-200 transition-all flex flex-col sm:flex-row justify-between gap-4 group">
            <div class="flex-1 min-w-0">
              <h3 class="font-bold text-gray-800 text-lg flex items-center gap-2">
                ${escapeHtml(transaction.code)}
                <span class="text-[10px] px-2 py-0.5 rounded-md font-bold uppercase border ${transaction.paymentMethod === 'Kasbon' ? (transaction.paid < transaction.total ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-600 border-green-200') : transaction.paymentMethod === 'QRIS' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}">${escapeHtml(transaction.paymentMethod)} ${transaction.paymentMethod === 'Kasbon' ? (transaction.paid < transaction.total ? '(Belum Lunas)' : `(Lunas${transaction.kasbonPaidMethod ? ' - ' + transaction.kasbonPaidMethod : ''})`) : ''}</span>
              </h3>
              <p class="text-xs text-gray-500 mt-1">${dateLabel(transaction.date)} - ${transaction.items.length} jenis barang</p>
              <div class="mt-3 p-3 bg-gray-50 border border-gray-100 rounded-lg text-sm">
                <p class="text-gray-600 mb-1">Pelanggan: <strong class="text-gray-800">${escapeHtml(transaction.customerName || "Umum")}</strong> ${transaction.customerPhone ? `<span class="text-xs text-gray-500">(${escapeHtml(transaction.customerPhone)})</span>` : ""}</p>
                <p class="text-xs text-gray-500 truncate leading-relaxed" title="${escapeHtml(transaction.items.map((item) => `${item.name} x ${item.qty}`).join(", "))}">${escapeHtml(transaction.items.map((item) => `${item.name} x ${item.qty}`).join(", "))}</p>
              </div>
            </div>
            <div class="flex flex-col sm:items-end justify-between gap-4 shrink-0">
              <div class="text-left sm:text-right">
                <div class="text-xl font-extrabold text-accent-600">${rupiah(transaction.total)}</div>
                <div class="text-xs text-gray-500 mt-0.5 font-medium">Kembali ${rupiah(transaction.change)}</div>
              </div>
              <div class="flex flex-wrap sm:flex-col gap-2 w-full sm:w-auto">
                <div class="flex gap-2 w-full">
                  <button class="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50 shadow-sm active:scale-95 transition-all" type="button" data-print-receipt="${escapeHtml(transaction.id)}">
                    <span class="w-3.5 h-3.5 [&>svg]:w-full [&>svg]:h-full">${icons.receipt}</span><span class="sm:hidden md:inline">Cetak Struk</span>
                  </button>
                  ${transaction.customerPhone ? `
                    <button class="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-100 text-green-700 text-xs font-bold rounded-lg hover:bg-green-500 hover:text-white shadow-sm active:scale-95 transition-all" type="button" data-wa-receipt="${escapeHtml(transaction.id)}">
                      <span class="w-3.5 h-3.5 [&>svg]:w-full [&>svg]:h-full">${icons.send}</span><span class="sm:hidden md:inline">Kirim WA</span>
                    </button>
                  ` : ""}
                  ${transaction.paymentMethod === 'Kasbon' && transaction.paid < transaction.total ? `
                    <button class="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-accent-50 border border-accent-100 text-accent-700 text-xs font-bold rounded-lg hover:bg-accent-500 hover:text-white shadow-sm active:scale-95 transition-all" type="button" data-pay-kasbon="${escapeHtml(transaction.id)}">
                      <span class="w-3.5 h-3.5 [&>svg]:w-full [&>svg]:h-full">${icons.money}</span><span class="sm:hidden md:inline">Lunasi</span>
                    </button>
                  ` : ""}
                </div>
                <button class="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-red-200 text-red-600 text-xs font-bold rounded-lg hover:bg-red-50 shadow-sm active:scale-95 transition-all" type="button" data-cancel-transaction="${escapeHtml(transaction.id)}">
                  <span class="w-3.5 h-3.5 [&>svg]:w-full [&>svg]:h-full">${icons.trash}</span><span>Batal Order</span>
                </button>
              </div>
            </div>
          </article>
        `).join("")}
      </section>
    ` : `<div class="py-12 px-6 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-gray-500 text-sm">${hasTransactions ? "Transaksi tidak ditemukan. Coba cari kode transaksi, nama pelanggan, atau nama barang lain." : "Belum ada transaksi. Selesaikan transaksi pertama dari halaman Kasir."}</div>`}
  `;
}

function bindEvents() {
  const authForm = document.getElementById('authForm');
  if (authForm) authForm.addEventListener('submit', handleAuth);
  
  document.querySelectorAll("[data-reset-pw]").forEach((button) => {
    button.addEventListener("click", () => {
      state.adminModal = { userId: button.dataset.resetPw, username: button.dataset.resetUsername };
      render();
    });
  });

  const closeAdminModal = document.querySelector("[data-close-admin-modal]");
  if (closeAdminModal) {
    closeAdminModal.addEventListener("click", () => {
      state.adminModal = null;
      render();
    });
  }

  const adminResetForm = document.getElementById("adminResetForm");
  if (adminResetForm) {
    adminResetForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const newPassword = new FormData(e.target).get("newPassword");
      try {
        const res = await fetch(`/api/admin/users/${state.adminModal.userId}/reset-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${state.token}` },
          body: JSON.stringify({ newPassword })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Gagal mengubah password.");
        showToast("Password pengguna berhasil diubah!");
        state.adminModal = null;
        render();
      } catch(err) {
        showToast(err.message, "error");
      }
    });
  }

  const switchAuth = document.querySelector('[data-switch-auth]');
  if (switchAuth) {
    switchAuth.addEventListener('click', () => {
      state.authMode = state.authMode === 'login' ? 'register' : 'login';
      render();
    });
  }

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeView = button.dataset.view;
      state.latestReceipt = state.activeView === "cashier" ? state.latestReceipt : null;
      render();
    });
  });

  document.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedCategory = button.dataset.category;
      render();
    });
  });

  document.querySelectorAll("[data-add-product]").forEach((button) => {
    button.addEventListener("click", () => addToCart(button.dataset.addProduct));
  });

  document.querySelectorAll("[data-cart-action]").forEach((button) => {
    button.addEventListener("click", () => updateCart(button.dataset.cartId, button.dataset.cartAction));
  });

  const cashierSearch = document.querySelector('[data-input="cashier-search"]');
  if (cashierSearch) {
    cashierSearch.addEventListener("input", (event) => {
      state.search = event.target.value;
      renderAndFocus("cashierSearch", state.search);
    });
  }

  const dashboardSearch = document.querySelector('[data-input="dashboard-search"]');
  if (dashboardSearch) {
    dashboardSearch.addEventListener("input", (event) => {
      state.dashboardSearch = event.target.value;
      renderAndFocus("inventorySearch", state.dashboardSearch);
    });
  }

  const historySearch = document.querySelector('[data-input="history-search"]');
  if (historySearch) {
    historySearch.addEventListener("input", (event) => {
      state.historySearch = event.target.value;
      renderAndFocus("historySearch", state.historySearch);
    });
  }

  const customerName = document.querySelector('[data-input="customer-name"]');
  if (customerName) {
    customerName.addEventListener("input", (event) => {
      state.customerName = event.target.value;
      renderAndFocus("customerName", state.customerName);
    });
  }

    const customerPhone = document.querySelector('[data-input="customer-phone"]');
    if (customerPhone) {
      customerPhone.addEventListener("input", (event) => {
        state.customerPhone = event.target.value;
        renderAndFocus("customerPhone", state.customerPhone);
      });
    }

  const paymentInput = document.querySelector('[data-input="payment"]');
  if (paymentInput) {
    paymentInput.addEventListener("input", (event) => {
      state.paymentReceived = numberOnly(event.target.value);
      renderAndFocus("paidInput", event.target.value);
    });
  }

  const discountInput = document.querySelector('[data-input="discount"]');
  if (discountInput) {
    discountInput.addEventListener("input", (event) => {
      state.discount = numberOnly(event.target.value);
      renderAndFocus("discountInput", event.target.value);
    });
  }

  const paymentMethod = document.querySelector('[data-input="payment-method"]');
  if (paymentMethod) {
    paymentMethod.addEventListener("change", (event) => {
      state.paymentMethod = event.target.value;
      if (state.paymentMethod === "Kasbon") state.paymentReceived = 0;
      render();
    });
  }

  document.querySelectorAll('[data-input="order-type"]').forEach((radio) => {
    radio.addEventListener("change", (event) => {
      state.orderType = event.target.value;
      render();
    });
  });

  const clearCart = document.querySelector("[data-clear-cart]");
  if (clearCart) {
    clearCart.addEventListener("click", () => {
      state.cart = [];
      state.customerName = "";
      state.customerPhone = "";
      state.orderType = "Dine In";
      state.paymentReceived = 0;
      state.discount = 0;
      render();
    });
  }

  const fillExact = document.querySelector("[data-fill-exact]");
  if (fillExact) {
    fillExact.addEventListener("click", () => {
      state.paymentReceived = cartTotals().total;
      render();
    });
  }

  const completeSale = document.querySelector("[data-complete-sale]");
  if (completeSale) {
    completeSale.addEventListener("click", finishSale);
  }

  document.querySelectorAll("[data-print-receipt]").forEach((button) => {
    button.addEventListener("click", () => {
      const transaction = findTransaction(button.dataset.printReceipt);
      printTransactionReceipt(transaction);
    });
  });

    document.querySelectorAll("[data-wa-receipt]").forEach((button) => {
      button.addEventListener("click", () => {
        const transaction = findTransaction(button.dataset.waReceipt);
        sendWhatsAppReceipt(transaction);
      });
    });

  const productForm = document.getElementById("productForm");
  if (productForm) {
    productForm.addEventListener("submit", saveProduct);
  }

  const stockForm = document.getElementById("stockForm");
  if (stockForm) {
    stockForm.addEventListener("submit", addStock);
  }

  const settingsForm = document.getElementById("settingsForm");
  if (settingsForm) {
    settingsForm.addEventListener("submit", saveSettings);
  }

  const removeQris = document.querySelector("[data-remove-qris]");
  if (removeQris) {
    removeQris.addEventListener("click", () => {
      state.settings.qrisImage = "";
      saveAll();
      showToast("Gambar QRIS dihapus.");
    });
  }

  const profileForm = document.getElementById("profileForm");
  if (profileForm) {
    profileForm.addEventListener("submit", saveProfile);
  }

  const removeStorePhoto = document.querySelector("[data-remove-store-photo]");
  if (removeStorePhoto) {
    removeStorePhoto.addEventListener("click", () => {
      state.settings.storePhoto = "";
      saveAll();
      showToast("Logo toko dihapus.");
    });
  }

  const removeProductPhoto = document.querySelector("[data-remove-product-photo]");
  if (removeProductPhoto) {
    removeProductPhoto.addEventListener("click", () => {
      const product = state.products.find((item) => item.id === removeProductPhoto.dataset.removeProductPhoto);
      if (!product) return;
      product.photo = "";
      saveAll();
      showToast("Foto produk dihapus.");
    });
  }

  const cancelEdit = document.querySelector("[data-cancel-edit]");
  if (cancelEdit) {
    cancelEdit.addEventListener("click", () => {
      state.editingId = null;
      render();
    });
  }

  document.querySelectorAll("[data-edit-product]").forEach((button) => {
    button.addEventListener("click", () => {
      state.editingId = button.dataset.editProduct;
      render();
      document.getElementById("productName")?.focus();
    });
  });

  document.querySelectorAll("[data-delete-product]").forEach((button) => {
    button.addEventListener("click", () => deleteProduct(button.dataset.deleteProduct));
  });

  document.querySelectorAll("[data-quick-stock]").forEach((button) => {
    button.addEventListener("click", () => quickStock(button.dataset.quickStock));
  });

  const clearHistory = document.querySelector("[data-clear-history]");
  if (clearHistory) {
    clearHistory.addEventListener("click", () => {
      if (confirm("Hapus semua riwayat transaksi?")) {
        state.transactions = [];
        saveAll();
        showToast("Riwayat transaksi dihapus.");
      }
    });
  }

  const exportCsv = document.querySelector("[data-export-csv]");
  if (exportCsv) {
    exportCsv.addEventListener("click", exportToCSV);
  }

  document.querySelectorAll("[data-cancel-transaction]").forEach((button) => {
    button.addEventListener("click", () => cancelTransaction(button.dataset.cancelTransaction));
  });

  document.querySelectorAll("[data-pay-kasbon]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.payKasbon;
      const transaction = state.transactions.find((t) => t.id === id);
      if (transaction) {
        state.kasbonPayModal = transaction;
        state.kasbonPayModal._selectedMethod = "Tunai";
        render();
      }
    });
  });

  const closeKasbonModal = document.querySelector("[data-close-kasbon-modal]");
  if (closeKasbonModal) {
    closeKasbonModal.addEventListener("click", () => {
      state.kasbonPayModal = null;
      render();
    });
  }

  const kasbonOverlay = document.getElementById("kasbonPayOverlay");
  if (kasbonOverlay) {
    kasbonOverlay.addEventListener("click", (e) => {
      if (e.target === kasbonOverlay) {
        state.kasbonPayModal = null;
        render();
      }
    });
  }

  document.querySelectorAll("[data-kasbon-method]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (state.kasbonPayModal) {
        state.kasbonPayModal._selectedMethod = btn.dataset.kasbonMethod;
        // Update button styles
        document.querySelectorAll("[data-kasbon-method]").forEach((b) => {
          const isSelected = b.dataset.kasbonMethod === state.kasbonPayModal._selectedMethod;
          b.className = b.className
            .replace(/border-primary-500|border-gray-200/g, isSelected ? "border-primary-500" : "border-gray-200")
            .replace(/bg-primary-50|bg-white/g, isSelected ? "bg-primary-50" : "bg-white")
            .replace(/text-primary-700|text-gray-600/g, isSelected ? "text-primary-700" : "text-gray-600")
            .replace(/shadow-sm/g, isSelected ? "shadow-sm" : "");
          if (isSelected && !b.className.includes("shadow-sm")) b.className += " shadow-sm";
        });
        // Show/hide QRIS preview
        const qrisPreview = document.getElementById("kasbonQrisPreview");
        if (qrisPreview) {
          qrisPreview.classList.toggle("hidden", state.kasbonPayModal._selectedMethod !== "QRIS");
        }
      }
    });
  });

  const confirmKasbonPay = document.querySelector("[data-confirm-kasbon-pay]");
  if (confirmKasbonPay) {
    confirmKasbonPay.addEventListener("click", () => {
      const trx = state.kasbonPayModal;
      if (!trx) return;
      const transaction = state.transactions.find((t) => t.id === trx.id);
      if (transaction) {
        transaction.paid = transaction.total;
        transaction.kasbonPaidMethod = trx._selectedMethod;
        saveAll();
        state.kasbonPayModal = null;
        render();
        showToast(`Kasbon berhasil dilunasi via ${trx._selectedMethod}!`, "success");
      }
    });
  }
}

function renderAndFocus(id, value) {
  render();
  requestAnimationFrame(() => {
    const input = document.getElementById(id);
    if (!input) return;
    input.focus();
    const cursor = String(value ?? "").length;
    if (input.setSelectionRange) input.setSelectionRange(cursor, cursor);
  });
}

function findTransaction(id) {
  if (state.latestReceipt?.id === id) return state.latestReceipt;
  return state.transactions.find((transaction) => transaction.id === id);
}

function printTransactionReceipt(transaction) {
  if (!transaction) {
    showToast("Transaksi untuk dicetak tidak ditemukan.", "error");
    return;
  }

  state.printReceipt = transaction;
  render();
  requestAnimationFrame(() => {
    const cleanup = () => {
      state.printReceipt = null;
      render();
    };
    window.addEventListener("afterprint", cleanup, { once: true });
    window.print();
  });
}

function sendWhatsAppReceipt(transaction) {
  if (!transaction || !transaction.customerPhone) {
    showToast("Nomor WhatsApp tidak ditemukan.", "error");
    return;
  }

  let text = `*STRUK PEMBELIAN*\n`;
  text += `${state.settings.storeName || "Kasir Toko"}\n`;
  text += `Kode: ${transaction.code}\n`;
  text += `Tanggal: ${dateLabel(transaction.date)}\n`;
  text += `Pelanggan: ${transaction.customerName || "Umum"}\n`;
  text += `Tipe Pesanan: ${transaction.orderType || "Dine In"}\n\n`;

  transaction.items.forEach((item) => {
    text += `${item.name} x ${item.qty}\n`;
    text += `${rupiah(item.price * item.qty)}\n`;
  });

  text += `\nSubtotal: ${rupiah(transaction.subtotal)}\n`;
  if (transaction.discount > 0) text += `Diskon: ${rupiah(transaction.discount)}\n`;
  if (transaction.tax > 0) text += `PPN: ${rupiah(transaction.tax)}\n`;
  text += `*Total: ${rupiah(transaction.total)}*\n`;
  text += `Bayar (${transaction.paymentMethod}${transaction.kasbonPaidMethod ? ' - Lunas via ' + transaction.kasbonPaidMethod : ''}): ${rupiah(transaction.paid)}\n`;
  text += `Kembali: ${rupiah(transaction.change)}\n\n`;
  text += `Terima kasih atas kunjungan Anda!`;
  if (state.settings.storeAddress) {
    text += `\n\n${state.settings.storeAddress}`;
  }

  let phone = transaction.customerPhone.replace(/\D/g, "");
  // Mengubah prefix "0" menjadi "62" yang kompatibel dengan standar API WhatsApp
  if (phone.startsWith("0")) phone = "62" + phone.substring(1);
  else if (!phone.startsWith("62")) phone = "62" + phone;

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank");
}

function addToCart(productId) {
  const product = state.products.find((item) => item.id === productId);
  if (!product || product.stock <= 0) {
    showToast("Stok barang tidak tersedia.", "error");
    return;
  }
  const existing = state.cart.find((item) => item.id === productId);
  if (existing) {
    if (existing.qty >= product.stock) {
      showToast("Jumlah di keranjang sudah sama dengan stok tersedia.", "warning");
      return;
    }
    existing.qty += 1;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      sku: product.sku,
      price: product.price,
          costPrice: product.costPrice || product.price,
          profit: product.profit || 0,
      qty: 1
    });
  }
  state.latestReceipt = null;
  render();
}

function updateCart(productId, action) {
  const item = state.cart.find((cartItem) => cartItem.id === productId);
  const product = state.products.find((productItem) => productItem.id === productId);
  if (!item) return;

  if (action === "increase") {
    if (product && item.qty >= product.stock) {
      showToast("Stok tidak cukup untuk menambah jumlah.", "warning");
      return;
    }
    item.qty += 1;
  }

  if (action === "decrease") {
    item.qty -= 1;
  }

  if (action === "remove" || item.qty <= 0) {
    state.cart = state.cart.filter((cartItem) => cartItem.id !== productId);
  }

  render();
}

function finishSale() {
  const totals = cartTotals();
  if (!state.cart.length) return;
  
  if (state.paymentMethod !== "Kasbon" && totals.paid < totals.total) {
    showToast("Uang diterima masih kurang.", "error");
    return;
  }

  const hasStockIssue = state.cart.some((cartItem) => {
    const product = state.products.find((item) => item.id === cartItem.id);
    return !product || product.stock < cartItem.qty;
  });
  if (hasStockIssue) {
    showToast("Ada barang dengan stok tidak cukup.", "error");
    return;
  }

  state.cart.forEach((cartItem) => {
    const product = state.products.find((item) => item.id === cartItem.id);
    product.stock -= cartItem.qty;
  });

  const transaction = {
    id: uid("trx"),
    code: `TRX-${new Date().toISOString().replace(/\D/g, "").slice(0, 14)}`,
    date: new Date().toISOString(),
    customerName: state.customerName.trim() || "Umum",
    customerPhone: state.customerPhone.trim(),
    orderType: state.orderType,
    items: state.cart.map((item) => ({ ...item })),
    subtotal: totals.subtotal,
    discount: totals.discount,
    taxPercent: totals.taxPercent,
    tax: totals.tax,
    total: totals.total,
    paid: totals.paid,
    change: totals.change,
    paymentMethod: state.paymentMethod
  };

  state.transactions.unshift(transaction);
  state.latestReceipt = transaction;
  state.cart = [];
  state.customerName = "";
  state.customerPhone = "";
  state.paymentReceived = 0;
  state.discount = 0;
  saveAll();
  showToast("Transaksi selesai dan stok otomatis berkurang.");
}

async function saveSettings(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const taxPercent = numberOnly(formData.get("taxPercent"));
  const fileInput = document.getElementById("qrisImage");
  const file = fileInput?.files?.[0];

  if (file && file.size > 2 * 1024 * 1024) {
    showToast("Ukuran gambar QRIS maksimal 2 MB.", "error");
    return;
  }

  state.settings.taxPercent = taxPercent;

  if (file) {
    try {
      state.settings.qrisImage = await readFileAsDataUrl(file);
    } catch (error) {
      showToast("Gagal membaca gambar QRIS.", "error");
      return;
    }
  }

  saveAll();
  showToast("Pengaturan pembayaran disimpan.");
}

async function saveProfile(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const storeName = formData.get("storeName").trim();
  const storeAddress = formData.get("storeAddress").trim();
  const fileInput = document.getElementById("storePhoto");
  const file = fileInput?.files?.[0];

  if (file && file.size > 2 * 1024 * 1024) {
    showToast("Ukuran logo maksimal 2 MB.", "error");
    return;
  }

  state.settings.storeName = storeName || "Kasir Toko";
  state.settings.storeAddress = storeAddress;

  if (file) {
    try {
      state.settings.storePhoto = await readFileAsDataUrl(file);
    } catch (error) {
      showToast("Gagal membaca logo toko.", "error");
      return;
    }
  }

  saveAll();
  showToast("Profil toko disimpan.");
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function saveProduct(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const photoInput = document.getElementById("productPhoto");
  const photoFile = photoInput?.files?.[0];
      const costPrice = numberOnly(formData.get("costPrice"));
      const profit = numberOnly(formData.get("profit"));
      const price = costPrice + profit;
  const productData = {
    name: formData.get("name").trim(),
    sku: formData.get("sku").trim(),
    category: formData.get("category").trim(),
        costPrice: costPrice,
        profit: profit,
        price: price,
    stock: numberOnly(formData.get("stock")),
    minStock: numberOnly(formData.get("minStock")),
    unit: formData.get("unit").trim(),
    image: formData.get("image"),
    color: formData.get("color") || "#166534"
  };

  if (!productData.name || !productData.sku || !productData.category || !productData.unit) {
    showToast("Lengkapi data barang terlebih dahulu.", "error");
    return;
  }

  const skuExists = state.products.some((product) => product.sku.toLowerCase() === productData.sku.toLowerCase() && product.id !== state.editingId);
  if (skuExists) {
    showToast("SKU sudah dipakai barang lain.", "error");
    return;
  }

  if (photoFile && !photoFile.type.startsWith("image/")) {
    showToast("File foto produk harus berupa gambar.", "error");
    return;
  }

  if (photoFile && photoFile.size > 2 * 1024 * 1024) {
    showToast("Ukuran foto produk maksimal 2 MB.", "error");
    return;
  }

  let uploadedPhoto = "";
  if (photoFile) {
    try {
      uploadedPhoto = await readFileAsDataUrl(photoFile);
    } catch (error) {
      showToast("Gagal membaca foto produk.", "error");
      return;
    }
  }

  if (state.editingId) {
    const index = state.products.findIndex((product) => product.id === state.editingId);
    if (index >= 0) {
      state.products[index] = {
        ...state.products[index],
        ...productData,
        photo: uploadedPhoto || state.products[index].photo || ""
      };
          state.cart = state.cart.map((item) => item.id === state.editingId ? { ...item, name: productData.name, sku: productData.sku, price: productData.price, costPrice: productData.costPrice, profit: productData.profit } : item);
      state.editingId = null;
      saveAll();
      showToast("Data barang diperbarui.");
      return;
    }
  }

  state.products.push({
    id: uid("prd"),
    ...productData,
    photo: uploadedPhoto
  });
  saveAll();
  showToast("Barang baru ditambahkan.");
}

function addStock(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const productId = formData.get("productId");
  const quantity = numberOnly(formData.get("quantity"));
  const note = String(formData.get("note") || "").trim();
  const product = state.products.find((item) => item.id === productId);
  if (!product || quantity <= 0) {
    showToast("Pilih barang dan isi jumlah stok masuk.", "error");
    return;
  }
  product.stock += quantity;
  state.movements.unshift({
    id: uid("stk"),
    date: new Date().toISOString(),
    productId,
    productName: product.name,
    quantity,
    note
  });
  saveAll();
  showToast(`Stok ${product.name} bertambah ${quantity} ${product.unit}.`);
}

function quickStock(productId) {
  const product = state.products.find((item) => item.id === productId);
  if (!product) return;
  const amount = Number(prompt(`Tambah stok untuk ${product.name}`, "1"));
  if (!Number.isFinite(amount) || amount <= 0) return;
  product.stock += amount;
  state.movements.unshift({
    id: uid("stk"),
    date: new Date().toISOString(),
    productId,
    productName: product.name,
    quantity: amount,
    note: "Tambah cepat dari tabel inventori"
  });
  saveAll();
  showToast(`Stok ${product.name} bertambah ${amount} ${product.unit}.`);
}

function deleteProduct(productId) {
  const product = state.products.find((item) => item.id === productId);
  if (!product) return;
  const inCart = state.cart.some((item) => item.id === productId);
  if (inCart) {
    showToast("Barang masih ada di keranjang. Hapus dari keranjang dulu.", "error");
    return;
  }
  if (confirm(`Hapus ${product.name} dari inventori?`)) {
    state.products = state.products.filter((item) => item.id !== productId);
    if (state.editingId === productId) state.editingId = null;
    saveAll();
    showToast("Barang dihapus dari inventori.");
  }
}

function cancelTransaction(transactionId) {
  if (!confirm("Batalkan pesanan ini? Stok barang akan otomatis dikembalikan ke inventori.")) return;

  const index = state.transactions.findIndex((t) => t.id === transactionId);
  if (index === -1) return;

  const transaction = state.transactions[index];

  transaction.items.forEach((item) => {
    const product = state.products.find((p) => p.id === item.id);
    if (product) {
      product.stock += item.qty;
    }
  });

  state.transactions.splice(index, 1);
  if (state.latestReceipt?.id === transactionId) {
    state.latestReceipt = null;
  }

  saveAll();
  showToast("Pesanan dibatalkan. Stok berhasil dikembalikan.");
}

function showToast(message, type = "") {
  state.toast = { message, type };
  render();
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    state.toast = null;
    render();
  }, 2600);
}

function exportToCSV() {
  if (!state.transactions.length) {
    showToast("Tidak ada data untuk diekspor.", "warning");
    return;
  }

  const headers = ["Kode Transaksi", "Tanggal", "Pelanggan", "Tipe Pesanan", "Item", "Subtotal", "Diskon", "PPN", "Total", "Metode Pembayaran"];
  
  const rows = state.transactions.map(t => {
    const date = new Date(t.date).toLocaleString('id-ID');
    const items = t.items.map(i => `${i.name} (${i.qty})`).join("; ");
    return [
      t.code,
      date,
      t.customerName || "Umum",
      t.orderType || "Dine In",
      items,
      t.subtotal,
      t.discount,
      t.tax,
      t.total,
      t.paymentMethod === "Kasbon" ? (t.paid < t.total ? "Kasbon (Belum Lunas)" : "Kasbon (Sudah Lunas)") : t.paymentMethod
    ].map(value => `"${String(value).replace(/"/g, '""')}"`).join(",");
  });

  const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `Laporan_Penjualan_${new Date().toISOString().slice(0, 10)}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast("Laporan berhasil diunduh!");
}

initApp();
