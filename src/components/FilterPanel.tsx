import { X } from 'lucide-react';
import type { Theme, Region, Difficulty, Season } from '../types/mountain';
import {
  THEME_LABELS, THEME_ICONS,
  REGION_LABELS,
  DIFFICULTY_LABELS, DIFFICULTY_COLORS,
  SEASON_LABELS,
} from '../types/mountain';
import type { SearchFilters } from '../types/mountain';

interface FilterPanelProps {
  filters: SearchFilters;
  onToggleTheme: (t: Theme) => void;
  onToggleRegion: (r: Region) => void;
  onToggleDifficulty: (d: Difficulty) => void;
  onSetIs100Famous: (v: boolean | null) => void;
  onSetIsNationalPark: (v: boolean | null) => void;
  onSetBestSeason: (s: Season | null) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

const ALL_THEMES: Theme[] = ['sunrise', 'snow', 'autumn', 'sea_of_clouds', 'valley', 'coastal', 'rocky', 'flower'];
const ALL_REGIONS: Region[] = ['seoul', 'gyeonggi', 'gangwon', 'chungbuk', 'chungnam', 'jeonbuk', 'jeonnam', 'gyeongbuk', 'gyeongnam', 'jeju', 'busan', 'daegu'];
const ALL_DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard', 'expert'];
const ALL_SEASONS: Season[] = ['spring', 'summer', 'autumn', 'winter'];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{children}</h3>;
}

export function FilterPanel({
  filters,
  onToggleTheme,
  onToggleRegion,
  onToggleDifficulty,
  onSetIs100Famous,
  onSetIsNationalPark,
  onSetBestSeason,
  onClear,
  hasActiveFilters,
}: FilterPanelProps) {
  return (
    <div className="space-y-5">
      {/* 필터 헤더 */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-white">필터</span>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-400 transition-colors"
          >
            <X size={12} />
            초기화
          </button>
        )}
      </div>

      {/* 테마 */}
      <div>
        <SectionTitle>테마</SectionTitle>
        <div className="flex flex-wrap gap-1.5">
          {ALL_THEMES.map((theme) => {
            const active = filters.themes.includes(theme);
            return (
              <button
                key={theme}
                onClick={() => onToggleTheme(theme)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                  active
                    ? 'bg-emerald-500 text-white border-emerald-400'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                {THEME_ICONS[theme]} {THEME_LABELS[theme]}
              </button>
            );
          })}
        </div>
      </div>

      {/* 난이도 */}
      <div>
        <SectionTitle>난이도</SectionTitle>
        <div className="flex flex-wrap gap-1.5">
          {ALL_DIFFICULTIES.map((d) => {
            const active = filters.difficulties.includes(d);
            return (
              <button
                key={d}
                onClick={() => onToggleDifficulty(d)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                  active
                    ? 'bg-emerald-500 text-white border-emerald-400'
                    : `${DIFFICULTY_COLORS[d]} border-transparent hover:border-white/20`
                }`}
              >
                {DIFFICULTY_LABELS[d]}
              </button>
            );
          })}
        </div>
      </div>

      {/* 계절 */}
      <div>
        <SectionTitle>최적 계절</SectionTitle>
        <div className="flex flex-wrap gap-1.5">
          {ALL_SEASONS.map((s) => {
            const active = filters.bestSeason === s;
            const icons: Record<Season, string> = { spring: '🌸', summer: '☀️', autumn: '🍂', winter: '❄️' };
            return (
              <button
                key={s}
                onClick={() => onSetBestSeason(active ? null : s)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                  active
                    ? 'bg-emerald-500 text-white border-emerald-400'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                {icons[s]} {SEASON_LABELS[s]}
              </button>
            );
          })}
        </div>
      </div>

      {/* 지역 */}
      <div>
        <SectionTitle>지역</SectionTitle>
        <div className="flex flex-wrap gap-1.5">
          {ALL_REGIONS.map((r) => {
            const active = filters.regions.includes(r);
            return (
              <button
                key={r}
                onClick={() => onToggleRegion(r)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                  active
                    ? 'bg-emerald-500 text-white border-emerald-400'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                {REGION_LABELS[r]}
              </button>
            );
          })}
        </div>
      </div>

      {/* 구분 */}
      <div>
        <SectionTitle>구분</SectionTitle>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onSetIs100Famous(filters.is100Famous === true ? null : true)}
            className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
              filters.is100Famous === true
                ? 'bg-yellow-500 text-black border-yellow-400 font-semibold'
                : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20 hover:text-white'
            }`}
          >
            🏆 100대 명산
          </button>
          <button
            onClick={() => onSetIsNationalPark(filters.isNationalPark === true ? null : true)}
            className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
              filters.isNationalPark === true
                ? 'bg-emerald-500 text-white border-emerald-400 font-semibold'
                : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20 hover:text-white'
            }`}
          >
            🌲 국립공원
          </button>
        </div>
      </div>
    </div>
  );
}
