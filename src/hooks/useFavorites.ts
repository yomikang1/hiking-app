import { useState, useCallback } from 'react';

const STORAGE_KEY = 'sangil_favorites';

function load(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => load());

  const toggleFavorite = useCallback((mountainId: string) => {
    setFavoriteIds((prev) => {
      const updated = prev.includes(mountainId)
        ? prev.filter((id) => id !== mountainId)
        : [mountainId, ...prev];
      save(updated);
      return updated;
    });
  }, []);

  const isFavorite = useCallback(
    (mountainId: string) => favoriteIds.includes(mountainId),
    [favoriteIds],
  );

  return { favoriteIds, toggleFavorite, isFavorite };
}
