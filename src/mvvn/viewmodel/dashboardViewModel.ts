import { useEffect, useMemo, useState } from "react";
import { matchRepository } from "@mvvn/data/matchRepository";
import { Match } from "@mvvn/model/match";

export function useDashboardViewModel() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    (async () => {
      const list = await matchRepository.list();
      setMatches(list);
    })();
  }, []);

  const summary = useMemo(() => {
    const total = matches.length;
    const goals = matches.reduce((sum, match) => sum + match.goals, 0);
    const assists = matches.reduce((sum, match) => sum + match.assists, 0);
    const avgRating = total ? Math.round((matches.reduce((sum, match) => sum + match.rating, 0) / total) * 10) / 10 : 0;
    const workload = total ? matches.reduce((sum, match) => sum + match.durationMin, 0) : 0;
    return { total, goals, assists, avgRating, workload };
  }, [matches]);

  const recent = useMemo(() => matches.slice(0, 3), [matches]);

  const insights = useMemo(() => {
    if (!matches.length) {
      return ["첫 경기를 기록해 볼까요?"];
    }
    const latest = matches[0];
    const ratingTrend = matches.slice(0, 4).map(item => item.rating);
    const hasHighRating = ratingTrend.some(value => value >= 8);
    const controlAdvice = latest.goals === 0 ? "침착하게 템포 조절" : "득점 루틴 유지";
    const memoAdvice = latest.memo?.length ? latest.memo : "플레이 리뷰를 메모에 남겨보세요";
    return [
      hasHighRating ? "폼이 상승 중이에요" : "기복을 줄여 볼까요?",
      `${controlAdvice}가 이번 주 핵심 포인트예요`,
      memoAdvice
    ];
  }, [matches]);

  return { summary, recent, insights };
}
