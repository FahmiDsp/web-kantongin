# 🛒 Kantongin (Kasir Niaga Toko Klontong dan Lainnya)

**Kantongin** adalah solusi aplikasi kasir digital *all-in-one* berbasis web (Full-Stack) yang dirancang khusus untuk mempermudah pencatatan transaksi, manajemen stok, dan pemantauan keuangan bagi warung, toko kelontong, dan UMKM.

![Versi](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-Selesai-success)
![Lisensi](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Fitur Unggulan

- **Sistem Akun Multi-Toko:** 1 Akun untuk 1 Toko. Setiap pengguna memiliki *database* ruang tokonya sendiri yang terisolasi dan aman.
- **Keamanan Tinggi dengan OTP Email:** Proses Registrasi dan Login diwajibkan menggunakan verifikasi OTP 6 digit yang dikirimkan langsung secara *real-time* ke alamat email (Gmail) pengguna.
- **Panel Super Admin:** Dashboard pusat khusus bagi pemilik sistem untuk memantau aktivitas seluruh toko (jumlah barang & transaksi) serta kemampuan mengubah/mereset kata sandi pengguna.
- **Kasir Cepat (POS):** Antarmuka kasir yang sangat responsif, dilengkapi perhitungan diskon, kalkulasi PPN otomatis, dan dukungan metode pembayaran Tunai maupun QRIS.
- **Manajemen Inventori & Peringatan Stok:** Kelola daftar barang, kategori, harga modal, harga jual, dan dapatkan label peringatan otomatis saat stok menipis atau habis.
- **Struk Digital & Cetak:** Fitur cetak struk untuk printer *thermal* atau kirim struk berformat rapi langsung ke WhatsApp pelanggan dengan satu klik.
- **Laporan & Ekspor Data:** Ringkasan omzet, laba kotor, dan jumlah transaksi. Dilengkapi fitur Ekspor riwayat transaksi ke dalam format CSV (Excel).

---

## 🚀 Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan arsitektur **Full-Stack JavaScript** yang ringan, mandiri, tanpa *framework* berat.

**Frontend (Antarmuka):**
- HTML5 & CSS3
- **Tailwind CSS** (via CDN untuk *styling* cepat & responsif)
- **Vanilla JavaScript** (Pemrosesan logika DOM secara murni)

**Backend (Server):**
- **Node.js** (Lingkungan *runtime*)
- **Express.js** (*Routing* REST API)
- **JSON Web Token / JWT** (Autentikasi sesi yang aman)
- **Nodemailer** (Sistem pengiriman email otomatis via SMTP)
- **MongoDB** (Cloud Database modern untuk skalabilitas dan dukungan Serverless Vercel)

---

## 📦 Cara Instalasi & Menjalankan Aplikasi Lokal

### 1. Persyaratan Sistem
Pastikan Anda telah menginstal **Node.js** di komputer Anda.

### 2. Persiapan Backend (Server)
1. Buka terminal atau Command Prompt (di VS Code).
2. Arahkan direktori terminal ke folder aplikasi (tempat file `server.js` berada).
3. Instal semua paket dan *dependency* yang dibutuhkan dengan perintah berikut:
   ```bash
   npm install express cors jsonwebtoken nodemailer mongodb
   ```
4. **Konfigurasi Backend:** Buka file `server.js` dan ubah beberapa hal berikut:
   - Masukkan *Connection String* (URL) dari **MongoDB Atlas** Anda ke variabel `MONGODB_URI`.
   - Masukkan alamat email Gmail dan **Sandi Aplikasi (App Password)** Anda di bagian konfigurasi `nodemailer`.
5. Jalankan server dengan perintah:
   ```bash
   node server.js
   ```
6. Jika berhasil, akan muncul tulisan `✅ Backend berjalan di http://localhost:3000`. Biarkan terminal ini **tetap terbuka**.

### 3. Menjalankan Frontend (Layar Pengguna)
1. Buka folder proyek menggunakan **Visual Studio Code (VS Code)**.
2. Pastikan Anda telah memasang ekstensi **Live Server**.
3. Buka file `kantongin/index.html` (Halaman Pemasaran/Landing Page) atau `buatkan-saya-website-kasir-untuk-toko/index.html` (Aplikasi Kasir).
4. Klik tulisan **"Go Live"** di pojok kanan bawah VS Code (atau klik Kanan -> *Open with Live Server*).
5. Aplikasi secara otomatis akan terbuka di *browser* Anda dan siap digunakan!

---

## 🔐 Akses Panel Super Admin

Untuk menguji coba Dashboard Super Admin, buka halaman Login Kasir dan gunakan kredensial bawaan berikut:

- **Username:** `admin`
- **Password:** `password`

> **Catatan Penting:** Karena aplikasi ini sekarang menggunakan MongoDB, akun admin otomatis dibuat saat server pertama kali menyala. Sebelum menjalankan server, buka file `server.js` dan temukan kode `email: 'admin@kantongin.com'`, lalu ubah menjadi email asli Anda. (Atau Anda bisa mengubahnya langsung dari data *collection* di website MongoDB Atlas).

---

## ☁️ Siap untuk Vercel (Hosting Gratis)

Proyek ini sudah dikonfigurasi secara khusus agar *Backend* maupun *Frontend*-nya dapat langsung diunggah (*deploy*) ke **Vercel** menggunakan `vercel.json` dan adaptasi arsitektur *Serverless Node.js*.

---

## 👨‍💻 Dikembangkan Oleh

**Fahmi Dwisaputro** © 2026

<<<<<<< HEAD
Proyek ini dibuat dengan ❤️ menggunakan kombinasi HTML, CSS, JavaScript Murni, dan Node.js.
=======
Proyek ini dibuat dengan ❤️ menggunakan kombinasi HTML, CSS, JavaScript Murni, dan Node.js.
>>>>>>> 9c73171ef94784129562b785fc37964b6419ce54
