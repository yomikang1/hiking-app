import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import { useFavorites } from '../hooks/useFavorites';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { MountainCard } from '../components/MountainCard';
import type { Theme, Difficulty } from '../types/mountain';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const { toggleFavorite, isFavorite } = useFavorites();
  const {
    filters,
    results,
    hasActiveFilters,
    setQuery,
    toggleTheme,
    toggleRegion,
    toggleDifficulty,
    setIs100Famous,
    setIsNationalPark,
    setBestSeason,
    clearFilters,
  } = useSearch();

  // URL 파라미터로 초기 필터 적용
  useEffect(() => {
    const theme = searchParams.get('theme') as Theme | null;
    const famous = searchParams.get('famous');
    const difficulty = searchParams.get('difficulty') as Difficulty | null;

    if (theme) toggleTheme(theme);
    if (famous === 'true') setIs100Famous(true);
    if (difficulty) toggleDifficulty(difficulty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 md:py-8">
      <div className="mb-4 md:mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">산 검색</h1>
        <p className="text-gray-400 text-sm">테마, 지역, 난이도로 나에게 맞는 산을 찾아보세요</p>
      </div>

      {/* 검색바 */}
      <div className="mb-6">
        <SearchBar value={filters.query} onChange={setQuery} />
      </div>

      <div className="flex gap-8">
        {/* 사이드바 필터 (데스크탑) */}
        <aside className="hidden lg:block w-60 flex-shrink-0">
          <div className="sticky top-24 bg-gray-900/40 border border-white/5 rounded-2xl p-5">
            <FilterPanel
              filters={filters}
              onToggleTheme={toggleTheme}
              onToggleRegion={toggleRegion}
              onToggleDifficulty={toggleDifficulty}
              onSetIs100Famous={setIs100Famous}
              onSetIsNationalPark={setIsNationalPark}
              onSetBestSeason={setBestSeason}
              onClear={clearFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        </aside>

        {/* 메인 결과 */}
        <main className="flex-1 min-w-0">
          {/* 모바일 필터 (토글) */}
          <div className="lg:hidden mb-4">
            <details className="bg-gray-900/40 border border-white/5 rounded-2xl">
              <summary className="px-4 py-3 flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                <SlidersHorizontal size={15} />
                필터 {hasActiveFilters && <span className="bg-emerald-500 text-white text-xs px-1.5 rounded-full">on</span>}
              </summary>
              <div className="px-4 pb-4">
                <FilterPanel
                  filters={filters}
                  onToggleTheme={toggleTheme}
                  onToggleRegion={toggleRegion}
                  onToggleDifficulty={toggleDifficulty}
                  onSetIs100Famous={setIs100Famous}
                  onSetIsNationalPark={setIsNationalPark}
                  onSetBestSeason={setBestSeason}
                  onClear={clearFilters}
                  hasActiveFilters={hasActiveFilters}
                />
              </div>
            </details>
          </div>

          {/* 결과 헤더 */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-400">
              <span className="text-white font-semibold">{results.length}</span>개의 산을 찾았습니다
            </span>
          </div>

          {/* 결과 그리드 */}
          {results.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-400 mb-2">검색 결과가 없습니다</p>
              <button
                onClick={clearFilters}
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                필터 초기화
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {results.map((m) => (
                <MountainCard
                  key={m.id}
                  mountain={m}
                  isFavorite={isFavorite(m.id)}
                  onToggleFavorite={(id, e) => { e.preventDefault(); toggleFavorite(id); }}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
