import { useEffect, useMemo, useState } from "react";
import { matchRepository } from "@data/repositories/MatchRepository";
import { Match } from "@domain/models/match";

export function useDashboardViewModel() {
  const [recent, setRecent] = useState<Match[]>([]);

  useEffect(() => {
    (async () => {
      const list = await matchRepository.list();
      setRecent(list.slice(0, 3));
    })();
  }, []);

  const summary = useMemo(() => {
    const total = recent.length;
    const goals = recent.reduce((s, m) => s + m.goals, 0);
    const assists = recent.reduce((s, m) => s + m.assists, 0);
    const avgRating = total ? Math.round((recent.reduce((s, m) => s + m.rating, 0) / total) * 10) / 10 : 0;
    return { total, goals, assists, avgRating };
  }, [recent]);

  return { recent, summary };
}


