// https://docs.football-data.org/general/v4/person.html

export interface Player {
  id: number;
  name: string;
  dateOfBirth: string;
  nationality: string;
  position: string;
  shirtNumber: number;
}
