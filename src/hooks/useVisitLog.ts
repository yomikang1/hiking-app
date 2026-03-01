import { useState, useCallback } from 'react';
import type { VisitLog } from '../types/visitLog';

const STORAGE_KEY = 'sangil_visit_logs';

function load(): VisitLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(logs: VisitLog[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export function useVisitLog() {
  const [logs, setLogs] = useState<VisitLog[]>(() => load());

  const addVisit = useCallback((mountainId: string, visitDate: string, memo: string) => {
    const newLog: VisitLog = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      mountainId,
      visitDate,
      memo,
      createdAt: new Date().toISOString(),
    };
    setLogs((prev) => {
      const updated = [newLog, ...prev];
      save(updated);
      return updated;
    });
    return newLog.id;
  }, []);

  const removeVisit = useCallback((id: string) => {
    setLogs((prev) => {
      const updated = prev.filter((l) => l.id !== id);
      save(updated);
      return updated;
    });
  }, []);

  const updateVisit = useCallback((id: string, changes: Partial<Pick<VisitLog, 'visitDate' | 'memo'>>) => {
    setLogs((prev) => {
      const updated = prev.map((l) => l.id === id ? { ...l, ...changes } : l);
      save(updated);
      return updated;
    });
  }, []);

  const getVisitsByMountain = useCallback((mountainId: string) => {
    return logs.filter((l) => l.mountainId === mountainId)
      .sort((a, b) => b.visitDate.localeCompare(a.visitDate));
  }, [logs]);

  // 방문한 산 ID 목록 (중복 제거)
  const visitedMountainIds = [...new Set(logs.map((l) => l.mountainId))];

  // 날짜순 정렬 전체 로그
  const sortedLogs = [...logs].sort((a, b) => b.visitDate.localeCompare(a.visitDate));

  return {
    logs: sortedLogs,
    visitedMountainIds,
    addVisit,
    removeVisit,
    updateVisit,
    getVisitsByMountain,
  };
}
