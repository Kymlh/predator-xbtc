import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, BookOpen, HelpCircle, FileText, MessageCircle, 
  ChevronDown, ChevronUp, Shield, Key, Lock, Play, Pause,
  CheckCircle, AlertTriangle, Send, Smartphone, ExternalLink,
  Copy, Crosshair, Zap, Terminal, Eye, Home, 
  Activity, TrendingUp, Users, Cpu, RefreshCw, Crown, 
  LogOut, Settings, Bell, Wallet, XCircle
} from 'lucide-react';

// --- ANA SİSTEM (YÖNETİCİ) ---
export default function PredatorX_Master() {
  const [systemView, setSystemView] = useState('landing'); // 'landing', 'login', 'dashboard'
  const [user, setUser] = useState(null);

  // Giriş Başarılı Olduğunda
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setSystemView('dashboard');
  };

  // Çıkış Yapıldığında
  const handleLogout = () => {
    setUser(null);
    setSystemView('landing');
  };

  return (
    <>
      {systemView === 'landing' && <LandingPage onLoginClick={() => setSystemView('login')} />}
      {systemView === 'login' && <LoginScreen onBack={() => setSystemView('landing')} onSuccess={handleLoginSuccess} />}
      {systemView === 'dashboard' && <UserDashboard user={user} onLogout={handleLogout} />}
    </>
  );
}

// ==================================================================================
// 1. LANDING PAGE (VİTRİN - MÜŞTERİ ÇEKME ALANI)
// ==================================================================================
const LandingPage = ({ onLoginClick }) => {
  const [activePage, setActivePage] = useState('home'); 

  // --- ORTAK HEADER ---
  const PageHeader = ({ title, subtitle, icon: Icon, accentColor = "text-red-600", showBack = true }) => (
    <div className="bg-[#050505] border-b border-white/5 py-8 md:py-12 px-6 relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 ${accentColor.replace('text', 'bg')}/10 blur-[120px] rounded-full pointer-events-none animate-pulse`}></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between items-start">
          {showBack && activePage !== 'home' ? (
            <button 
              onClick={() => setActivePage('home')} 
              className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-6 text-xs font-black uppercase tracking-widest"
            >
              <ArrowLeft size={14}/> Ana Komuta
            </button>
          ) : (
            <div className="flex items-center gap-2 mb-6">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               <span className="text-[10px] font-bold text-green-500 tracking-widest uppercase">Sistem Çevrimiçi</span>
            </div>
          )}
          
          {/* Giriş Butonu (Sadece Üyeler İçin) */}
          <button 
            onClick={onLoginClick}
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
          >
            <Lock size={12}/> Panel Girişi
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className={`p-4 bg-black rounded-2xl ${accentColor} border border-white/10 shadow-2xl`}>
            <Icon size={40} strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-tight">
              {title}
            </h1>
            <p className="text-slate-400 mt-2 text-sm md:text-lg font-medium tracking-wide max-w-2xl">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // --- ANA SAYFA İÇERİĞİ ---
  const HomeSection = () => {
    // 1. Canlı Grafik Verisi Simülasyonu (Real-Time Engine)
    const [chartData, setChartData] = useState([]); 
    const [currentTicker, setCurrentTicker] = useState({ pair: 'BTC/USDT', rsi: 45.2, price: 64230.50, change: 0 });

    useEffect(() => {
      // Başlangıç verisi
      const initialData = Array.from({ length: 40 }, () => 50 + Math.random() * 10);
      setChartData(initialData);

      const interval = setInterval(() => {
        // Grafiği güncelle (Sola kaydır, sağdan yeni veri ekle)
        setChartData(prev => {
          const last = prev[prev.length - 1];
          const volatility = (Math.random() - 0.5) * 5; // Anlık hareket
          let newValue = last + volatility;
          if (newValue > 90) newValue = 90; // Sınırla
          if (newValue < 10) newValue = 10;
          return [...prev.slice(1), newValue];
        });

        // Değerleri güncelle
        setCurrentTicker(prev => {
            const move = (Math.random() - 0.5) * 25;
            return {
                ...prev,
                rsi: Math.max(10, Math.min(90, parseFloat((prev.rsi + (Math.random() - 0.5) * 3).toFixed(1)))),
                price: parseFloat((prev.price + move).toFixed(2)),
                change: move
            };
        });

      }, 100); // 100ms (Ultra akıcı canlı veri hissi)
      return () => clearInterval(interval);
    }, []);

    // SVG Path Oluşturucu
    const getPath = (data) => {
      if (data.length === 0) return "";
      const max = Math.max(...data, 100);
      const min = Math.min(...data, 0);
      const range = max - min || 1;
      
      // Veriyi 0-100 arasına normalize et ve SVG path string oluştur
      return `M0,${100 - ((data[0] - min) / range * 100)} ` + 
             data.map((val, i) => `L${(i / (data.length - 1)) * 100},${100 - ((val - min) / range * 100)}`).join(' ');
    };

    // 2. Analiz Terminali Logları (Matrix Akışı)
    const [scanLog, setScanLog] = useState([]);

    useEffect(() => {
        const operations = [
            { text: "ORDER_BOOK_SCAN", color: "text-blue-400" },
            { text: "VOLATILITY_INDEX", color: "text-purple-400" },
            { text: "WHALE_WALLET_TRACK", color: "text-yellow-400" },
            { text: "SENTIMENT_ANALYSIS", color: "text-green-400" },
            { text: "ARBITRAGE_CHECK", color: "text-slate-400" }
        ];
        
        const interval = setInterval(() => {
          const now = new Date();
          const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds().toString().padStart(3, '0')}`;
          const op = operations[Math.floor(Math.random() * operations.length)];
          const latency = Math.floor(Math.random() * 50) + 5;
          const pair = ['BTC', 'ETH', 'SOL', 'BNB'][Math.floor(Math.random() * 4)];
          
          const msg = { 
              time, 
              prefix: op.text, 
              content: `${pair}/USDT > Latency: ${latency}ms`, 
              color: op.color 
          };
          
          setScanLog(prev => [msg, ...prev.slice(0, 8)]); // Son 8 logu tut
        }, 600); // 600ms (Çok hızlı veri akışı)
        return () => clearInterval(interval);
    }, []);

    return (
      <div className="animate-fade-in pb-32 bg-[#0a0a0a] min-h-screen">
        <PageHeader 
          title="PREDATOR X PRO TRADER" 
          subtitle="Duygusuz. Hatasız. Profesyonel Al-Sat Algoritması."
          icon={Activity}
          accentColor="text-white"
          showBack={false}
        />
        
        <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
          
          {/* İstatistikler */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{icon: TrendingUp, label: "AYLIK PERFORMANS", val: "+142.5%", sub: "↑ Hedef Üstü", color: "green"},
              {icon: Users, label: "AKTİF AVCILAR", val: "1,248", sub: "+12 Yeni Üye", color: "blue"},
              {icon: Cpu, label: "SİSTEM YÜKÜ", val: "%12", sub: "Stabil: 24ms", color: "slate"}
            ].map((stat, i) => (
                <div key={i} className="bg-gradient-to-br from-slate-900 to-black p-6 rounded-2xl border border-slate-800 relative overflow-hidden group hover:border-slate-700 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><stat.icon size={80} /></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            {stat.color === 'green' && <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>}
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
                        </div>
                        <div className="text-4xl font-black text-white tracking-tighter">{stat.val}</div>
                        <div className={`text-xs text-${stat.color}-500 font-bold mt-2 bg-${stat.color}-900/20 inline-block px-2 py-1 rounded`}>{stat.sub}</div>
                    </div>
                </div>
            ))}
          </div>

          {/* FİYATLANDIRMA */}
          <div id="pricing">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter mb-4">AVCI DONANIMLARI</h2>
              <p className="text-slate-400 text-sm md:text-base">Küçük oyna ya da <span className="text-red-500 font-bold">büyük kazan.</span> Seçim senin.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                <PricingCard title="Çaylak Avcı" price="$10" period="3 Gün" theme="green" features={['Tüm Spot Pariteler', 'Sınırsız İşlem', 'Telegram Sinyal', 'Temel Analiz']} wpMessage="Merhaba, 10 Dolarlık Deneme Paketi istiyorum." />
                <PricingCard title="Trader" price="$25" period="Hafta" theme="blue" features={['Spot + Vadeli', '2x Kaldıraç', 'Trailing Stop', '7/24 Destek']} wpMessage="Merhaba, Haftalık 25 Dolarlık TRADER paketi istiyorum." />
                <PricingCard title="Usta Avcı" price="$89" period="Ay" theme="red" recommended={true} features={['4x Güvenli Kaldıraç', 'Sınırsız Tarayıcı', 'Öncelikli Emir', 'Duygu Analizi AI']} wpMessage="Merhaba, Aylık 89 Dolarlık USTA AVCI paketi istiyorum." />
                <PricingCard title="Apex Predator" price="$999" period="Süresiz" theme="gold" features={['Tek Seferlik Ödeme', 'Ömür Boyu Erişim', 'Kişiye Özel Kurulum', 'Balina Takip']} wpMessage="Merhaba, 999 Dolarlık APEX paketi istiyorum." />
            </div>
          </div>

          {/* GERÇEK ZAMANLI ANALİZ MOTORU (Live Engine) */}
          <div className="bg-black border border-slate-800 rounded-2xl overflow-hidden relative shadow-2xl">
            {/* Header Bar */}
            <div className="bg-slate-900/80 backdrop-blur px-4 py-3 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">YAPAY ZEKA ANALİZ MOTORU v3.2</span>
              </div>
              <div className="text-[10px] font-mono text-slate-500">SERVER: EU-CENTRAL-1</div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-0 h-80 md:h-96">
              {/* Sol: Canlı Grafik */}
              <div className="md:col-span-2 p-6 border-b md:border-b-0 md:border-r border-slate-800 relative bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] bg-opacity-20 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                
                {/* Radar Efekti */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-red-500/20 rounded-full animate-ping opacity-20 pointer-events-none"></div>
                
                {/* Canlı SVG Grafik */}
                <svg className="absolute bottom-0 left-0 w-full h-3/4 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Gradient Dolgu */}
                  <path d={`${getPath(chartData)} L100,100 L0,100 Z`} fill="url(#chartGradient)" opacity="0.2" />
                  {/* Ana Çizgi */}
                  <path d={getPath(chartData)} fill="none" stroke="#ef4444" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
                  <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Dinamik Veri Kartları (Üstte) */}
                <div className="relative z-10 flex gap-4">
                    <div className="bg-red-900/20 border border-red-900/50 px-3 py-1 rounded text-xs text-red-400 font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                      {currentTicker.pair}
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 px-3 py-1 rounded text-xs text-slate-400 font-mono">
                      RSI: <span className={currentTicker.rsi < 30 ? 'text-green-400' : currentTicker.rsi > 70 ? 'text-red-400' : 'text-white'}>{currentTicker.rsi}</span>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 px-3 py-1 rounded text-xs text-slate-400 font-mono">
                      FİYAT: <span className={`font-bold ${currentTicker.change > 0 ? 'text-green-400' : 'text-red-400'}`}>${currentTicker.price.toLocaleString()}</span>
                    </div>
                </div>
                
                {/* Alt Kısım - Tarama Mesajı */}
                <div className="relative z-10 text-center mt-auto mb-4">
                    <div className="inline-block bg-black/80 backdrop-blur px-6 py-2 rounded-full border border-red-500/30 shadow-lg shadow-red-900/20">
                      <span className="text-red-500 font-black animate-pulse text-xs tracking-widest">SİNYAL ARANIYOR...</span>
                    </div>
                </div>
              </div>

              {/* Sağ: Terminal Logları */}
              <div className="bg-black p-4 font-mono text-[10px] md:text-xs overflow-hidden flex flex-col">
                <div className="text-slate-500 mb-2 border-b border-slate-800 pb-1 flex justify-between">
                  <span>SİSTEM KAYITLARI (LIVE)</span>
                  <span className="text-green-500 animate-pulse">● REC</span>
                </div>
                <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
                  {scanLog.map((log, i) => (
                    <div key={i} className={`flex flex-col gap-0.5 ${i === 0 ? 'opacity-100 border-l-2 border-red-500 pl-2' : 'opacity-50'}`}>
                      <div className="flex justify-between text-slate-600">
                        <span>[{log.time}]</span>
                        <span className={log.color}>{log.prefix}</span>
                      </div>
                      <div className="text-slate-300">{log.content}</div>
                    </div>
                  ))}
                  <div className="animate-pulse text-red-500">_</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  };

  // --- PAKET KARTI ---
  const PricingCard = ({ title, price, period, features, theme, recommended, wpMessage }) => {
    const themeColors = {
      green: { border: 'border-green-900', text: 'text-green-500', bg: 'bg-green-600 hover:bg-green-500', glow: 'shadow-green-900/20' },
      blue: { border: 'border-blue-900', text: 'text-blue-500', bg: 'bg-blue-600 hover:bg-blue-500', glow: 'shadow-blue-900/20' },
      red: { border: 'border-red-600', text: 'text-red-500', bg: 'bg-red-600 hover:bg-red-500', glow: 'shadow-red-900/40' },
      gold: { border: 'border-yellow-600', text: 'text-yellow-500', bg: 'bg-yellow-600 hover:bg-yellow-500', glow: 'shadow-yellow-900/20' },
    };
    const color = themeColors[theme];
    return (
      <div className={`relative p-6 md:p-8 rounded-2xl border flex flex-col h-full transition-transform hover:-translate-y-2 duration-300 ${recommended ? `bg-gradient-to-b from-slate-900 to-black ${color.border} shadow-2xl ${color.glow} z-10` : `bg-black ${color.border} hover:border-white/20`}`}>
        {recommended && <div className={`absolute top-0 right-0 ${color.bg} text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-widest`}>En Çok Satan</div>}
        <h3 className={`text-lg md:text-xl font-black uppercase italic tracking-wider mb-2 ${color.text}`}>{title}</h3>
        <div className="flex items-baseline gap-1 mb-6"><span className="text-3xl md:text-4xl font-black text-white">{price}</span><span className="text-slate-500 font-bold text-xs uppercase">/ {period}</span></div>
        <ul className="space-y-4 mb-8 flex-1">
          {features.map((feat, i) => (
            <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-slate-400 font-medium group"><CheckCircle size={16} className={`shrink-0 mt-0.5 ${color.text} group-hover:scale-110 transition-transform`} />{feat}</li>
          ))}
        </ul>
        <button onClick={() => window.open(`https://wa.me/905375182311?text=${encodeURIComponent(wpMessage)}`, '_blank')} className={`w-full h-12 md:h-14 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all text-white text-xs md:text-sm shadow-lg ${color.glow} ${recommended ? color.bg : 'bg-slate-900 hover:bg-slate-800 border border-slate-700'}`}><Smartphone size={18} /> Satın Al</button>
      </div>
    );
  };

  // --- DİĞER SAYFALAR (Kurulum, SSS, İletişim, Yasal) ---
  const InstallationGuide = () => (
    <div className="animate-fade-in pb-32 bg-[#0a0a0a] min-h-screen">
      <PageHeader title="SİLAH AKTİVASYONU" subtitle="Sistemi Ateşleyin. Ava Başlayın." icon={Zap} accentColor="text-yellow-500"/>
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Adım 1 */}
        <div className="relative pl-8 md:pl-12 border-l-2 border-slate-800 space-y-6 pb-12 group">
          <div className="absolute -left-[21px] md:-left-[25px] top-0 w-10 h-10 md:w-12 md:h-12 bg-black border-4 border-slate-800 rounded-full flex items-center justify-center font-black text-lg md:text-xl text-yellow-500 shadow-lg z-10">1</div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase italic tracking-wide">Avcı Kimliği Oluşturma</h3>
            <p className="text-slate-400 mb-6 font-medium text-sm md:text-base">Binance hesabınıza girin ve Predator X'e <span className="text-yellow-500 font-bold">TAM YETKİ</span> verin.</p>
             <div className="bg-red-900/10 border border-red-900/30 p-4 rounded flex gap-3">
                <AlertTriangle size={20} className="text-red-500 shrink-0"/>
                <p className="text-slate-400 text-xs leading-relaxed">"Enable Withdrawals" (Para Çekme) kutucuğunu <strong className="text-white border-b border-red-500">ASLA</strong> işaretlemeyin.</p>
             </div>
          </div>
        </div>
        {/* Adım 2 */}
        <div className="relative pl-8 md:pl-12 border-l-2 border-slate-800 space-y-6 group">
          <div className="absolute -left-[21px] md:-left-[25px] top-0 w-10 h-10 md:w-12 md:h-12 bg-black border-4 border-slate-800 rounded-full flex items-center justify-center font-black text-lg md:text-xl text-yellow-500 shadow-lg z-10">2</div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase italic tracking-wide">Algoritmayı Serbest Bırak</h3>
            <div className="bg-gradient-to-br from-slate-900 to-black p-6 md:p-8 rounded-xl border border-yellow-600/30 relative overflow-hidden">
               <div className="space-y-4 mb-6">
                 <div className="h-12 md:h-14 bg-black border border-slate-800 rounded-lg w-full flex items-center px-4 text-slate-500 font-mono text-xs md:text-sm">API Key Giriniz...</div>
                 <div className="h-12 md:h-14 bg-black border border-slate-800 rounded-lg w-full flex items-center px-4 text-slate-500 font-mono text-xs md:text-sm">Secret Key Giriniz...</div>
               </div>
               <button className="w-full h-14 md:h-16 bg-yellow-600 hover:bg-yellow-500 text-black font-black text-base md:text-lg uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-yellow-900/40 hover:scale-[1.02] active:scale-[0.98]">
                  <Zap size={24} fill="currentColor"/> <span>PREDATOR MODUNU BAŞLAT</span>
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AccordionSection = ({ title, subtitle, icon, items, accentColor = "text-slate-200" }) => {
    const [openIndex, setOpenIndex] = useState(0);
    return (
      <div className="animate-fade-in pb-32 bg-[#0a0a0a] min-h-screen">
        <PageHeader title={title} subtitle={subtitle} icon={icon} accentColor={accentColor} />
        <div className="max-w-3xl mx-auto px-6 py-12 space-y-4">
          {items.map((item, i) => (
            <div key={i} className="bg-black border border-slate-800 rounded-xl overflow-hidden hover:border-slate-600 transition-all">
              <button onClick={() => setOpenIndex(openIndex === i ? -1 : i)} className="w-full p-6 flex items-center justify-between text-left font-bold text-slate-200 hover:text-white">
                <span className="text-sm md:text-base">{item.q || item.title}</span>
                {openIndex === i ? <ChevronUp className="text-slate-400"/> : <ChevronDown className="text-slate-600"/>}
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6 text-slate-400 leading-relaxed text-xs md:text-sm border-t border-slate-800/50 pt-4 bg-slate-900/20">
                  {item.a || item.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ContactHub = () => (
    <div className="animate-fade-in pb-32 bg-[#0a0a0a] min-h-screen">
      <PageHeader title="KOMUTA MERKEZİ" subtitle="Predator X Ekibine Sızın." icon={Crosshair} accentColor="text-green-500"/>
      <div className="max-w-4xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
         <div className="bg-gradient-to-br from-slate-900 to-black border border-slate-800 rounded-2xl p-8 hover:border-green-500/50 transition-all shadow-xl group">
            <div className="flex items-center gap-4 mb-6"><div className="bg-green-900/20 p-3 rounded-xl text-green-500"><Smartphone size={28} /></div><h3 className="text-xl font-black text-white uppercase italic">WhatsApp Hattı</h3></div>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">Gizli detaylar ve özel teklifler.</p>
            <button onClick={() => window.open('https://wa.me/905375182311', '_blank')} className="w-full h-14 bg-green-600 hover:bg-green-500 text-white font-black rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider shadow-lg shadow-green-900/20 hover:-translate-y-1 transition-all"><MessageCircle size={20}/> Mesaj Gönder</button>
         </div>
         <div className="bg-gradient-to-br from-slate-900 to-black border border-slate-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all shadow-xl group">
            <div className="flex items-center gap-4 mb-6"><div className="bg-blue-900/20 p-3 rounded-xl text-blue-500"><Send size={28} /></div><h3 className="text-xl font-black text-white uppercase italic">Telegram Hesabımız</h3></div>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">Birebir iletişim ve teknik destek.</p>
            <button onClick={() => window.open('https://t.me/PredatorX_Official', '_blank')} className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider shadow-lg shadow-blue-900/20 hover:-translate-y-1 transition-all"><Send size={20}/> Telegram'dan Yaz</button>
         </div>
         <div className="md:col-span-2 mt-4 bg-gradient-to-r from-slate-900 to-black border border-slate-800 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl hover:border-red-900/50 transition-all">
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="bg-slate-800 p-4 rounded-full text-red-500 border border-slate-700 hidden md:block"><ExternalLink size={24} /></div>
            <div className="text-center md:text-left w-full md:w-auto">
              <h4 className="text-xl font-black text-white uppercase tracking-wide italic">Kritik Kurulum Desteği</h4>
              <p className="text-slate-500 text-sm mt-1 font-medium">Bağlantıda sorun mu yaşıyorsunuz? Ekibimiz müdahale etsin.</p>
            </div>
          </div>
          <button onClick={() => window.open('https://wa.me/905375182311?text=Kurulum%20destegi%20istiyorum', '_blank')} className="w-full md:w-auto min-w-[280px] h-14 bg-red-600 hover:bg-red-500 text-white font-black text-sm uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-red-900/40 hover:-translate-y-1">
            Destek Talep Et <ArrowLeft className="rotate-180" size={16}/>
          </button>
        </div>
      </div>
    </div>
  );

  const NavButton = ({ id, label, icon: Icon, activeColor }) => (
    <button onClick={() => setActivePage(id)} className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-lg transition-all duration-300 ${activePage===id ? `${activeColor} bg-white/5 border-t-2` : 'text-slate-600 hover:text-slate-400'}`} style={{ borderColor: activePage === id ? 'currentColor' : 'transparent' }}>
      <Icon size={20} strokeWidth={activePage===id ? 2.5 : 2}/>
      <span className="text-[9px] font-black uppercase tracking-wider hidden md:block">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-red-600 selection:text-white flex flex-col">
      <div className="flex-1">
        {activePage === 'home' && <HomeSection />}
        {activePage === 'guide' && <InstallationGuide />}
        {activePage === 'faq' && <AccordionSection title="Sıkça Sorulan Sorular" subtitle="Şüphe zayıflıktır, bilgi güçtür." icon={HelpCircle} accentColor="text-blue-500" items={[{ q: "Paramı size mi gönderiyorum?", a: "ASLA. Paranız kendi Binance hesabınızda kalır." }, { q: "4x Kaldıraç Kilidi nedir?", a: "Sistemin maksimum 4x kaldıraç kullanmasını sağlayan güvenlik önlemidir." }, { q: "İade var mı?", a: "Evet, ilk 72 saat içinde koşulsuz iade." }]} />}
        {activePage === 'legal' && <AccordionSection title="Yasal Protokol" subtitle="Kurallar ve Sorumluluklar." icon={FileText} accentColor="text-slate-400" items={[{ title: "1. Hizmetin Doğası", content: "Bu bir yazılım aracıdır, yatırım danışmanlığı değildir." }, { title: "2. Risk Beyanı", content: "Kullanıcı tüm finansal riskleri kabul eder." }, { title: "3. İade Politikası", content: "72 saat iade garantisi." }]} />}
        {activePage === 'contact' && <ContactHub />}
      </div>
      <div className="fixed bottom-0 w-full bg-black/95 backdrop-blur-xl border-t border-slate-800 p-2 z-50 shadow-2xl safe-area-pb">
        <div className="max-w-md mx-auto flex justify-between gap-1">
          <NavButton id="home" label="Ana Komuta" icon={Home} activeColor="text-red-500" />
          <NavButton id="guide" label="Kurulum" icon={BookOpen} activeColor="text-yellow-500" />
          <NavButton id="faq" label="S.S.S" icon={HelpCircle} activeColor="text-blue-500" />
          <NavButton id="legal" label="Yasal" icon={FileText} activeColor="text-slate-400" />
          <NavButton id="contact" label="İletişim" icon={MessageCircle} activeColor="text-green-500" />
        </div>
      </div>
    </div>
  );
};

// ==================================================================================
// 2. LOGIN SCREEN (GİRİŞ EKRANI - GÜVENLİK GÜNCELLEMESİ)
// ==================================================================================
const LoginScreen = ({ onBack, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // --- GÜVENLİK SİMÜLASYONU ---
    setTimeout(() => {
      if (email === 'demo' && password === '1234') {
        onSuccess({ name: "Demo Avcı", plan: "USTA AVCI (PRO)", expiry: "30 Gün", balance: 5000.00 });
      } else {
        setError("Erişim Reddedildi: Kayıt bulunamadı veya üyelik aktif değil.");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent animate-pulse"></div>
      <div className="w-full max-w-md bg-black border border-slate-800 p-8 rounded-2xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-red-900/20 rounded-xl border border-red-900/50 mb-4 text-red-600"><Crosshair size={32} /></div>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-wider">Avcı Girişi</h2>
          <p className="text-slate-500 text-sm mt-2">Sadece yetkili personel giriş yapabilir.</p>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-900/50 p-4 rounded-lg flex items-start gap-3 mb-6 animate-pulse">
            <XCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
            <span className="text-red-400 text-xs font-bold">{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Kullanıcı Kimliği</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-12 bg-slate-900/50 border border-slate-800 rounded-lg px-4 text-white focus:border-red-600 outline-none" placeholder="ID Giriniz" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Erişim Şifresi</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-12 bg-slate-900/50 border border-slate-800 rounded-lg px-4 text-white focus:border-red-600 outline-none" placeholder="••••••••••••" />
          </div>
          <button type="submit" disabled={isLoading} className="w-full h-14 bg-red-600 hover:bg-red-500 text-white font-black text-lg uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/20">
            {isLoading ? <RefreshCw className="animate-spin" /> : <Lock size={20} />} {isLoading ? 'Doğrulanıyor...' : 'Panele Sız'}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-xs mb-3">Hesabınız yok mu?</p>
          <button onClick={() => window.open('https://wa.me/905375182311?text=Hesap%20satin%20almak%20istiyorum', '_blank')} className="text-green-500 hover:text-green-400 font-bold text-sm flex items-center justify-center gap-2 transition-colors">
            <MessageCircle size={16}/> WhatsApp'tan Satın Alın
          </button>
        </div>

        <div className="mt-6 text-center"><button onClick={onBack} className="text-slate-500 text-xs hover:text-white transition-colors">← Ana Ekrana Dön</button></div>
      </div>
    </div>
  );
};

// ==================================================================================
// 3. USER DASHBOARD (BOT PANELİ)
// ==================================================================================
const UserDashboard = ({ user, onLogout }) => {
  const [botActive, setBotActive] = useState(false);
  const [logs, setLogs] = useState([]);
  
  useEffect(() => {
    let interval;
    if (botActive) {
      interval = setInterval(() => {
        const actions = [{ msg: "BTC/USDT taranıyor...", type: "info" }, { msg: "ETH Pozitif (%85).", type: "success" }, { msg: "SOL Destek testi.", type: "warning" }];
        const action = actions[Math.floor(Math.random() * actions.length)];
        setLogs(prev => [{ time: new Date().toLocaleTimeString(), ...action }, ...prev.slice(0, 6)]);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [botActive]);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 flex flex-col md:flex-row font-sans selection:bg-red-600">
      <div className="w-full md:w-72 border-r border-slate-800 bg-black flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-black"><Crosshair size={24} /></div>
          <div><h1 className="font-black text-white italic tracking-tighter text-xl">PREDATOR X</h1><span className="text-[10px] text-red-500 font-bold tracking-widest bg-red-900/10 px-1 rounded">PRO PANEL</span></div>
        </div>
        <div className="p-4 border-t border-slate-800 mt-auto">
          <div className="bg-slate-900 rounded-xl p-4 mb-4"><div className="text-xs text-slate-500 mb-1">Kullanıcı</div><div className="font-bold text-white flex items-center gap-2"><Crown size={14} className="text-yellow-500" fill="currentColor"/> {user.name}</div></div>
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-red-500 text-sm font-bold py-2"><LogOut size={16} /> Çıkış Yap</button>
        </div>
      </div>
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 border-b border-slate-800 bg-black/50 backdrop-blur flex items-center justify-between px-8">
          <div className="flex items-center gap-2"><div className={`w-3 h-3 rounded-full ${botActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div><span className="text-xs font-bold text-slate-400 tracking-wider">SİSTEM: {botActive ? 'AKTİF' : 'BEKLEMEDE'}</span></div>
        </header>
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-black border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-black text-white uppercase italic tracking-wide mb-6 flex items-center gap-2"><Terminal size={20} className="text-red-600"/> Komuta Paneli</h3>
              <div className="space-y-4 mb-6">
                <input type="text" placeholder="API Key" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none" />
                <input type="password" placeholder="Secret Key" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none" />
              </div>
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 font-mono text-xs overflow-y-auto mb-6 h-32 custom-scrollbar">
                {logs.map((log, i) => (<div key={i} className="mb-2 flex gap-2"><span className="text-slate-500">[{log.time}]</span><span className={log.type === 'success' ? 'text-green-400' : 'text-blue-400'}>{log.msg}</span></div>))}
                {botActive && <div className="animate-pulse text-red-500">_</div>}
              </div>
              <button onClick={() => setBotActive(!botActive)} className={`w-full py-4 rounded-xl font-black text-lg uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg ${botActive ? 'bg-red-900/20 text-red-500 border border-red-900' : 'bg-green-600 text-white hover:bg-green-500'}`}>{botActive ? <><Pause fill="currentColor" /> DURDUR</> : <><Play fill="currentColor" /> PREDATOR MODUNU BAŞLAT</>}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
