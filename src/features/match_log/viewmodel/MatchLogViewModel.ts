import { useCallback, useEffect, useMemo, useState } from "react";
import { matchRepository } from "@data/repositories/MatchRepository";
import { Match } from "@domain/models/match";

export function useMatchLogViewModel() {
  const [items, setItems] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const list = await matchRepository.list();
      setItems(list);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const remove = useCallback(async (id: string) => {
    await matchRepository.remove(id);
    await load();
  }, [load]);

  return useMemo(() => ({ items, loading, reload: load, remove }), [items, loading, load, remove]);
}

export function useMatchEditorViewModel(id?: string) {
  const [draft, setDraft] = useState<Match | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        if (id) {
          const item = await matchRepository.get(id);
          setDraft(item ?? null);
        } else {
          const now = new Date();
          const empty: Match = {
            id: Math.random().toString(36).slice(2),
            dateISO: now.toISOString(),
            location: "",
            durationMin: 90,
            goals: 0,
            assists: 0,
            rating: 7,
            memo: ""
          };
          setDraft(empty);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const update = useCallback(<K extends keyof Match>(key: K, value: Match[K]) => {
    setDraft(prev => (prev ? { ...prev, [key]: value } : prev));
  }, []);

  const save = useCallback(async () => {
    if (!draft) return;
    await matchRepository.upsert(draft);
  }, [draft]);

  return { draft, loading, update, save };
}


