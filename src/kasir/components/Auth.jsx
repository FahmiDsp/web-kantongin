import React, { useState } from 'react';
import { Lock, Mail, Store, User, ArrowLeft, Loader2 } from 'lucide-react';

export default function Auth({ authMode, setAuthMode, onAuthSuccess, showToast, navigate }) {
  const [loading, setLoading] = useState(false);
  const [tempPayload, setTempPayload] = useState(null);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [otp, setOtp] = useState('');

  const isLogin = authMode === 'login';
  const isOtp = authMode.startsWith('otp_');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isOtp) {
      const action = authMode === 'otp_login' ? 'login' : 'register';
      try {
        const res = await fetch(`/api/${action}/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...tempPayload, otp }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || 'Verifikasi gagal');

        if (action === 'login') {
          showToast('Login berhasil!');
          onAuthSuccess(data.token, data.user);
        } else {
          setAuthMode('login');
          setTempPayload(null);
          setOtp('');
          showToast('Registrasi berhasil, silakan login.');
        }
      } catch (err) {
        showToast(err.message, 'error');
        if (err.message && err.message.includes('terblokir')) {
          setAuthMode(action === 'login' ? 'login' : 'register');
          setTempPayload(null);
          setOtp('');
        }
      }
    } else {
      if (!isLogin && password !== passwordConfirm) {
        showToast('Password dan konfirmasi password tidak cocok!', 'error');
        setLoading(false);
        return;
      }

      const payload = isLogin ? { username, password } : { name, email, username, password };

      try {
        const endpoint = isLogin ? '/api/login/request-otp' : '/api/register/request-otp';
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || 'Gagal menyambung ke server');

        setTempPayload(payload);
        setAuthMode(isLogin ? 'otp_login' : 'otp_register');
        showToast(data.message || 'OTP berhasil dikirim!');
      } catch (err) {
        showToast(err.message, 'error');
      }
    }
    setLoading(false);
  };

  if (isOtp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 animate-in fade-in duration-300">
          <div className="flex justify-center mb-6 text-primary-600 bg-primary-100 p-4 rounded-full w-16 h-16 mx-auto">
            <Mail className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Verifikasi OTP</h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Masukkan 6 digit kode yang dikirim ke email <strong>{tempPayload?.email || tempPayload?.username}</strong>.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Kode OTP</label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all text-center tracking-[0.5em] text-xl font-bold"
                required
                placeholder="••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verifikasi'}
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode(authMode.replace('otp_', ''));
                setOtp('');
              }}
              className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Batal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 animate-in fade-in duration-300">
        <div className="flex justify-center mb-6 text-primary-600 bg-primary-100 p-4 rounded-full w-16 h-16 mx-auto">
          <Store className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          {isLogin ? 'Login Kasir' : 'Daftar Akun Baru'}
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          {isLogin ? 'Masuk ke toko Anda' : 'Satu akun untuk satu toko'}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Nama Toko / Pemilik</label>
                <div className="relative">
                  <Store className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                    required
                    minLength={3}
                    placeholder="Min. 3 karakter"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                    required
                    placeholder="email@contoh.com"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Username</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                required
                pattern={!isLogin ? '[a-z0-9_]{4,}' : undefined}
                title={!isLogin ? 'Minimal 4 karakter, hanya huruf kecil, angka, atau underscore' : undefined}
                placeholder={isLogin ? 'Masukkan username' : 'Min. 4 karakter'}
              />
            </div>
            {!isLogin && (
              <p className="text-[10px] text-gray-500 mt-1">
                *Hanya huruf kecil, angka, dan garis bawah (_), tanpa spasi.
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                required
                minLength={!isLogin ? 6 : undefined}
                placeholder={isLogin ? 'Masukkan password' : 'Min. 6 karakter'}
              />
            </div>
            {!isLogin && <p className="text-[10px] text-gray-500 mt-1">*Minimal 6 karakter untuk keamanan.</p>}
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Konfirmasi Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                  required
                  minLength={6}
                  placeholder="Ulangi password"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : isLogin ? 'Masuk' : 'Daftar Sekarang'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}{' '}
          <button
            type="button"
            onClick={() => setAuthMode(isLogin ? 'register' : 'login')}
            className="text-primary-600 font-bold hover:underline"
          >
            {isLogin ? 'Daftar di sini' : 'Login di sini'}
          </button>
        </p>

        <div className="text-center mt-4 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-xs text-gray-500 hover:text-primary-600 font-semibold transition-colors flex items-center justify-center gap-1.5 mx-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Halaman Utama
          </button>
        </div>
      </div>
    </div>
  );
}
