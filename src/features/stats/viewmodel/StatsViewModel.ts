import { useEffect, useMemo, useState } from "react";
import { matchRepository } from "@data/repositories/MatchRepository";
import { Match } from "@domain/models/match";

export function useStatsViewModel() {
  const [items, setItems] = useState<Match[]>([]);
  useEffect(() => {
    (async () => {
      const list = await matchRepository.list();
      setItems(list);
    })();
  }, []);

  const stats = useMemo(() => {
    const total = items.length;
    const goals = items.reduce((s, m) => s + m.goals, 0);
    const assists = items.reduce((s, m) => s + m.assists, 0);
    const avgRating = total ? Math.round((items.reduce((s, m) => s + m.rating, 0) / total) * 10) / 10 : 0;
    return { total, goals, assists, avgRating };
  }, [items]);

  return { stats };
}


