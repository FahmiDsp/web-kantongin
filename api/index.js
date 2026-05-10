const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const SECRET_KEY = 'kantongin_rahasia_123';

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://admin_kantongin:Fahmi271201@cluster0.1l3pwuw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(MONGODB_URI);
let db;

// Middleware untuk menyambung ke MongoDB sebelum memproses request (Penting untuk Vercel Serverless)
app.use(async (req, res, next) => {
  if (!db) {
    try {
      await client.connect();
      db = client.db('kantongin_db');
      const adminExists = await db.collection('users').findOne({ username: 'admin' });
      if (!adminExists) {
        await db.collection('users').insertOne({ id: 'admin1', username: 'admin', password: 'password', role: 'admin', name: 'Super Admin', email: 'fahmidwisaputro2006@gmail.com' });
      }
    } catch (err) {
      console.error("Gagal menyambung ke MongoDB:", err);
      return res.status(500).json({ error: "Gagal menyambung ke Database MongoDB. Pastikan IP Anda sudah di-Allow Access from Anywhere di MongoDB Atlas." });
    }
  }
  next();
});

// ============================================
// KONFIGURASI PENGIRIM EMAIL (GMAIL ASLI)
// ============================================
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Gunakan false untuk port 587
  auth: {
    user: 'fahmidwisaputro2006@gmail.com', // Pastikan ini email Anda
    pass: 'xjav asly nwjo lxte'            // Pastikan ini Sandi Aplikasi Anda
  },
  tls: {
    rejectUnauthorized: false
  }
});

async function sendOTP(email, otp, isLogin = false) {
  try {
    const subject = isLogin ? 'Kode OTP Login Kantongin' : 'Kode OTP Registrasi Kantongin';
    const text = `Halo!\n\nKode OTP Anda adalah: ${otp}\n\nMasukkan kode tersebut ke dalam aplikasi. Jangan berikan kode ini kepada siapapun!`;
    
    await transporter.sendMail({
      from: '"Sistem Kantongin" <fahmidwisaputro2006@gmail.com>', // Pastikan ini email Anda
      to: email,
      subject: subject,
      text: text
    });
    console.log(`\n=== ✉️ EMAIL OTP ASLI BERHASIL DIKIRIM KE ${email} ===\n`);
  } catch (error) {
    console.error("Gagal mengirim email OTP:", error);
    throw error; // Melempar error agar ditangkap oleh aplikasi utama
  }
}

// Middleware Autentikasi
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token tidak ditemukan.' });
  try {
    req.user = jwt.verify(authHeader.split(' ')[1], SECRET_KEY);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Sesi berakhir, silakan login ulang.' });
  }
}

// =========================
// ENDPOINT: REGISTRASI OTP
// =========================
app.post('/api/register/request-otp', async (req, res) => {
  try {
    const { username, email } = req.body;
    const userExists = await db.collection('users').findOne({ username });
    if (userExists) return res.status(400).json({ error: 'Username sudah terdaftar.' });
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit
    await db.collection('otps').updateOne(
      { username },
      { $set: { otp, type: 'register', data: req.body, expires: Date.now() + 5 * 60000 } },
      { upsert: true }
    );
    
    await sendOTP(email, otp, false);
    res.json({ message: 'OTP telah dikirim ke email Anda.' });
  } catch (error) {
    console.error("Error saat mengirim OTP:", error);
    res.status(500).json({ error: 'Gagal mengirim email OTP. Pastikan internet stabil atau coba sesaat lagi.' });
  }
});

app.post('/api/register/verify', async (req, res) => {
  const { username, otp } = req.body;
  const record = await db.collection('otps').findOne({ username });
  
  if (!record || record.type !== 'register') return res.status(400).json({ error: 'Sesi OTP tidak valid.' });
  if (Date.now() > record.expires) return res.status(400).json({ error: 'OTP sudah kadaluarsa.' });
  if (record.otp !== otp) return res.status(400).json({ error: 'Kode OTP salah.' });

  const newUser = { id: 'usr_' + Date.now(), name: record.data.name, username: record.data.username, email: record.data.email, password: record.data.password, role: 'user' };
  await db.collection('users').insertOne(newUser);
  await db.collection('stores').insertOne({ userId: newUser.id, products: [], transactions: [], movements: [], settings: {} });
  await db.collection('otps').deleteOne({ username });
  
  res.json({ message: 'Registrasi berhasil!' });
});

// =========================
// ENDPOINT: LOGIN OTP
// =========================
app.post('/api/login/request-otp', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await db.collection('users').findOne({ username, password });
    if (!user) return res.status(401).json({ error: 'Username atau password salah.' });
    
    const userEmail = user.email || 'testing@kantongin.com'; 
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await db.collection('otps').updateOne(
      { username },
      { $set: { otp, type: 'login', user, expires: Date.now() + 5 * 60000 } },
      { upsert: true }
    );
    
    await sendOTP(userEmail, otp, true);
    res.json({ message: `OTP dikirim ke email Anda.` });
  } catch (error) {
    console.error("Error saat mengirim OTP:", error);
    res.status(500).json({ error: 'Gagal mengirim email OTP. Pastikan internet stabil atau coba sesaat lagi.' });
  }
});

app.post('/api/login/verify', async (req, res) => {
  const { username, otp } = req.body;
  const record = await db.collection('otps').findOne({ username });
  
  if (!record || record.type !== 'login') return res.status(400).json({ error: 'Sesi OTP tidak valid.' });
  if (Date.now() > record.expires) return res.status(400).json({ error: 'OTP sudah kadaluarsa.' });
  if (record.otp !== otp) return res.status(400).json({ error: 'Kode OTP salah.' });

  const user = record.user;
  const token = jwt.sign({ id: user.id, role: user.role, username: user.username }, SECRET_KEY);
  await db.collection('otps').deleteOne({ username });
  res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
});

// Endpoint Fetch Data 
app.get('/api/store', authenticate, async (req, res) => {
  if (req.user.role === 'admin') return res.status(403).json({ error: 'Admin tidak memiliki toko fisik.' });
  const store = await db.collection('stores').findOne({ userId: req.user.id });
  if (store) delete store._id; // Sembunyikan ID asli MongoDB
  res.json(store || {});
});

app.post('/api/store', authenticate, async (req, res) => {
  if (req.user.role === 'admin') return res.status(403).json({ error: 'Admin tidak bisa simpan data toko.' });
  await db.collection('stores').updateOne(
    { userId: req.user.id },
    { $set: req.body },
    { upsert: true }
  );
  res.json({ message: 'Sync berhasil.' });
});

app.get('/api/admin/users', authenticate, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Akses ditolak.' });
  const users = await db.collection('users').find({ role: 'user' }).toArray();
  const stores = await db.collection('stores').find({}).toArray();
  const stats = users.map(u => {
    const store = stores.find(s => s.userId === u.id);
    return {
      id: u.id, name: u.name, username: u.username,
      productsCount: store?.products?.length || 0,
      transactionsCount: store?.transactions?.length || 0
    };
  });
  res.json(stats);
});

// Endpoint: Ubah Password oleh Admin
app.post('/api/admin/users/:id/reset-password', authenticate, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Akses ditolak.' });
  if (!req.body.newPassword || req.body.newPassword.length < 6) {
    return res.status(400).json({ error: 'Password minimal 6 karakter.' });
  }
  
  const result = await db.collection('users').updateOne(
    { id: req.params.id },
    { $set: { password: req.body.newPassword } }
  );
  
  if (result.matchedCount === 0) return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
  res.json({ message: 'Password pengguna berhasil diubah.' });
});

if (require.main === module) {
  app.listen(3000, () => console.log(`✅ Backend berjalan di http://localhost:3000`));
} else {
  module.exports = app; // Sangat penting agar Vercel bisa menjalankan Serverless
}