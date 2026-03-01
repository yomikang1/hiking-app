import { Mountain } from 'lucide-react';

export function Footer() {
  return (
    <footer className="hidden md:block mt-20 border-t border-white/5 py-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <Mountain size={15} className="text-emerald-400" />
          </div>
          <span className="text-white font-bold">산<span className="text-emerald-400">길</span></span>
        </div>
        <p className="text-gray-600 text-xs text-center">
          전국 등산 정보 모음 · 100대 명산 · 일출·운해·단풍·설산 테마 산행
        </p>
        <p className="text-gray-700 text-xs">
          산행 전 기상·입산 정보를 반드시 확인하세요
        </p>
      </div>
    </footer>
  );
}
