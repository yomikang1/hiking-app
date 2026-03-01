import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, Search, BookMarked, Map } from 'lucide-react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { MountainDetailPage } from './pages/MountainDetailPage';
import { MyMountainsPage } from './pages/MyMountainsPage';

const MapPage = lazy(() => import('./pages/MapPage').then((m) => ({ default: m.MapPage })));

function MobileBottomNav() {
  const location = useLocation();
  const navItems = [
    { to: '/', label: '홈', icon: Home },
    { to: '/search', label: '검색', icon: Search },
    { to: '/map', label: '지도', icon: Map },
    { to: '/my', label: '내 산', icon: BookMarked },
  ];
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-950/95 backdrop-blur-md border-t border-white/5 z-50 pb-safe">
      <div className="flex">
        {navItems.map(({ to, label, icon: Icon }) => {
          const isActive = location.pathname === to ||
            (to === '/search' && (location.pathname.startsWith('/search') || location.pathname.startsWith('/mountain'))) ||
            (to === '/map' && location.pathname.startsWith('/map')) ||
            (to === '/my' && location.pathname.startsWith('/my'));
          return (
            <Link
              key={to}
              to={to}
              className={`flex-1 flex flex-col items-center py-3 gap-1 text-xs font-medium transition-colors ${
                isActive ? 'text-emerald-400' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Icon size={22} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function AppContent() {
  const location = useLocation();
  const isMapPage = location.pathname === '/map';

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Header />
      <main className={`flex-1 ${isMapPage ? '' : 'pb-nav-safe md:pb-0'}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/mountain/:id" element={<MountainDetailPage />} />
          <Route path="/map" element={
            <Suspense fallback={<div className="flex items-center justify-center h-64 text-gray-500 text-sm">지도 로딩 중...</div>}>
              <MapPage />
            </Suspense>
          } />
          <Route path="/my" element={<MyMountainsPage />} />
        </Routes>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
