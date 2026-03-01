import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import type { Mountain } from '../types/mountain';
import { SEASON_ICONS, SEASON_LABELS } from '../types/mountain';
import { ThemeTag } from './ThemeTag';
import { DifficultyBadge } from './DifficultyBadge';
import { MapPin, Mountain as MountainIcon, Trees } from 'lucide-react';

interface MountainCardProps {
  mountain: Mountain;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string, e: React.MouseEvent) => void;
}

function getCardGradient(heightM: number): string {
  if (heightM >= 1500) return 'from-slate-800/80 to-gray-900';
  if (heightM >= 1000) return 'from-zinc-800/80 to-gray-900';
  return 'from-neutral-800/60 to-gray-900';
}

function getHeightColor(heightM: number): string {
  if (heightM >= 1500) return 'text-purple-400';
  if (heightM >= 1000) return 'text-blue-400';
  return 'text-emerald-400';
}

export function MountainCard({ mountain, isFavorite, onToggleFavorite }: MountainCardProps) {
  return (
    <Link
      to={`/mountain/${mountain.id}`}
      className={`relative block bg-gradient-to-br ${getCardGradient(mountain.heightM)} border border-white/10 rounded-2xl p-5 hover:border-emerald-500/30 md:hover:scale-[1.02] transition-colors duration-200 group`}
    >
      {/* 즐겨찾기 버튼 */}
      {onToggleFavorite && (
        <button
          onClick={(e) => onToggleFavorite(mountain.id, e)}
          className={`absolute top-3 right-3 p-1.5 rounded-full transition-all z-10 ${
            isFavorite
              ? 'text-red-400 bg-red-500/10'
              : 'text-gray-600 hover:text-red-400 hover:bg-red-500/10'
          }`}
          title={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
        >
          <Heart size={15} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      )}

      {/* 배지 줄 */}
      <div className="flex items-center gap-1.5 mb-3 flex-wrap">
        {mountain.is100Famous && (
          <span className="text-xs px-1.5 py-0.5 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded font-medium">
            🏆 100대
          </span>
        )}
        {mountain.isNationalPark && (
          <span className="text-xs px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded font-medium flex items-center gap-0.5">
            <Trees size={10} />
            국립공원
          </span>
        )}
        <DifficultyBadge difficulty={mountain.difficulty} size="sm" />
      </div>

      {/* 이름 + 고도 */}
      <div className="flex items-start justify-between mb-1">
        <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">
          {mountain.name}
        </h3>
        <span className={`text-lg font-bold ${getHeightColor(mountain.heightM)} ml-2 flex-shrink-0`}>
          {mountain.heightM.toLocaleString()}m
        </span>
      </div>

      {/* 지역 */}
      <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
        <MapPin size={11} />
        {mountain.provinces[0]}
      </div>

      {/* 설명 */}
      <p className="text-xs text-gray-400 leading-relaxed mb-3 line-clamp-2">
        {mountain.description}
      </p>

      {/* 추천 시기 */}
      <div className="flex items-center gap-1 mb-3">
        <span className="text-xs text-gray-600 mr-0.5">추천</span>
        {mountain.bestSeasons.map((s) => (
          <span key={s} title={SEASON_LABELS[s]} className="text-xs px-1.5 py-0.5 bg-white/5 text-gray-400 rounded border border-white/5">
            {SEASON_ICONS[s]} {SEASON_LABELS[s]}
          </span>
        ))}
      </div>

      {/* 테마 태그 */}
      <div className="flex flex-wrap gap-1 mb-3">
        {mountain.themes.slice(0, 3).map((theme) => (
          <ThemeTag key={theme} theme={theme} size="sm" />
        ))}
      </div>

      {/* 하단 */}
      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-600">
        <span className="flex items-center gap-1">
          <MountainIcon size={11} />
          코스 {mountain.courses.length}개
        </span>
        <span className="text-emerald-500/60 group-hover:text-emerald-400 transition-colors">
          자세히 →
        </span>
      </div>
    </Link>
  );
}
