export type Theme =
  | 'sunrise'       // 일출
  | 'snow'          // 설산
  | 'autumn'        // 단풍
  | 'sea_of_clouds' // 운해
  | 'valley'        // 계곡
  | 'coastal'       // 해안
  | 'rocky'         // 암릉
  | 'flower';       // 야생화

export type Region =
  | 'seoul'        // 서울
  | 'gyeonggi'     // 경기
  | 'gangwon'      // 강원
  | 'chungbuk'     // 충북
  | 'chungnam'     // 충남
  | 'jeonbuk'      // 전북
  | 'jeonnam'      // 전남
  | 'gyeongbuk'    // 경북
  | 'gyeongnam'    // 경남
  | 'jeju'         // 제주
  | 'busan'        // 부산
  | 'daegu'        // 대구
  | 'incheon';     // 인천

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface Course {
  name: string;
  distanceKm: number;
  durationMin: number;
  difficulty: Difficulty;
  description: string;
  startPoint: string;
  highlight?: string;
}

export interface Mountain {
  id: string;
  name: string;
  nameEn?: string;
  heightM: number;
  region: Region;
  provinces: string[];       // ['경남 산청', '경남 함양']
  difficulty: Difficulty;
  themes: Theme[];
  is100Famous: boolean;
  isNationalPark?: boolean;
  description: string;
  features: string[];
  bestSeasons: Season[];
  courses: Course[];
  nearbyCity?: string;
  tips?: string[];
  tags: string[];
}

// 검색/필터 옵션
export interface SearchFilters {
  query: string;
  themes: Theme[];
  regions: Region[];
  difficulties: Difficulty[];
  is100Famous: boolean | null;
  isNationalPark: boolean | null;
  maxHeightM: number | null;
  bestSeason: Season | null;
}

export const THEME_LABELS: Record<Theme, string> = {
  sunrise: '일출',
  snow: '설산',
  autumn: '단풍',
  sea_of_clouds: '운해',
  valley: '계곡',
  coastal: '해안',
  rocky: '암릉',
  flower: '야생화',
};

export const REGION_LABELS: Record<Region, string> = {
  seoul: '서울',
  gyeonggi: '경기',
  gangwon: '강원',
  chungbuk: '충북',
  chungnam: '충남',
  jeonbuk: '전북',
  jeonnam: '전남',
  gyeongbuk: '경북',
  gyeongnam: '경남',
  jeju: '제주',
  busan: '부산',
  daegu: '대구',
  incheon: '인천',
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: '초급',
  medium: '중급',
  hard: '고급',
  expert: '전문가',
};

export const SEASON_LABELS: Record<Season, string> = {
  spring: '봄',
  summer: '여름',
  autumn: '가을',
  winter: '겨울',
};

export const THEME_ICONS: Record<Theme, string> = {
  sunrise: '🌅',
  snow: '❄️',
  autumn: '🍂',
  sea_of_clouds: '🌊',
  valley: '🏞️',
  coastal: '🌊',
  rocky: '🪨',
  flower: '🌸',
};

export const SEASON_ICONS: Record<Season, string> = {
  spring: '🌸',
  summer: '☀️',
  autumn: '🍂',
  winter: '❄️',
};

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: 'text-green-400 bg-green-400/10',
  medium: 'text-yellow-400 bg-yellow-400/10',
  hard: 'text-orange-400 bg-orange-400/10',
  expert: 'text-red-400 bg-red-400/10',
};
