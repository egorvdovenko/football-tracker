export interface Player {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  position: string;
  shirtNumber: number;
  lastUpdated: string;
  currentTeam: {
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
      emblem: string;
    }[];
    contract: {
      start: string;
      until: string;
    };
  };
}
