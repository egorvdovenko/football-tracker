export interface Match {
  area: {
    id: number;
    name: string;
    code: string;
    flag: string;
  };
  competition: {
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string;
  };
  season: {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
    winner: null | string;
    stages: string[];
  };
  id: number;
  utcDate: string;
  status: string;
  minute: number;
  injuryTime: number;
  attendance: number;
  venue: string;
  matchday: number;
  stage: string;
  group: null | string;
  lastUpdated: string;
  homeTeam: Team;
  awayTeam: Team;
  score: {
    winner: string;
    duration: string;
    fullTime: {
      home: number;
      away: number;
    };
    halfTime: {
      home: number;
      away: number;
    };
  };
  goals: Goal[];
  penalties: Penalty[];
  bookings: Booking[];
  substitutions: Substitution[];
  odds: {
    homeWin: number;
    draw: number;
    awayWin: number;
  };
  referees: Referee[];
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  coach: {
    id: number;
    name: string;
    nationality: string;
  };
  leagueRank: null | number;
  formation: string;
  lineup: Player[];
  bench: Player[];
  statistics: TeamStatistics;
}

export interface Player {
  id: number;
  name: string;
  position: string | null;
  shirtNumber: number;
}

export interface TeamStatistics {
  corner_kicks: number;
  free_kicks: number;
  goal_kicks: number;
  offsides: number;
  fouls: number;
  ball_possession: number;
  saves: number;
  throw_ins: number;
  shots: number;
  shots_on_goal: number;
  shots_off_goal: number;
  yellow_cards: number;
  yellow_red_cards: number;
  red_cards: number;
}

export interface Goal {
  minute: number;
  injuryTime: number | null;
  type: string;
  team: {
    id: number;
    name: string;
  };
  scorer: {
    id: number;
    name: string;
  };
  assist: {
    id: number;
    name: string;
  } | null;
  score: {
    home: number;
    away: number;
  };
}

export interface Penalty {
  player: {
    id: number;
    name: string;
  };
  team: {
    id: number | null;
    name: string | null;
  };
  scored: boolean;
}

export interface Booking {
  minute: number;
  team: {
    id: number;
    name: string;
  };
  player: {
    id: number;
    name: string;
  };
  card: string;
}

export interface Substitution {
  minute: number;
  team: {
    id: number;
    name: string;
  };
  playerOut: {
    id: number;
    name: string;
  };
  playerIn: {
    id: number;
    name: string;
  };
}

export interface Referee {
  id: number;
  name: string;
  type: string;
  nationality: string | null;
}
