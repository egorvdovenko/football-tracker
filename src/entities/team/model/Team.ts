// https://docs.football-data.org/general/v4/team.html

export interface Team {
  id: number;
  name: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  venue: string;
  squad: {
    id: number;
    name: string;
  }[];
}
