import { Match } from "@mvvn/model/match";

export interface MatchRepository {
  list(): Promise<Match[]>;
  get(id: string): Promise<Match | undefined>;
  upsert(match: Match): Promise<void>;
  remove(id: string): Promise<void>;
}

class InMemoryMatchRepository implements MatchRepository {
  private items: Match[] = [];

  constructor(seed?: Match[]) {
    if (seed?.length) {
      this.items = seed;
    } else {
      const today = new Date();
      this.items = new Array(6).fill(null).map((_, index) => {
        const date = new Date(today);
        date.setDate(today.getDate() - index * 3);
        return {
          id: `${index + 1}`,
          dateISO: date.toISOString(),
          location: index % 2 ? "서울 플렉스 풋살장" : "강남 스테이트 경기장",
          durationMin: 90,
          goals: Math.max(0, Math.round(Math.random() * 3 - index / 3)),
          assists: Math.max(0, Math.round(Math.random() * 2)),
          rating: 6 + Math.round(Math.random() * 4),
          memo: index % 2 ? "미드필더 전환 훈련" : "쉐도우 스트라이커 롤 시험"
        } satisfies Match;
      });
    }
  }

  async list(): Promise<Match[]> {
    return [...this.items].sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));
  }

  async get(id: string): Promise<Match | undefined> {
    return this.items.find(item => item.id === id);
  }

  async upsert(match: Match): Promise<void> {
    const index = this.items.findIndex(item => item.id === match.id);
    if (index >= 0) {
      this.items[index] = match;
    } else {
      this.items.unshift(match);
    }
  }

  async remove(id: string): Promise<void> {
    this.items = this.items.filter(item => item.id !== id);
  }
}

export const matchRepository: MatchRepository = new InMemoryMatchRepository();
