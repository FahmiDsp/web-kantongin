import React, { useState } from 'react';
import { Key, Save, LogOut, Home, Box, Receipt, X } from 'lucide-react';

export default function Admin({ adminUsers, token, onLogout, showToast }) {
  const [adminModal, setAdminModal] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  const totalUsers = adminUsers.length;
  const totalProducts = adminUsers.reduce((sum, u) => sum + (u.productsCount || 0), 0);
  const totalTrx = adminUsers.reduce((sum, u) => sum + (u.transactionsCount || 0), 0);

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      showToast('Password minimal 6 karakter.', 'error');
      return;
    }
    setResetLoading(true);

    try {
      const res = await fetch(`/api/admin/users/${adminModal.id}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ newPassword })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Gagal mengubah password');

      showToast(data.message || 'Password berhasil diubah!');
      setAdminModal(null);
      setNewPassword('');
    } catch (err) {
      showToast(err.message, 'error');
    }
    setResetLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1480px] mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
            <div className="w-11 h-11 text-white bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl p-2.5 shadow-md flex items-center justify-center shrink-0">
              <Home className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-gray-900 leading-tight">Super Admin Dashboard</h1>
              <p className="text-xs text-gray-500">Pusat kontrol dan pemantauan aktivitas seluruh toko</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            type="button" 
            className="w-full sm:w-auto px-4 py-2 bg-red-50 text-red-600 font-bold text-sm rounded-lg hover:bg-red-100 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Logout Akses
          </button>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Total Toko Aktif</span>
              <strong className="text-2xl font-extrabold text-gray-800">{totalUsers}</strong>
            </div>
          </div>
          <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
              <Box className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Total Barang Terdaftar</span>
              <strong className="text-2xl font-extrabold text-gray-800">{totalProducts}</strong>
            </div>
          </div>
          <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Transaksi Selesai</span>
              <strong className="text-2xl font-extrabold text-gray-800">{totalTrx}</strong>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 bg-gray-50/50">
            <h2 className="font-bold text-gray-800 text-lg">Daftar Akun Toko</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <th className="px-5 py-3 border-b border-gray-100">Nama Toko / Pemilik</th>
                  <th className="px-5 py-3 border-b border-gray-100">Aktivitas</th>
                  <th className="px-5 py-3 border-b border-gray-100 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {adminUsers.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-5 py-12 text-center text-gray-500 text-sm">
                      Belum ada pengguna terdaftar
                    </td>
                  </tr>
                ) : (
                  adminUsers.map(u => (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm uppercase shrink-0">
                            {u.name.substring(0, 2)}
                          </div>
                          <div>
                            <strong className="text-sm text-gray-800 block">{u.name}</strong>
                            <span className="text-xs text-gray-500">@{u.username}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-bold text-[11px] border border-blue-100">
                            {u.productsCount || 0} Barang
                          </span>
                          <span className="bg-green-50 text-green-700 px-2.5 py-1 rounded-md font-bold text-[11px] border border-green-100">
                            {u.transactionsCount || 0} Trx
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button 
                          onClick={() => setAdminModal({ id: u.id, username: u.username })}
                          type="button" 
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50 hover:text-primary-600 shadow-sm active:scale-95 transition-all outline-none"
                        >
                          <Key className="w-3.5 h-3.5" /> Ubah Sandi
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {adminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Ubah Sandi Pengguna</h3>
              <button 
                type="button" 
                onClick={() => { setAdminModal(null); setNewPassword(''); }}
                className="text-gray-400 hover:text-gray-600 outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleResetPasswordSubmit} className="p-5 flex flex-col gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-3">
                  Atur ulang password untuk akun toko <strong className="text-gray-800">@{adminModal.username}</strong>.
                </p>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Password Baru</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all" 
                  required 
                  minLength={6} 
                  placeholder="Minimal 6 karakter" 
                />
              </div>
              <button 
                type="submit" 
                disabled={resetLoading}
                className="w-full mt-2 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 flex justify-center items-center gap-2"
              >
                <Save className="w-4 h-4" /> Simpan Password
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
