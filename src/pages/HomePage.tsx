import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Mountain, Trophy, TrendingUp } from 'lucide-react';
import { getFeaturedMountains, getThemeShowcase, getMountainStats } from '../services/mountainService';
import { MountainCard } from '../components/MountainCard';
import { ThemeTag } from '../components/ThemeTag';
import type { Theme } from '../types/mountain';

export function HomePage() {
  const navigate = useNavigate();
  const featured = getFeaturedMountains();
  const themeShowcase = getThemeShowcase();
  const stats = getMountainStats();

  const handleThemeClick = (theme: Theme) => {
    navigate(`/search?theme=${theme}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 md:py-8 space-y-10 md:space-y-16">

      {/* 히어로 */}
      <section className="text-center py-8 md:py-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm mb-6">
          <Mountain size={14} />
          전국 등산 정보 모음
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          당신의 다음<br />
          <span className="text-emerald-400">산행</span>을 찾아보세요
        </h1>
        <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
          100대 명산부터 일출·운해·단풍·설산 테마별 명소까지.<br />
          지역과 난이도로 나에게 맞는 산을 찾아보세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/search"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            산 검색하기
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/search?famous=true"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-medium px-6 py-3 rounded-xl border border-white/10 transition-colors"
          >
            <Trophy size={16} className="text-yellow-400" />
            100대 명산 보기
          </Link>
        </div>
      </section>

      {/* 통계 */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: '전체 산', value: stats.total, unit: '개', icon: '🏔️' },
          { label: '100대 명산', value: stats.famous100, unit: '개', icon: '🏆' },
          { label: '등산 테마', value: 8, unit: '종', icon: '🎯' },
          { label: '전국 지역', value: 13, unit: '개', icon: '📍' },
        ].map(({ label, value, unit, icon }) => (
          <div key={label} className="bg-gray-900/60 border border-white/5 rounded-2xl p-5 text-center">
            <div className="text-2xl mb-2">{icon}</div>
            <div className="text-2xl font-bold text-white">
              {value}<span className="text-sm text-gray-400 ml-1">{unit}</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">{label}</div>
          </div>
        ))}
      </section>

      {/* 테마별 탐색 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">테마별 산행</h2>
            <p className="text-gray-400 text-sm">원하는 테마로 나에게 맞는 산을 찾아보세요</p>
          </div>
        </div>
        <div className="space-y-8">
          {themeShowcase.map(({ theme, mountains }) => (
            <div key={theme}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ThemeTag
                    theme={theme}
                    onClick={() => handleThemeClick(theme)}
                  />
                  <span className="text-gray-500 text-sm">{mountains.length}개 이상</span>
                </div>
                <button
                  onClick={() => handleThemeClick(theme)}
                  className="text-sm text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  더보기 <ArrowRight size={14} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {mountains.map((m) => (
                  <MountainCard key={m.id} mountain={m} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 추천 명산 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">대표 명산</h2>
            <p className="text-gray-400 text-sm">꼭 한 번은 올라야 할 한국의 대표 산들</p>
          </div>
          <Link
            to="/search?famous=true"
            className="text-sm text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
          >
            전체보기 <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.slice(0, 6).map((m) => (
            <MountainCard key={m.id} mountain={m} />
          ))}
        </div>
      </section>

      {/* 초보자 추천 */}
      <section className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border border-emerald-500/20 rounded-2xl p-8">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🌱</div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-2">등산 처음이세요?</h2>
            <p className="text-gray-400 text-sm mb-4">
              초급·중급 코스로 첫 산행을 시작해보세요. 곤돌라를 이용해 쉽게 오를 수 있는 산도 있어요.
            </p>
            <Link
              to="/search?difficulty=easy"
              className="inline-flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-medium px-4 py-2 rounded-lg border border-emerald-500/30 transition-colors text-sm"
            >
              <TrendingUp size={14} />
              초보자 추천 산 보기
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
