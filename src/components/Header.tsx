import { Link, useLocation } from 'react-router-dom';
import { Mountain, Search, Home, BookMarked, RefreshCw, Map } from 'lucide-react';

export function Header() {
  const location = useLocation();

  const navItems = [
    { to: '/', label: '홈', icon: Home },
    { to: '/search', label: '검색', icon: Search },
    { to: '/map', label: '지도', icon: Map },
    { to: '/my', label: '내 산', icon: BookMarked },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gray-950/95 border-b border-white/5 safe-top" style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* 로고 */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <Mountain size={18} className="text-emerald-400" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            산<span className="text-emerald-400">길</span>
          </span>
        </Link>

        {/* 네비게이션 + 새로고침 */}
        <div className="flex items-center gap-1">
          {/* 데스크탑 nav (모바일은 하단 탭바가 담당) */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to ||
                (to === '/search' && (location.pathname.startsWith('/search') || location.pathname.startsWith('/mountain'))) ||
                (to === '/map' && location.pathname.startsWith('/map')) ||
                (to === '/my' && location.pathname.startsWith('/my'));
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </Link>
              );
            })}
          </nav>
          {/* 새로고침 버튼 (모바일/데스크탑 모두 표시) */}
          <button
            onClick={() => window.location.reload()}
            className="p-2.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all"
            title="새로고침"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
