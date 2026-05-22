import React, { useState, useEffect } from 'react';

export default function LandingPage({ navigate }) {
  const [loadingScreenVisible, setLoadingScreenVisible] = useState(true);
  const [loadingScreenRendered, setLoadingScreenRendered] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Loading screen fadeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingScreenVisible(false);
      const removeTimer = setTimeout(() => {
        setLoadingScreenRendered(false);
      }, 500);
      return () => clearTimeout(removeTimer);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Scroll reveal logic
  useEffect(() => {
    const revealOnScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      const windowHeight = window.innerHeight;
      const elementVisible = 50;
      reveals.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('visible');
        }
      });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // trigger initially
    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);

  // Navbar scrolled effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-slate-50 text-slate-900 antialiased selection:bg-primary-600 selection:text-white font-sans overflow-x-hidden min-h-screen">
      {/* ===== LOADING SCREEN ===== */}
      {loadingScreenRendered && (
        <div
          id="loading-screen"
          className={`fixed inset-0 bg-white flex flex-col justify-center items-center z-50 transition-all duration-500 ${
            loadingScreenVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg text-white font-bold text-2xl mb-6 animate-pulse">
            K
          </div>
          <div className="flex gap-2">
            <span className="w-3.5 h-3.5 bg-accent-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-3.5 h-3.5 bg-accent-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-3.5 h-3.5 bg-accent-500 rounded-full animate-bounce"></span>
          </div>
        </div>
      )}

      {/* ===== NAVBAR ===== */}
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b py-4 ${
          isScrolled
            ? 'shadow-md bg-white/90 border-slate-100 backdrop-blur-md'
            : 'bg-white/70 border-transparent backdrop-blur-md'
        }`}
        id="navbar"
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 text-lg font-extrabold text-slate-900 tracking-tight">
            <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center text-white text-base shadow-md shadow-primary-600/10">
              K
            </div>
            Kantongin
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600" id="navLinks">
            <a href="#fitur" className="hover:text-primary-600 transition-colors">
              Fitur
            </a>
            <a href="#tentang" className="hover:text-primary-600 transition-colors">
              Tentang
            </a>
            <button
              onClick={() => navigate('/kasir')}
              className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl shadow-md shadow-primary-600/10 transition-all active:scale-95"
            >
              Login Kasir
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="hamburger md:hidden flex flex-col gap-1.5 focus:outline-none"
            id="hamburger"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-slate-800 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
            ></span>
            <span className={`w-6 h-0.5 bg-slate-800 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span
              className={`w-6 h-0.5 bg-slate-800 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            ></span>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`${
            mobileMenuOpen ? 'flex' : 'hidden'
          } md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 flex-col gap-4 text-center shadow-lg text-sm font-bold text-slate-700`}
          id="mobileMenu"
        >
          <a
            href="#fitur"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 hover:text-primary-600 border-b border-slate-50"
          >
            Fitur
          </a>
          <a
            href="#tentang"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 hover:text-primary-600 border-b border-slate-50"
          >
            Tentang
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              navigate('/kasir');
            }}
            className="py-3 bg-primary-600 text-white rounded-xl text-center font-bold"
          >
            Login Kasir
          </button>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden" id="hero">
        {/* Ambient gradient backdrops */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary-100/50 to-emerald-100/20 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-accent-100/30 to-orange-100/10 rounded-full blur-3xl -z-10 -translate-x-1/4 translate-y-1/4"></div>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Kelola Toko Jadi Lebih{' '}
              <span className="bg-gradient-to-r from-primary-600 to-emerald-600 bg-clip-text text-transparent">
                Mudah
              </span>{' '}
              & Efisien
            </h1>
            <p className="text-base sm:text-lg text-slate-500 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              <strong>Kantongin</strong> (Kasir Niaga Toko Kelontong) adalah solusi kasir digital modern untuk mencatat
              transaksi jualan, memantau stok, dan menganalisis laba bersih secara real-time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => navigate('/kasir?mode=register')}
                className="w-full sm:w-auto px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-primary-600/15 transition-all hover:shadow-xl active:scale-95 text-center"
              >
                Daftar Gratis
              </button>
              <a
                href="#fitur"
                className="w-full sm:w-auto px-8 py-3.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-sm rounded-xl transition-all active:scale-95 text-center"
              >
                Pelajari Fitur
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            {/* Animated Card Mockup */}
            <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xl relative">
              <div className="flex items-center gap-1.5 pb-4 border-b border-slate-100 mb-4">
                <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                <span className="text-[10px] text-slate-400 font-bold ml-auto font-mono">KANTONGIN-PREVIEW</span>
              </div>

              <div className="space-y-3.5">
                <div className="h-4 bg-slate-100 rounded-full w-2/3"></div>
                <div className="h-4 bg-slate-100 rounded-full w-full"></div>
                <div className="h-4 bg-slate-100 rounded-full w-1/2"></div>

                {/* Chart Graphic Preview */}
                <div className="h-28 bg-slate-50 border border-slate-100 rounded-xl flex items-end justify-between p-4 pt-8">
                  <span className="w-6 bg-primary-500 rounded-t-md h-[40%] animate-pulse"></span>
                  <span className="w-6 bg-accent-500 rounded-t-md h-[75%] animate-pulse [animation-delay:0.2s]"></span>
                  <span className="w-6 bg-primary-600 rounded-t-md h-[55%] animate-pulse [animation-delay:0.4s]"></span>
                  <span className="w-6 bg-emerald-500 rounded-t-md h-[90%] animate-pulse [animation-delay:0.6s]"></span>
                </div>
              </div>

              {/* Floating Indicators */}
              <div className="absolute -top-6 -left-6 bg-white border border-slate-200/80 rounded-2xl p-3 shadow-lg flex items-center gap-3 animate-bounce [animation-duration:4s]">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Omzet Toko
                  </span>
                  <strong className="text-sm font-bold text-slate-800">Rp 150.000</strong>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white border border-slate-200/80 rounded-2xl p-3 shadow-lg flex items-center gap-3 animate-bounce [animation-duration:3s]">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                  📦
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Stok Barang
                  </span>
                  <strong className="text-sm font-bold text-slate-800">Update Otomatis</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FITUR ===== */}
      <section className="py-20 md:py-24 bg-slate-100/50 border-y border-slate-200/60" id="fitur">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16 reveal">
            <span className="bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-primary-200">
              Fitur Unggulan
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-4 leading-tight">
              Semua yang Anda Butuhkan dalam Satu Sistem
            </h2>
            <p className="text-slate-500 text-sm mt-3 font-medium leading-relaxed">
              Dari POS kasir penjualan, kontrol inventori barang, hingga laporan keuangan periodik — semuanya
              terintegrasi dengan sempurna.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow reveal">
              <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center text-xl font-bold mb-5 border border-primary-100">
                🛒
              </div>
              <h3 class="font-bold text-slate-800 text-lg mb-2">Kasir Digital Cepat</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                Proses transaksi dalam hitungan detik dengan antarmuka kasir yang dirancang intuitif. Mendukung opsi
                pembayaran tunai, QRIS, dan pencatatan kasbon.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow reveal">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center text-xl font-bold mb-5 border border-orange-100">
                📦
              </div>
              <h3 class="font-bold text-slate-800 text-lg mb-2">Kontrol Stok Otomatis</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                Jumlah stok terpotong otomatis setiap terjadi checkout penjualan. Dapatkan peringatan dinamis saat stok
                mendekati batas minimum.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow reveal">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center text-xl font-bold mb-5 border border-blue-100">
                📈
              </div>
              <h3 class="font-bold text-slate-800 text-lg mb-2">Laba Bersih & Expired</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                Analisis profit penjualan secara periodik. Dukungan pemotongan stok expired dan penghitungan kerugian
                langsung mengurangi laba bersih.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TENTANG ===== */}
      <section className="py-20 md:py-24" id="tentang">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal flex justify-center">
              {/* Custom Illustration block */}
              <div className="relative w-80 h-80 bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-full border border-primary-200/50 flex items-center justify-center">
                <div className="w-48 h-48 bg-white border-2 border-slate-200 rounded-3xl p-4 shadow-xl flex flex-col items-center">
                  <div className="w-full h-2 bg-slate-100 rounded-full mb-3"></div>
                  <div className="w-12 h-12 bg-primary-50 text-primary-600 flex items-center justify-center text-xl rounded-full mb-3">
                    ✓
                  </div>
                  <div className="w-3/4 h-2.5 bg-slate-100 rounded-full mb-2"></div>
                  <div className="w-1/2 h-2.5 bg-slate-100 rounded-full"></div>
                </div>

                <div className="absolute top-8 right-8 text-2xl animate-bounce">🪙</div>
                <div className="absolute bottom-8 left-8 text-2xl animate-bounce [animation-delay:0.3s]">💸</div>
              </div>
            </div>

            <div className="space-y-6 text-center lg:text-left reveal">
              <span className="bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-primary-200">
                Tentang Kami
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
                Kasir Toko Kelontong Modern & UMKM Mandiri
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                <strong>Kantongin</strong> (Kasir Niaga Toko Kelontong) dirancang khusus untuk memotong kerumitan
                pencatatan manual pada warung tradisional dan usaha mikro lainnya. Kami membawa kemudahan integrasi
                pembukuan digital kasir tanpa perlu biaya investasi software yang mahal.
              </p>
              <ul className="space-y-3 text-sm text-slate-600 font-semibold inline-block lg:block text-left">
                <li className="flex items-center gap-2">
                  <span className="text-primary-600">✓</span> Sinkronisasi database cloud aman
                </li>
                <li className="flex items-center gap-2">
                  <span class="text-primary-600">✓</span> Akses kasir responsif dari HP / PC
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary-600">✓</span> 100% Gratis dan terus berkembang
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-12 border-b border-slate-800">
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-2.5 text-lg font-extrabold text-white tracking-tight">
                <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center text-white text-base">
                  K
                </div>
                Kantongin
              </a>
              <p className="text-slate-400 text-xs font-medium max-w-sm">
                Membantu digitalisasi UMKM Indonesia melalui pencatatan kasir niaga yang mudah, cepat, dan terpercaya.
              </p>

              <div className="pt-4 space-y-2">
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  KONTAK PEMBUAT
                </span>
                <div className="flex flex-col gap-1.5 text-xs text-slate-400 font-semibold">
                  <a
                    href="tel:085895659606"
                    className="hover:text-primary-400 transition-colors flex items-center gap-2"
                  >
                    <span>📞</span> 085895659606
                  </a>
                  <a
                    href="mailto:fahmidwisaputro2006@gmail.com"
                    className="hover:text-primary-400 transition-colors flex items-center gap-2"
                  >
                    <span>✉️</span> fahmidwisaputro2006@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-300">Teknologi Pendukung</h4>
              <div className="flex flex-wrap gap-2.5">
                {/* React 18 */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 text-[10px] font-bold rounded-lg text-slate-400 hover:border-[#61DAFB]/50 hover:text-[#61DAFB] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="2.2" />
                    <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
                    <ellipse
                      cx="12"
                      cy="12"
                      rx="11"
                      ry="4.2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      transform="rotate(60 12 12)"
                    />
                    <ellipse
                      cx="12"
                      cy="12"
                      rx="11"
                      ry="4.2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      transform="rotate(120 12 12)"
                    />
                  </svg>
                  React 18
                </span>

                {/* Vite */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 text-[10px] font-bold rounded-lg text-slate-400 hover:border-[#BD34FE]/50 hover:text-[#BD34FE] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 410 404" fill="none">
                    <path
                      d="M399.6 58.3L212.2 398.2c-3.3 6-12 6.1-15.5.2L5.1 58.3c-3.8-6.5 2.2-14 9.3-12.6l192 36.8c1.2.2 2.4.2 3.6 0L401 45.7c7.1-1.3 13 6.2 9.2 12.6h-.6z"
                      fill="url(#vg1)"
                    />
                    <path
                      d="M292.6 1L156.4 28.4c-2.3.5-4 2.5-4 4.8l-8.4 142c-.1 3 2.5 5.3 5.5 4.8l37.2-6.5c3.3-.6 6.2 2.3 5.4 5.5l-11 45.7c-.8 3.4 2.5 6.3 5.8 5.3l20.5-6.2c3.3-1 6.6 1.9 5.8 5.3L198 284.3c-1.2 4.8 5.4 7.4 8 3.2l1.7-2.8 82.8-165.2c1.5-3.1-1.3-6.5-4.7-5.8l-38 8c-3.4.7-6.3-2.8-5.1-6.1L275 20c1.2-3.3-1.7-6.7-5.1-6l22.7 22.7V1z"
                      fill="url(#vg2)"
                    />
                    <defs>
                      <linearGradient id="vg1" x1="6.1" y1="33" x2="235" y2="344" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#41D1FF" />
                        <stop offset="1" stopColor="#BD34FE" />
                      </linearGradient>
                      <linearGradient id="vg2" x1="195" y1="10" x2="237" y2="248" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFBD4F" />
                        <stop offset="1" stopColor="#FF9640" />
                      </linearGradient>
                    </defs>
                  </svg>
                  Vite
                </span>

                {/* Tailwind CSS */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 text-[10px] font-bold rounded-lg text-slate-400 hover:border-[#38BDF8]/50 hover:text-[#38BDF8] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
                  </svg>
                  Tailwind CSS
                </span>

                {/* Express.js */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 text-[10px] font-bold rounded-lg text-slate-400 hover:border-slate-400/50 hover:text-slate-300 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.739-4.725 6.23a1.5 1.5 0 01-1.895.72l5.45-7.194-5.007-6.614a1.53 1.53 0 011.895.72l3.528 4.85 3.5-4.8a1.5 1.5 0 011.9-.72l-4.15 5.49 5.35 7.05zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116c-.174 6.04 4.59 7.7 7.96 4.3l1.543 1.2C8.004 20.452 3.35 20.2 1.333 16.54c-.727-1.323-.989-2.78-.989-4.4l-.004-.218-.338-.346zm1.114-.134h8.77c-.077-3.066-1.635-5.197-4.093-5.197-2.655 0-4.26 2.28-4.677 5.197z" />
                  </svg>
                  Express.js
                </span>

                {/* MongoDB */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 text-[10px] font-bold rounded-lg text-slate-400 hover:border-[#47A248]/50 hover:text-[#47A248] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.447c.143-.396.336-.745.58-1.04.848-1.079 3.727-2.544 3.727-5.305 0-2.907-1.107-5.472-2.152-7.4a24.03 24.03 0 00-2.08-3.082c1.376 1.05 3.345 3.165 4.76 7.382z" />
                  </svg>
                  MongoDB
                </span>

                {/* JWT Auth */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 text-[10px] font-bold rounded-lg text-slate-400 hover:border-[#FB015B]/50 hover:text-[#FB015B] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10.2 0v6.456L12 9.317l1.8-2.861V0h-3.6zm3.6 24v-6.457L12 14.683l-1.8 2.86V24h3.6zM3.396 3.396l1.273 6.325 3.274 1.802.609-3.463-2.592-2.592 4.23-1.073-1.27-6.325L3.396 3.396zm17.208 17.208l-1.273-6.325-3.274-1.802-.609 3.463 2.592 2.592-4.23 1.073 1.27 6.325 5.524-5.326zM0 13.8l5.7-2.571 1.3-3.5L4.143 7.2.982 9.792 0 13.8zm24-3.6l-5.7 2.571-1.3 3.5 2.857.529 3.161-2.592.982-4.008zM3.396 20.604l6.325-1.273 1.802-3.274-3.463-.609-2.592 2.592-1.073-4.23-6.325 1.27 5.326 5.524zm17.208-17.208l-6.325 1.273-1.802 3.274 3.463.609 2.592-2.592 1.073 4.23 6.325-1.27-5.326-5.524z" />
                  </svg>
                  JWT Auth
                </span>

                {/* Node.js */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 text-[10px] font-bold rounded-lg text-slate-400 hover:border-[#339933]/50 hover:text-[#339933] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 00.272 0l8.795-5.076a.277.277 0 00.134-.238V6.921a.28.28 0 00-.137-.242L12.135 1.6a.27.27 0 00-.27 0L3.078 6.68a.282.282 0 00-.14.243v10.15c0 .099.053.19.138.236l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675a1.857 1.857 0 01-.922-1.604V6.921c0-.659.353-1.275.922-1.603L11.076.242a1.924 1.924 0 011.846 0l8.794 5.076c.57.329.924.944.924 1.603v10.15a1.86 1.86 0 01-.924 1.604l-8.794 5.078a1.842 1.842 0 01-.924 2.47z" />
                  </svg>
                  Node.js
                </span>

                {/* Nodemailer */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 text-[10px] font-bold rounded-lg text-slate-400 hover:border-[#22BC66]/50 hover:text-[#22BC66] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1.5 3h21c.8 0 1.5.7 1.5 1.5v15c0 .8-.7 1.5-1.5 1.5h-21C.7 21 0 20.3 0 19.5v-15C0 3.7.7 3 1.5 3zm10.5 9.3L2.6 5.2l-.1.3v13l.1.1h18.8l.1-.1v-13l-.1-.3-9.4 7.1zm9-6.8H3l9 6.8 9-6.8z" />
                  </svg>
                  Nodemailer
                </span>

                {/* Lucide Icons */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 text-[10px] font-bold rounded-lg text-slate-400 hover:border-[#F56565]/50 hover:text-[#F56565] transition-colors">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                  Lucide Icons
                </span>

                {/* DaisyUI */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 text-[10px] font-bold rounded-lg text-slate-400 hover:border-[#FFDF00]/50 hover:text-[#FFDF00] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a1 1 0 0 1 .993.883L13 3v2.031a6.97 6.97 0 0 1 3.237 1.341l1.434-1.434a1 1 0 0 1 1.32-.083l.094.083a1 1 0 0 1 0 1.414l-1.434 1.434A6.97 6.97 0 0 1 18.969 11H21a1 1 0 0 1 .993.883L21.002 12v1a1 1 0 0 1-.883.993L20 14.002h-2.031a6.97 6.97 0 0 1-1.341 3.237l1.434 1.434a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.414 0l-1.434-1.434A6.97 6.97 0 0 1 13 18.969V21a1 1 0 0 1-.883.993L12 22.002h-1a1 1 0 0 1-.993-.883L10 21.002v-2.031a6.97 6.97 0 0 1-3.237-1.341l-1.434 1.434a1 1 0 0 1-1.32.083l-.094-.083a1 1 0 0 1 0-1.414l1.434-1.434A6.97 6.97 0 0 1 5.031 13H3a1 1 0 0 1-.993-.883L2 12.002v-1a1 1 0 0 1 .883-.993L3.002 10.002h2.031a6.97 6.97 0 0 1 1.341-3.237L4.94 5.331a1 1 0 0 1-.083-1.32l.083-.094a1 1 0 0 1 1.414 0l1.434 1.434A6.97 6.97 0 0 1 11 5.031V3a1 1 0 0 1 .883-.993L12.002 2zm0 8.002a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                  </svg>
                  DaisyUI
                </span>

                {/* Prettier */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 text-[10px] font-bold rounded-lg text-slate-400 hover:border-[#EA580C]/50 hover:text-[#EA580C] transition-colors">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                  Prettier
                </span>

                {/* ESLint */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 text-[10px] font-bold rounded-lg text-slate-400 hover:border-[#4B32C3]/50 hover:text-[#4B32C3] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8l7.2 3.6v7.2L12 19.2l-7.2-3.6V8.4L12 4.8z" />
                  </svg>
                  ESLint
                </span>

                {/* Vercel */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 text-[10px] font-bold rounded-lg text-slate-400 hover:border-white/50 hover:text-white transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L24 22H0L12 1z" />
                  </svg>
                  Vercel
                </span>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-semibold">
            <p>&copy; 2026 Fahmi Dwisaputro. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/FahmiDsp"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Github
              </a>
              <a
                href="https://www.instagram.com/fahmi.dws/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
