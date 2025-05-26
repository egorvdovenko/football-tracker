import { Team } from '~/entities/team/model/Team'

export interface FavoritesState {
  teams: Team[];
}

export enum FavoritesActionType {
  AddFavorite = 'ADD_FAVORITE',
  RemoveFavorite = 'REMOVE_FAVORITE',
}

export type FavoritesAction = 
  | { type: FavoritesActionType.AddFavorite, payload: Team }
  | { type: FavoritesActionType.RemoveFavorite, payload: Team['id'] };