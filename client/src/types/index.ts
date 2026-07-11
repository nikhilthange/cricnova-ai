export interface User {
  _id: string;
  username: string;
  email: string;
  favoriteTeams?: Team[];
  favoritePlayers?: Player[];
  token?: string;
}

export interface Team {
  _id: string;
  name: string;
  code: string;
  logo?: string;
  ranking?: number;
  winRate?: number;
  colorClass?: string;
  captain?: string;
  coach?: string;
}

export interface Player {
  _id: string;
  name: string;
  country: string;
  role: 'Batter' | 'Bowler' | 'All-rounder' | 'Wicketkeeper';
  photo?: string;
  stats?: {
    matches: number;
    runs: number;
    average: number;
    wickets: number;
    economy: number;
  };
  teamId?: Team | string;
}

export interface MatchTimelineEvent {
  over: number;
  event: string;
}

export interface Match {
  _id: string;
  team1: Team;
  team2: Team;
  status: 'UPCOMING' | 'LIVE' | 'COMPLETED';
  score1?: string;
  score2?: string;
  toss?: string;
  result?: string;
  venue?: string;
  date: string;
  momentum?: number;
  timeline?: MatchTimelineEvent[];
}

export interface News {
  _id: string;
  title: string;
  content: string;
  author: string;
  imageUrl?: string;
  category: string;
  tags?: string[];
  createdAt: string;
}
