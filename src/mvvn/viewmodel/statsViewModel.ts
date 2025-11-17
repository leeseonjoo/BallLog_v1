import { useEffect, useMemo, useState } from "react";
import { matchRepository } from "@mvvn/data/matchRepository";
import { Match } from "@mvvn/model/match";

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
    const goals = items.reduce((sum, match) => sum + match.goals, 0);
    const assists = items.reduce((sum, match) => sum + match.assists, 0);
    const avgRating = total ? Math.round((items.reduce((sum, match) => sum + match.rating, 0) / total) * 10) / 10 : 0;
    const avgDuration = total ? Math.round(items.reduce((sum, match) => sum + match.durationMin, 0) / total) : 0;
    const productivity = avgDuration ? Math.round((goals / total) * 100) / 10 : 0;
    return { total, goals, assists, avgRating, avgDuration, productivity };
  }, [items]);

  const timeline = useMemo(() => items.slice().reverse(), [items]);

  return { stats, timeline };
}
