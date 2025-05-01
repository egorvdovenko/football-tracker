import React, { createContext, useReducer, useContext, ReactNode } from 'react'
import { Team } from '../types/Team'

interface FavoritesState {
  teams: Team[];
}

export enum FavoritesActionType {
  AddFavorite = 'ADD_FAVORITE',
  RemoveFavorite = 'REMOVE_FAVORITE',
}

type FavoritesAction = 
  | { type: FavoritesActionType.AddFavorite, payload: Team }
  | { type: FavoritesActionType.RemoveFavorite, payload: Team['id'] };

const initialState: FavoritesState = {
  teams: [],
}

function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case FavoritesActionType.AddFavorite:
      return {
        ...state,
        teams: [...state.teams, action.payload],
      }
    case FavoritesActionType.RemoveFavorite:
      return {
        ...state,
        teams: state.teams.filter(team => team.id !== action.payload),
      }
    default:
      return state
  }
}

const FavoritesContext = createContext<{
  state: FavoritesState;
  dispatch: React.Dispatch<FavoritesAction>;
} | null>(null)

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState)

  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}