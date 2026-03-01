import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Calendar, FileText, ChevronRight, Trash2, Heart } from 'lucide-react';
import { useVisitLog } from '../hooks/useVisitLog';
import { useFavorites } from '../hooks/useFavorites';
import { getMountainById } from '../services/mountainService';
import { DifficultyBadge } from '../components/DifficultyBadge';
import { ThemeTag } from '../components/ThemeTag';

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}.`;
}

type Tab = 'visits' | 'favorites';

export function MyMountainsPage() {
  const { logs, visitedMountainIds, removeVisit } = useVisitLog();
  const { favoriteIds, toggleFavorite } = useFavorites();
  const [activeTab, setActiveTab] = useState<Tab>('visits');

  const isEmpty = visitedMountainIds.length === 0 && favoriteIds.length === 0;

  if (isEmpty) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">🏔️</div>
        <h2 className="text-xl font-bold text-white mb-2">아직 기록된 산행이 없습니다</h2>
        <p className="text-gray-400 text-sm mb-6">
          산 상세 페이지에서 방문 기록을 추가하거나 즐겨찾기해보세요
        </p>
        <Link
          to="/search"
          className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
        >
          산 찾기
          <ChevronRight size={15} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 md:py-8">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">내 산</h1>
        <p className="text-gray-400 text-sm">방문한 산과 즐겨찾기를 모아볼 수 있습니다</p>
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gray-900/60 border border-white/5 rounded-2xl p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400 mb-1">{visitedMountainIds.length}</div>
          <div className="text-xs text-gray-400">등정한 산</div>
        </div>
        <div className="bg-gray-900/60 border border-white/5 rounded-2xl p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400 mb-1">{logs.length}</div>
          <div className="text-xs text-gray-400">총 산행 횟수</div>
        </div>
        <div className="bg-gray-900/60 border border-white/5 rounded-2xl p-4 text-center">
          <div className="text-2xl font-bold text-red-400 mb-1">{favoriteIds.length}</div>
          <div className="text-xs text-gray-400">즐겨찾기</div>
        </div>
      </div>

      {/* 탭 */}
      <div className="flex gap-1 bg-gray-900/40 border border-white/5 rounded-xl p-1 mb-6">
        <button
          onClick={() => setActiveTab('visits')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'visits'
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Calendar size={14} />
          방문 기록
          {logs.length > 0 && (
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === 'visits' ? 'bg-emerald-500/20' : 'bg-white/10'}`}>
              {logs.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'favorites'
              ? 'bg-red-500/20 text-red-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Heart size={14} fill={activeTab === 'favorites' ? 'currentColor' : 'none'} />
          즐겨찾기
          {favoriteIds.length > 0 && (
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === 'favorites' ? 'bg-red-500/20' : 'bg-white/10'}`}>
              {favoriteIds.length}
            </span>
          )}
        </button>
      </div>

      {/* 방문 기록 탭 */}
      {activeTab === 'visits' && (
        <>
          {visitedMountainIds.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm mb-4">아직 방문 기록이 없습니다</p>
              <Link to="/search" className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors">
                산 찾아보기 →
              </Link>
            </div>
          ) : (
            <>
              {/* 방문한 산 목록 */}
              <div className="space-y-4">
                {visitedMountainIds.map((mountainId) => {
                  const mountain = getMountainById(mountainId);
                  const mountainLogs = logs.filter((l) => l.mountainId === mountainId)
                    .sort((a, b) => b.visitDate.localeCompare(a.visitDate));
                  if (!mountain) return null;

                  return (
                    <div
                      key={mountainId}
                      className="bg-gray-900/60 border border-white/5 rounded-2xl overflow-hidden"
                    >
                      <Link
                        to={`/mountain/${mountainId}`}
                        className="flex items-center justify-between p-4 md:p-5 hover:bg-white/5 transition-colors group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                            <Mountain size={20} className="text-emerald-400" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors">
                                {mountain.name}
                              </h3>
                              <span className="text-xs text-gray-500">{mountain.heightM.toLocaleString()}m</span>
                              {mountain.is100Famous && (
                                <span className="text-xs px-1.5 py-0.5 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded">
                                  🏆 100대
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <DifficultyBadge difficulty={mountain.difficulty} size="sm" />
                              <div className="flex gap-1">
                                {mountain.themes.slice(0, 2).map((t) => (
                                  <ThemeTag key={t} theme={t} size="sm" />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-3">
                          <div className="text-xs text-gray-500 mb-1">{mountainLogs.length}회 방문</div>
                          <div className="text-xs text-emerald-500">상세보기 →</div>
                        </div>
                      </Link>

                      <div className="border-t border-white/5">
                        {mountainLogs.map((log, i) => (
                          <div
                            key={log.id}
                            className={`flex items-start gap-3 px-4 md:px-5 py-3 ${
                              i < mountainLogs.length - 1 ? 'border-b border-white/5' : ''
                            }`}
                          >
                            <div className="flex-shrink-0 mt-0.5">
                              <Calendar size={14} className="text-gray-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-sm text-gray-300 font-medium">
                                {formatDate(log.visitDate)}
                              </span>
                              {log.memo && (
                                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">
                                  {log.memo}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => removeVisit(log.id)}
                              className="flex-shrink-0 text-gray-600 hover:text-red-400 transition-colors p-1"
                              title="기록 삭제"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 전체 기록 (날짜순) */}
              {logs.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-lg font-bold text-white mb-4">전체 산행 기록</h2>
                  <div className="space-y-2">
                    {logs.map((log) => {
                      const mountain = getMountainById(log.mountainId);
                      if (!mountain) return null;
                      return (
                        <div
                          key={log.id}
                          className="flex items-center gap-3 bg-gray-900/40 border border-white/5 rounded-xl px-4 py-3"
                        >
                          <div className="text-xs text-gray-500 w-24 flex-shrink-0">
                            {formatDate(log.visitDate)}
                          </div>
                          <Link
                            to={`/mountain/${log.mountainId}`}
                            className="font-medium text-sm text-white hover:text-emerald-400 transition-colors flex-shrink-0"
                          >
                            {mountain.name}
                          </Link>
                          {log.memo && (
                            <div className="flex items-center gap-1 text-xs text-gray-500 min-w-0">
                              <FileText size={11} />
                              <span className="truncate">{log.memo}</span>
                            </div>
                          )}
                          <button
                            onClick={() => removeVisit(log.id)}
                            className="ml-auto flex-shrink-0 text-gray-600 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* 즐겨찾기 탭 */}
      {activeTab === 'favorites' && (
        <>
          {favoriteIds.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🤍</div>
              <p className="text-gray-500 text-sm mb-4">아직 즐겨찾기한 산이 없습니다</p>
              <Link to="/search" className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors">
                산 찾아보기 →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {favoriteIds.map((mountainId) => {
                const mountain = getMountainById(mountainId);
                if (!mountain) return null;
                return (
                  <div
                    key={mountainId}
                    className="bg-gray-900/60 border border-white/5 rounded-2xl overflow-hidden"
                  >
                    <div className="flex items-center justify-between p-4 md:p-5">
                      <Link
                        to={`/mountain/${mountainId}`}
                        className="flex items-center gap-3 min-w-0 flex-1 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                          <Heart size={18} className="text-red-400" fill="currentColor" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors">
                              {mountain.name}
                            </h3>
                            <span className="text-xs text-gray-500">{mountain.heightM.toLocaleString()}m</span>
                            {mountain.is100Famous && (
                              <span className="text-xs px-1.5 py-0.5 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded">
                                🏆 100대
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <DifficultyBadge difficulty={mountain.difficulty} size="sm" />
                            <div className="flex gap-1">
                              {mountain.themes.slice(0, 2).map((t) => (
                                <ThemeTag key={t} theme={t} size="sm" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </Link>
                      <button
                        onClick={() => toggleFavorite(mountainId)}
                        className="flex-shrink-0 ml-3 p-2 text-red-400 hover:text-gray-500 transition-colors"
                        title="즐겨찾기 해제"
                      >
                        <Heart size={16} fill="currentColor" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
