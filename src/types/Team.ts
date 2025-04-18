export interface Team {
  area: {
    id: number;
    name: string;
    code: string;
    flag: string;
  };
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  runningCompetitions: {
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string | null;
  }[];
  coach: {
    id: number;
    firstName: string;
    lastName: string | null;
    name: string;
    dateOfBirth: string;
    nationality: string;
    contract: {
      start: string;
      until: string;
    };
  };
  marketValue: number;
  squad: {
    id: number;
    firstName: string;
    lastName: string | null;
    name: string;
    position: string;
    dateOfBirth: string;
    nationality: string;
    shirtNumber: number;
    marketValue: number | null;
    contract: {
      start: string;
      until: string;
    };
  }[];
  staff: {
    id: number;
    firstName: string;
    lastName: string | null;
    name: string;
    dateOfBirth: string;
    nationality: string;
    contract: {
      start: string;
      until: string;
    };
  }[];
  lastUpdated: string;
}
