import { useState, useMemo, useCallback } from 'react';
import { searchMountains } from '../services/mountainService';
import type { Mountain, SearchFilters, Theme, Region, Difficulty, Season } from '../types/mountain';

const DEFAULT_FILTERS: SearchFilters = {
  query: '',
  themes: [],
  regions: [],
  difficulties: [],
  is100Famous: null,
  isNationalPark: null,
  maxHeightM: null,
  bestSeason: null,
};

export function useSearch() {
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);

  const results: Mountain[] = useMemo(() => searchMountains(filters), [filters]);

  const setQuery = useCallback((query: string) => {
    setFilters((f) => ({ ...f, query }));
  }, []);

  const toggleTheme = useCallback((theme: Theme) => {
    setFilters((f) => ({
      ...f,
      themes: f.themes.includes(theme)
        ? f.themes.filter((t) => t !== theme)
        : [...f.themes, theme],
    }));
  }, []);

  const toggleRegion = useCallback((region: Region) => {
    setFilters((f) => ({
      ...f,
      regions: f.regions.includes(region)
        ? f.regions.filter((r) => r !== region)
        : [...f.regions, region],
    }));
  }, []);

  const toggleDifficulty = useCallback((difficulty: Difficulty) => {
    setFilters((f) => ({
      ...f,
      difficulties: f.difficulties.includes(difficulty)
        ? f.difficulties.filter((d) => d !== difficulty)
        : [...f.difficulties, difficulty],
    }));
  }, []);

  const setIs100Famous = useCallback((val: boolean | null) => {
    setFilters((f) => ({ ...f, is100Famous: val }));
  }, []);

  const setIsNationalPark = useCallback((val: boolean | null) => {
    setFilters((f) => ({ ...f, isNationalPark: val }));
  }, []);

  const setBestSeason = useCallback((season: Season | null) => {
    setFilters((f) => ({ ...f, bestSeason: season }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const hasActiveFilters =
    filters.query !== '' ||
    filters.themes.length > 0 ||
    filters.regions.length > 0 ||
    filters.difficulties.length > 0 ||
    filters.is100Famous !== null ||
    filters.isNationalPark !== null ||
    filters.bestSeason !== null;

  return {
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
  };
}
