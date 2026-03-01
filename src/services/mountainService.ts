/**
 * MountainService — 데이터 액세스 레이어
 *
 * 현재는 로컬 JSON 데이터를 사용하지만,
 * 향후 REST API / GraphQL / Firebase 등으로 교체 시
 * 이 파일만 수정하면 됩니다.
 */

import { MOUNTAINS } from '../data/mountains';
import type { Mountain, SearchFilters, Theme, Region, Difficulty } from '../types/mountain';

// ─── 전체 조회 ─────────────────────────────────────────

export function getAllMountains(): Mountain[] {
  return MOUNTAINS;
}

export function getMountainById(id: string): Mountain | undefined {
  return MOUNTAINS.find((m) => m.id === id);
}

// ─── 필터/검색 ─────────────────────────────────────────

export function searchMountains(filters: Partial<SearchFilters>): Mountain[] {
  let results = [...MOUNTAINS];

  // 텍스트 검색 (이름, 태그, 설명, 지역)
  if (filters.query && filters.query.trim()) {
    const q = filters.query.trim().toLowerCase();
    results = results.filter(
      (m) =>
        m.name.includes(filters.query!) ||
        (m.nameEn?.toLowerCase().includes(q)) ||
        m.description.includes(filters.query!) ||
        m.tags.some((t) => t.includes(filters.query!)) ||
        m.provinces.some((p) => p.includes(filters.query!)) ||
        m.features.some((f) => f.includes(filters.query!))
    );
  }

  // 테마 필터
  if (filters.themes && filters.themes.length > 0) {
    results = results.filter((m) =>
      filters.themes!.some((theme) => m.themes.includes(theme))
    );
  }

  // 지역 필터
  if (filters.regions && filters.regions.length > 0) {
    results = results.filter((m) => filters.regions!.includes(m.region));
  }

  // 난이도 필터
  if (filters.difficulties && filters.difficulties.length > 0) {
    results = results.filter((m) => filters.difficulties!.includes(m.difficulty));
  }

  // 100대 명산 필터
  if (filters.is100Famous === true) {
    results = results.filter((m) => m.is100Famous);
  }

  // 국립공원 필터
  if (filters.isNationalPark === true) {
    results = results.filter((m) => m.isNationalPark);
  }

  // 최고 높이 필터
  if (filters.maxHeightM) {
    results = results.filter((m) => m.heightM <= filters.maxHeightM!);
  }

  // 최적 계절 필터
  if (filters.bestSeason) {
    results = results.filter((m) => m.bestSeasons.includes(filters.bestSeason!));
  }

  return results;
}

// ─── 분류별 조회 ───────────────────────────────────────

export function getMountainsByTheme(theme: Theme): Mountain[] {
  return MOUNTAINS.filter((m) => m.themes.includes(theme));
}

export function getMountainsByRegion(region: Region): Mountain[] {
  return MOUNTAINS.filter((m) => m.region === region);
}

export function getMountainsByDifficulty(difficulty: Difficulty): Mountain[] {
  return MOUNTAINS.filter((m) => m.difficulty === difficulty);
}

export function get100FamousMountains(): Mountain[] {
  return MOUNTAINS.filter((m) => m.is100Famous);
}

export function getEasyMountains(): Mountain[] {
  return MOUNTAINS.filter((m) => m.difficulty === 'easy' || m.difficulty === 'medium');
}

// ─── 추천 ─────────────────────────────────────────────

export function getFeaturedMountains(): Mountain[] {
  const featured = ['jirisan', 'hallasan', 'seoraksan', 'deogyusan', 'taebaeksan',
    'naejangsan', 'bukhansan', 'gayasan'];
  return featured
    .map((id) => getMountainById(id))
    .filter((m): m is Mountain => m !== undefined);
}

export function getThemeShowcase(): { theme: Theme; mountains: Mountain[] }[] {
  const themes: Theme[] = ['sunrise', 'sea_of_clouds', 'snow', 'autumn'];
  return themes.map((theme) => ({
    theme,
    mountains: getMountainsByTheme(theme).slice(0, 4),
  }));
}

// ─── 통계 ─────────────────────────────────────────────

export function getMountainStats() {
  return {
    total: MOUNTAINS.length,
    famous100: MOUNTAINS.filter((m) => m.is100Famous).length,
    byRegion: MOUNTAINS.reduce((acc, m) => {
      acc[m.region] = (acc[m.region] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    byDifficulty: MOUNTAINS.reduce((acc, m) => {
      acc[m.difficulty] = (acc[m.difficulty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };
}
