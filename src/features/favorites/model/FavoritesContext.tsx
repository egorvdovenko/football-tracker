import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react'
import { FavoritesState, FavoritesAction, FavoritesActionType } from './Favorites'

const initialState: FavoritesState = {
  teams: [],
}

function loadInitialState(): FavoritesState {
  const storedState = localStorage.getItem('favorites')
  
  return storedState 
    ? JSON.parse(storedState) 
    : initialState
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
  const [state, dispatch] = useReducer(favoritesReducer, loadInitialState())

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state))
  }, [state])

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