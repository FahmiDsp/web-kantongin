# 🛒 Kantongin — Kasir Niaga Toko Klontong dan Lainnya

**Kantongin** adalah solusi aplikasi kasir digital *all-in-one* berbasis web (Full-Stack) yang dirancang khusus untuk mempermudah pencatatan transaksi, manajemen stok, dan pemantauan keuangan bagi warung, toko kelontong, dan UMKM.

![Versi](https://img.shields.io/badge/version-2.0.0-blue)
![Status](https://img.shields.io/badge/status-Aktif-success)
![Lisensi](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Fitur Unggulan

| Fitur | Keterangan |
|-------|------------|
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
| ❌ **Pembatalan Pesanan** | Batalkan transaksi dan kembalikan stok otomatis ke inventori |
| 💳 **Pelunasan Kasbon** | Lunasi kasbon pelanggan dengan metode pembayaran Tunai atau QRIS |

---

## 🚀 Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan arsitektur **Full-Stack JavaScript** modern dengan React sebagai UI layer.

### Frontend (Antarmuka)
- **React 18** — Library UI berbasis komponen dengan hooks (`useState`, `useEffect`)
- **Vite** — Build tool & dev server dengan HMR (Hot Module Replacement) super cepat
- **Tailwind CSS 3** — Utility-first CSS framework untuk styling cepat & responsif
- **DaisyUI v5** — Tailwind CSS component library untuk mempercantik antarmuka secara instan dan efisien
- **Lucide React** — Icon library modern & ringan sebagai pengganti emoji/SVG manual
- **Google Fonts (Plus Jakarta Sans)** — Tipografi modern dan bersih

### Backend (Server)
- **Node.js** — Lingkungan *runtime* JavaScript
- **Express.js v5** — *Routing* REST API
- **JSON Web Token (JWT)** — Autentikasi sesi yang aman
- **Nodemailer** — Pengiriman email OTP otomatis via SMTP Gmail
- **MongoDB Atlas** — Cloud database NoSQL untuk skalabilitas & Serverless

### Build & Tooling
- **PostCSS + Autoprefixer** — CSS post-processing
- **@vitejs/plugin-react** — Integrasi React dengan Vite (JSX transform & Fast Refresh)
- **ESLint 9** — Linter kode statis untuk mendeteksi error dan menegakkan standar penulisan kode JavaScript/React
- **Prettier 3** — Formatter kode otomatis untuk menjaga kerapian, spasi, dan kebersihan visual kode program

### Hosting
- **Vercel** — Deploy otomatis dari GitHub dengan Serverless Functions

---

## 📐 Aturan Arsitektur & Prinsip Desain

Proyek **Kantongin** menerapkan standar arsitektur dan prinsip rekayasa perangkat lunak modern untuk menjaga agar basis kode tetap rapi, mudah dibaca, aman, dan mudah diperluas (*scalable*):

### 1. FBA (Feature-Based Architecture)
Basis kode diatur secara logis berdasarkan **Fitur Bisnis** utama, bukan sekadar tipe berkas teknis. Pada bagian frontend React, komponen dibagi menjadi modul mandiri di bawah `src/kasir/components/`:
*   `Auth.jsx` — Mengelola seluruh siklus autentikasi (Login, Register, OTP).
*   `Admin.jsx` — Halaman khusus Super Admin untuk pemantauan lintas toko.
*   `Cashier.jsx` — Fitur Kasir POS (Point of Sale), transaksi, dan struk digital.
*   `Dashboard.jsx` — Manajemen stok barang, expired, laporan keuangan, dan konfigurasi.
*   `History.jsx` — Riwayat transaksi, pelunasan kasbon, dan export data CSV.

Organisasi modular ini meminimalkan ketergantungan antar fitur dan memudahkan kolaborasi tim.

### 2. SOLID Principles
Desain kode Kantongin mematuhi prinsip rekayasa perangkat lunak berorientasi objek/komponen:
*   **Single Responsibility Principle (SRP)**: Setiap fungsi dan komponen memiliki satu tugas spesifik. Contoh: file `src/kasir/qris.js` hanya bertanggung jawab untuk kalkulasi QRIS dan validasinya, sedangkan komponen `History` hanya berfokus pada visualisasi riwayat transaksi.
*   **Open/Closed Principle (OCP)**: Kode dirancang agar terbuka untuk perluasan tetapi tertutup untuk modifikasi langsung. Contohnya, struktur objek `settings` diatur dinamis sehingga penambahan opsi konfigurasi baru (seperti nominal PPN atau QRIS string) tidak merusak logika POS yang sudah ada.
*   **Liskov Substitution Principle (LSP)**: Struktur komponen React didesain agar properti yang diturunkan atau di-pass-down dapat saling menggantikan tanpa memicu kegagalan sistem.
*   **Interface Segregation Principle (ISP)**: Komponen React hanya menerima properti (props) yang mereka butuhkan. *Refactoring* terbaru membersihkan properti yang tidak terpakai (seperti `showToast` dan `uid`) untuk menjaga kebersihan antarmuka komponen.
*   **Dependency Inversion Principle (DIP)**: Logika tingkat tinggi tidak bergantung langsung pada komponen tingkat rendah secara statis, melainkan melalui abstraksi *state handler* yang di-pass-down dari komponen induk (`App.jsx`).

### 3. SSOT (Single Source of Truth)
Untuk mencegah inkonsistensi data (seperti ketidakcocokan jumlah stok di kasir dengan laporan di dashboard), aplikasi menggunakan prinsip **Satu Sumber Kebenaran**:
*   Seluruh state utama (`products`, `transactions`, `movements`, `settings`) didefinisikan dan dikelola secara terpusat di komponen induk `App.jsx`.
*   Semua perubahan data (checkout belanja, pembatalan pesanan, penambahan stok, pembuangan expired) wajib memicu *handler* terpusat yang memperbarui state utama tersebut, disinkronkan ke cache lokal (`localStorage`), dan dikirim ke basis data cloud (`MongoDB Atlas`) melalui fungsi sinkronisasi `saveAll()`.

### 4. HEXAGON (Hexagonal Architecture / Ports & Adapters)
Kantongin memisahkan logika bisnis inti (*core domain logic*) dari elemen infrastruktur luar seperti React UI, server API, local storage, dan database.
*   **Application Core**: Logika CRC-16 CCITT-FALSE, validasi string QRIS, dan kalkulator penyisipan nominal QRIS dinamis berada di file independen `src/kasir/qris.js` tanpa ketergantungan ke UI/framework.
*   **Ports & Adapters (Inbound/Outbound)**: UI React bertindak sebagai *Inbound Adapter* yang menangkap input pengguna, sedangkan API server Express.js dan MongoDB bertindak sebagai *Outbound Adapter* untuk penyimpanan data persisten.

### 5. OCTAGON (8 Pillars of Code & Quality Excellence)
OCTAGON dirumuskan sebagai 8 aturan emas/prinsip penulisan kode bersih yang wajib ditaati di proyek Kantongin:
1.  **O**ptimized State & Sync — Sinkronisasi data real-time yang optimal antara UI, cache lokal, dan basis data cloud melalui mekanisme throttling hemat bandwidth.
2.  **C**omponent Modularity — Pemisahan komponen visual secara tegas menjadi file mandiri yang terisolasi dan dapat digunakan kembali.
3.  **T**horough Validation — Validasi input yang ketat sebelum pemrosesan (seperti verifikasi string QRIS `000201...` dan pencegahan input stok bernilai negatif).
4.  **A**daptive & Responsive Layouts — Desain UI yang responsif menggunakan sistem grid/flexbox Tailwind CSS yang diuji berjalan mulus pada tablet kasir maupun ponsel pintar.
5.  **G**uaranteed Code Quality — Penegakan standar kualitas kode tanpa toleransi menggunakan aturan ESLint yang ketat dan formatter kode otomatis Prettier.
6.  **O**pen-Ended Extensions — Kode ditulis dengan fleksibilitas tinggi agar siap untuk penambahan fitur baru (seperti integrasi pembayaran digital otomatis) tanpa merombak total kode dasar.
7.  **N**o Technical Debt — Pembersihan kode secara berkala (menghapus variabel/import tak terpakai, optimasi visual SVG) untuk mencegah penumpukan utang teknis.
8.  **S**ecure Credentials Protection — Perlindungan mutlak terhadap kunci rahasia, kredensial MongoDB, dan JWT token dari file publik atau riwayat git history (menggunakan `.env` dan `.gitignore`).

---

## 📁 Struktur Proyek

```
web kantongin/
│
├── src/
│   ├── index.html              # Entry point tunggal aplikasi — mount React app (#app)
│   └── kasir/                  # Source code React kasir
│       ├── main.jsx            # React entry point (ReactDOM.createRoot)
│       ├── App.jsx             # Root component — state management, SPA routing & views
│       ├── index.css           # Tailwind directives + custom print styles + reveal animation
│       └── components/
│           ├── LandingPage.jsx # Komponen Landing Page utama
│           ├── Auth.jsx        # Komponen login, register, OTP verification
│           ├── Admin.jsx       # Panel Super Admin (monitoring toko & reset password)
│           ├── Cashier.jsx     # POS kasir — keranjang, pembayaran, struk
│           ├── Dashboard.jsx   # Dashboard stok, inventori, laporan, pengaturan
│           └── History.jsx     # Riwayat transaksi, tabel laporan, export CSV
│
├── api/
│   └── index.js                # Backend REST API (Express + MongoDB + JWT)
│
├── assets/
│   └── images/                 # Gambar pendukung
│
├── dist/                       # Output build production (diabaikan oleh git)
│
├── vite.config.js              # Konfigurasi Vite (root: 'src', outDir: '../dist')
├── tailwind.config.js          # Konfigurasi Tailwind CSS (custom colors & fonts)
├── postcss.config.js           # PostCSS plugins (tailwindcss + autoprefixer)
├── vercel.json                 # Konfigurasi deploy Vercel (SPA rewrites & API routing)
├── package.json                # Dependency Node.js & npm scripts
├── .gitignore                  # File ignore untuk node_modules, .env, dist, dll. (lebih aware)
└── README.md                   # Dokumentasi ini
```

---

## 🔍 Penjelasan Kode

### 1. Backend API — `api/index.js`

File ini adalah server Express.js yang menangani semua operasi backend:

```
api/index.js (213 baris)
├── Koneksi MongoDB          → Auto-connect saat request pertama masuk (Serverless-friendly)
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
  "products": [...],
  "transactions": [...],
  "movements": [...],
  "settings": {
    "storeName": "...",
    "storeAddress": "...",
    "storePhoto": "...",
    "qrisImage": "...",
    "taxPercent": 11
  }
}
```

---

### 2. Aplikasi Kasir — React (src/kasir/)

Aplikasi kasir dibangun sepenuhnya dengan **React 18** menggunakan komponen fungsional dan React Hooks.

#### A. Root Component — `App.jsx` (860 baris)

`App.jsx` adalah komponen induk yang mengelola seluruh **global state** dan **business logic** aplikasi:

```jsx
// State utama yang dikelola di App.jsx
const [token, setToken] = useState(null);        // JWT token
const [user, setUser] = useState(null);           // Data user yang login
const [activeView, setActiveView] = useState('cashier'); // View aktif

const [products, setProducts] = useState([]);     // Daftar produk
const [transactions, setTransactions] = useState([]); // Riwayat transaksi
const [movements, setMovements] = useState([]);   // Riwayat stok & expired
const [settings, setSettings] = useState({...});  // Pengaturan toko

const [cart, setCart] = useState([]);              // Keranjang belanja
const [paymentMethod, setPaymentMethod] = useState('Tunai');
```

**Routing berbasis state (tanpa React Router):**
```
App.jsx
├── loading=true    → Loading spinner
├── !token          → <Auth />          // Form login/register/OTP
├── user.role=admin → <Admin />         // Dashboard super admin
└── user biasa      → Layout utama
    ├── <Header />  (navigasi: Kasir | Dashboard | Riwayat)
    └── activeView ===
        ├── "cashier"   → <Cashier />
        ├── "dashboard" → <Dashboard />
        └── "history"   → <History />
```

**Fungsi bisnis utama di App.jsx:**

| Fungsi | Deskripsi |
|--------|-----------|
| `saveAll()` | Sync state ke localStorage + POST ke MongoDB Atlas |
| `handleFinishSale()` | Selesaikan transaksi, kurangi stok, simpan riwayat |
| `handleCancelTransaction()` | Batalkan pesanan & kembalikan stok |
| `handleRepayKasbon()` | Lunasi kasbon pelanggan |
| `handleAddStock()` | Tambah stok manual + catat movement |
| `handleExpiredStock()` | Buang stok expired + catat kerugian (costPrice × qty) |
| `handleSaveProduct()` | Tambah/edit produk dengan validasi SKU unik |
| `handleDeleteProduct()` | Hapus produk (cek dulu apakah ada di keranjang) |
| `handlePrintReceipt()` | Cetak struk thermal via `window.print()` |
| `handleSendWhatsAppReceipt()` | Kirim struk via WhatsApp (format text) |
| `handleExportCsv()` | Export laporan penjualan + expired ke CSV |

#### B. Komponen Auth — `Auth.jsx`

Menangani seluruh alur autentikasi:
- Form **Login** (username + password → OTP)
- Form **Register** (nama + email + username + password → OTP)
- Input **OTP** 6 digit dengan verifikasi server

#### C. Komponen Kasir — `Cashier.jsx`

Halaman utama kasir (POS) terdiri dari 2 kolom:
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

#### D. Komponen Dashboard — `Dashboard.jsx`

```
<Dashboard />
├── Metric Cards (Total barang, Nilai stok, Stok rendah, Penjualan hari ini)
├── Ringkasan Penjualan → 6 kartu periode (Hari ini s/d 1 Tahun)
│   └── Setiap kartu menampilkan:
│       ├── Omzet (revenue)
│       ├── + Keuntungan kotor (hijau)
│       ├── - Kerugian expired (merah)
│       └── Keuntungan Bersih (emerald/merah)
├── Tabel Laporan Penjualan (penjualan + expired gabungan)
│   └── Kolom: Tanggal | Kode | Keterangan | Pelanggan | Metode | Total | +Untung | -Rugi | Bersih
│   └── Pagination: 10 baris per halaman + tombol "Tampilkan Lainnya"
│   └── Footer: Total keseluruhan
├── Form Tambah/Ubah Barang (dengan upload foto produk)
├── Form Tambah Stok
├── Form Buang Stok (Expired) → Kurangi stok + catat kerugian di harga modal
├── Pengaturan Pembayaran (PPN, QRIS)
├── Profil Toko (Nama, Alamat, Logo)
└── Tabel Inventori (dengan aksi quick-stock, edit, hapus)
```

#### E. Komponen History — `History.jsx`

```
<History />
├── Tabel riwayat transaksi lengkap
├── Detail per transaksi (items, total, struk)
├── Aksi: Cetak struk | Kirim WA | Batalkan pesanan | Lunasi kasbon
├── Tabel & ringkasan expired
└── Tombol Export CSV
```

#### F. Komponen Admin — `Admin.jsx`

```
<Admin />
├── Tabel semua pengguna terdaftar
│   └── Kolom: Nama | Username | Jumlah Barang | Jumlah Transaksi
├── Form reset password user
└── Tombol logout
```

#### G. Sistem Expired — `handleExpiredStock()`

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
  costPerUnit: 2800,
  totalLoss: 28000,
  note: "Barang expired/dibuang"
}
```

#### H. Tabel Laporan Gabungan

Tabel ini menggabungkan **transaksi penjualan** dan **pencatatan expired** dalam satu tabel:

| Tipe | Kode | + Untung | - Rugi | Bersih |
|------|------|----------|--------|--------|
| Penjualan | TRX-2026... | +Rp7.000 | - | +Rp7.000 |
| Expired | EXP-abc... | - | -Rp28.000 | -Rp28.000 |
| **Total** | | **+Rp7.000** | **-Rp28.000** | **-Rp21.000** |

- Baris expired ditandai dengan background merah muda dan ikon ⏰
- Footer menampilkan total keseluruhan
- Default menampilkan **10 baris**, tombol "Tampilkan Lainnya" untuk load lebih

#### I. Sinkronisasi Data — `saveAll()`

```
saveAll()
├── Simpan ke localStorage (backup lokal / offline cache)
└── POST /api/store (sync ke MongoDB Atlas)
    └── Body: { products, transactions, movements, settings }
```

Data di-sync ke server setiap kali ada perubahan (tambah barang, transaksi selesai, stok masuk, expired, dll).

#### J. Export CSV — `handleExportCsv()`

Menghasilkan file CSV dengan kolom:
```
Kode Transaksi | Tanggal | Pelanggan | Item | Subtotal |
Diskon | PPN | Total | Metode Pembayaran | Keuntungan Kotor
```
- Baris transaksi normal memiliki keuntungan **positif**
- Baris expired ditambahkan di bawah dengan keuntungan **negatif** (`-totalLoss`)

---

### 3. Landing Page — `index.html`

Halaman pemasaran/*company profile* (Single File — CSS inline + JS inline) dengan fitur:
- **Loading screen** animasi logo dengan bounce dots
- **Navbar** responsif dengan hamburger menu mobile + glassmorphism (`backdrop-blur`)
- **Hero section** dengan animasi mockup window, floating indicator cards, dan ambient gradient
- **Fitur section** — 3 kartu fitur utama dengan animasi reveal on scroll
- **Tentang section** — Ilustrasi circular gradient dengan floating coins emoji
- **Footer** — Branding, kontak pembuat, tech stack badges (SVG icons), dan link sosial media

### 4. Konfigurasi Vite — `vite.config.js`

```javascript
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),    // Landing page
        kasir: resolve(__dirname, 'kasir/index.html') // Aplikasi kasir
      }
    }
  }
});
```
Multi-Page Application (MPA) — Landing page dan kasir di-build sebagai entry point terpisah.

### 5. Konfigurasi Tailwind — `tailwind.config.js`

```javascript
export default {
  content: [
    "./index.html",
    "./kasir/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        primary: { 50-700 },  // Green palette (toko/hijau)
        accent: { 50-700 },   // Orange palette (aksen/oranye)
      }
    }
  }
};
```

### 6. Konfigurasi Vercel — `vercel.json`

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

### 4. Jalankan Development Server
```bash
# Jalankan backend API
npm start
# ✅ Backend berjalan di http://localhost:3000

# Jalankan frontend (terminal terpisah)
npm run dev
# ✅ Vite dev server berjalan di http://localhost:5173
```

### 5. Build untuk Production
```bash
npm run build
# Output di folder dist/

npm run preview
# Preview build production di http://localhost:4173
```

---

## 🔐 Akses Panel Super Admin

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin_password_placeholder` |

> **Catatan:** Akun admin otomatis dibuat saat server pertama kali menyala. Konfigurasi email dan password admin melalui `.env` sebelum menjalankan server.

---

## ☁️ Deploy ke Vercel

Proyek ini sudah dikonfigurasi untuk Vercel:

1. Push kode ke GitHub
2. Hubungkan repository di [vercel.com](https://vercel.com)
3. Tambahkan Environment Variable `MONGODB_URI` di Vercel Dashboard
4. Deploy otomatis setiap push ke `main`

---

## 📊 Ringkasan Dependency

### Production
| Package | Versi | Fungsi |
|---------|-------|--------|
| `react` | ^18.3.1 | Library UI berbasis komponen |
| `react-dom` | ^18.3.1 | React renderer untuk browser |
| `lucide-react` | ^0.395.0 | Icon library modern |
| `express` | ^5.2.1 | REST API server |
| `mongodb` | ^7.2.0 | Driver MongoDB Node.js |
| `jsonwebtoken` | ^9.0.3 | JWT autentikasi |
| `nodemailer` | ^8.0.7 | Pengiriman email OTP |
| `cors` | ^2.8.6 | CORS middleware |

### Development
| Package | Versi | Fungsi |
|---------|-------|--------|
| `vite` | ^5.2.11 | Build tool & dev server |
| `@vitejs/plugin-react` | ^4.3.1 | Plugin React untuk Vite |
| `tailwindcss` | ^3.4.4 | Utility-first CSS framework |
| `postcss` | ^8.4.38 | CSS post-processing |
| `autoprefixer` | ^10.4.19 | Auto vendor prefix CSS |

---

## 👨‍💻 Dikembangkan Oleh

**Fahmi Dwisaputro** © 2026

Proyek ini dibuat dengan ❤️ menggunakan React, Vite, Tailwind CSS, dan Node.js.
