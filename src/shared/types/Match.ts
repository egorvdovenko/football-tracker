// https://docs.football-data.org/general/v4/match.html

export interface Match {
  id: number;
  utcDate: string;
  status: string;
  competition: {
    name: string;
  };
  homeTeam: {
    id: number;
    name: string;
  };
  awayTeam: {
    id: number;
    name: string;
  };
  score: {
    fullTime: {
      home: number;
      away: number;
    };
  };
}
