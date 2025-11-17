import { Match } from "@domain/models/match";

export interface MatchRepository {
  list(): Promise<Match[]>;
  get(id: string): Promise<Match | undefined>;
  upsert(match: Match): Promise<void>;
  remove(id: string): Promise<void>;
}

export class InMemoryMatchRepository implements MatchRepository {
  private items: Match[] = [];

  constructor(seed?: Match[]) {
    if (seed?.length) {
      this.items = seed;
    } else {
      const now = new Date();
      this.items = [
        {
          id: "1",
          dateISO: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0, 0).toISOString(),
          location: "서울 ○○풋살장 A코트",
          durationMin: 90,
          goals: 2,
          assists: 1,
          rating: 7,
          memo: "오랜만에 몸 풀림"
        }
      ];
    }
  }

  async list(): Promise<Match[]> {
    return [...this.items].sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));
  }

  async get(id: string): Promise<Match | undefined> {
    return this.items.find(m => m.id === id);
  }

  async upsert(match: Match): Promise<void> {
    const idx = this.items.findIndex(m => m.id === match.id);
    if (idx >= 0) {
      this.items[idx] = match;
    } else {
      this.items.push(match);
    }
  }

  async remove(id: string): Promise<void> {
    this.items = this.items.filter(m => m.id !== id);
  }
}

export const matchRepository = new InMemoryMatchRepository();


