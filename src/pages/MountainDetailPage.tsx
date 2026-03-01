import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mountain, MapPin, Clock, Route, ChevronRight } from 'lucide-react';
import { getMountainById } from '../services/mountainService';
import { ThemeTag } from '../components/ThemeTag';
import { DifficultyBadge } from '../components/DifficultyBadge';
import { REGION_LABELS, SEASON_LABELS, DIFFICULTY_LABELS } from '../types/mountain';
import type { Season } from '../types/mountain';

const SEASON_ICONS: Record<Season, string> = {
  spring: '🌸',
  summer: '☀️',
  autumn: '🍂',
  winter: '❄️',
};

export function MountainDetailPage() {
  const { id } = useParams<{ id: string }>();
  const mountain = id ? getMountainById(id) : undefined;

  if (!mountain) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">🏔️</div>
        <h2 className="text-xl font-bold text-white mb-2">산을 찾을 수 없습니다</h2>
        <Link to="/search" className="text-emerald-400 hover:underline text-sm">
          검색으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 뒤로가기 */}
      <Link
        to="/search"
        className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm mb-6"
      >
        <ArrowLeft size={15} />
        목록으로
      </Link>

      {/* 헤더 */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 rounded-2xl p-8 mb-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">{mountain.name}</h1>
              {mountain.nameEn && (
                <span className="text-gray-500 text-lg">{mountain.nameEn}</span>
              )}
              {mountain.is100Famous && (
                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-lg text-sm font-medium">
                  🏆 100대 명산
                </span>
              )}
            </div>

            <div className="flex items-center flex-wrap gap-4 text-gray-400 text-sm">
              <span className="flex items-center gap-1.5">
                <Mountain size={15} />
                <span className="text-white font-semibold">{mountain.heightM.toLocaleString()}m</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={15} />
                {mountain.provinces.join(' · ')}
              </span>
            </div>
          </div>
          <DifficultyBadge difficulty={mountain.difficulty} />
        </div>

        {/* 테마 */}
        <div className="flex flex-wrap gap-2 mt-5">
          {mountain.themes.map((theme) => (
            <ThemeTag key={theme} theme={theme} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 왼쪽 - 설명, 코스 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 소개 */}
          <section className="bg-gray-900/60 border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3">산 소개</h2>
            <p className="text-gray-300 leading-relaxed text-sm">{mountain.description}</p>

            {mountain.features.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-400 mb-2">주요 특징</h3>
                <div className="flex flex-wrap gap-2">
                  {mountain.features.map((f) => (
                    <span key={f} className="text-xs px-2.5 py-1 bg-white/5 text-gray-300 rounded-full border border-white/10">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* 등산 코스 */}
          <section className="bg-gray-900/60 border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">등산 코스</h2>
            <div className="space-y-4">
              {mountain.courses.map((course, i) => (
                <div
                  key={i}
                  className="border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-semibold text-white text-sm">{course.name}</h3>
                    <DifficultyBadge difficulty={course.difficulty} size="sm" />
                  </div>
                  <p className="text-xs text-gray-400 mb-3">{course.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Route size={12} />
                      {course.distanceKm}km
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {Math.floor(course.durationMin / 60)}시간
                      {course.durationMin % 60 > 0 && ` ${course.durationMin % 60}분`}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {course.startPoint}
                    </span>
                  </div>
                  {course.highlight && (
                    <div className="mt-2 text-xs text-emerald-400">
                      ✨ {course.highlight}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 팁 */}
          {mountain.tips && mountain.tips.length > 0 && (
            <section className="bg-amber-900/20 border border-amber-500/20 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-3">💡 산행 팁</h2>
              <ul className="space-y-2">
                {mountain.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <ChevronRight size={15} className="text-amber-400 mt-0.5 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* 오른쪽 - 정보 요약 */}
        <div className="space-y-4">
          {/* 기본 정보 */}
          <div className="bg-gray-900/60 border border-white/5 rounded-2xl p-5">
            <h2 className="text-sm font-bold text-white mb-4">기본 정보</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">높이</dt>
                <dd className="text-white font-medium">{mountain.heightM.toLocaleString()}m</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">지역</dt>
                <dd className="text-white">{REGION_LABELS[mountain.region]}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">난이도</dt>
                <dd className="text-white">{DIFFICULTY_LABELS[mountain.difficulty]}</dd>
              </div>
              {mountain.nearbyCity && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">인근 도시</dt>
                  <dd className="text-white">{mountain.nearbyCity}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-gray-500">코스 수</dt>
                <dd className="text-white">{mountain.courses.length}개</dd>
              </div>
            </dl>
          </div>

          {/* 최적 계절 */}
          <div className="bg-gray-900/60 border border-white/5 rounded-2xl p-5">
            <h2 className="text-sm font-bold text-white mb-3">최적 계절</h2>
            <div className="flex flex-wrap gap-2">
              {mountain.bestSeasons.map((s) => (
                <span
                  key={s}
                  className="text-xs px-2.5 py-1.5 bg-white/5 text-gray-300 rounded-lg border border-white/10"
                >
                  {SEASON_ICONS[s]} {SEASON_LABELS[s]}
                </span>
              ))}
            </div>
          </div>

          {/* 태그 */}
          <div className="bg-gray-900/60 border border-white/5 rounded-2xl p-5">
            <h2 className="text-sm font-bold text-white mb-3">태그</h2>
            <div className="flex flex-wrap gap-1.5">
              {mountain.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 bg-white/5 text-gray-400 rounded border border-white/5">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
