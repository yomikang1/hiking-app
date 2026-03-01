import type { Theme } from '../types/mountain';
import { THEME_LABELS, THEME_ICONS } from '../types/mountain';

interface ThemeTagProps {
  theme: Theme;
  active?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
}

const THEME_COLORS: Record<Theme, string> = {
  sunrise: 'bg-orange-500/20 text-orange-300 border-orange-500/30 hover:bg-orange-500/30',
  snow: 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30',
  autumn: 'bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30',
  sea_of_clouds: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/30',
  valley: 'bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/30',
  coastal: 'bg-teal-500/20 text-teal-300 border-teal-500/30 hover:bg-teal-500/30',
  rocky: 'bg-stone-500/20 text-stone-300 border-stone-500/30 hover:bg-stone-500/30',
  flower: 'bg-pink-500/20 text-pink-300 border-pink-500/30 hover:bg-pink-500/30',
};

const ACTIVE_COLORS: Record<Theme, string> = {
  sunrise: 'bg-orange-500 text-white border-orange-400',
  snow: 'bg-blue-500 text-white border-blue-400',
  autumn: 'bg-red-500 text-white border-red-400',
  sea_of_clouds: 'bg-cyan-500 text-white border-cyan-400',
  valley: 'bg-green-500 text-white border-green-400',
  coastal: 'bg-teal-500 text-white border-teal-400',
  rocky: 'bg-stone-500 text-white border-stone-400',
  flower: 'bg-pink-500 text-white border-pink-400',
};

export function ThemeTag({ theme, active = false, onClick, size = 'md' }: ThemeTagProps) {
  const baseClass = `inline-flex items-center gap-1 border rounded-full font-medium transition-all cursor-pointer select-none`;
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';
  const colorClass = active ? ACTIVE_COLORS[theme] : THEME_COLORS[theme];

  return (
    <span
      className={`${baseClass} ${sizeClass} ${colorClass}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      <span>{THEME_ICONS[theme]}</span>
      <span>{THEME_LABELS[theme]}</span>
    </span>
  );
}
