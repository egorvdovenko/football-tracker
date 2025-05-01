import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { Team } from '../types/Team';

interface FavoritesState {
  favorites: Team[];
}

export enum FavoritesActionType {
  AddFavorite = 'ADD_FAVORITE',
  RemoveFavorite = 'REMOVE_FAVORITE',
}

interface AddFavoriteAction {
  type: FavoritesActionType.AddFavorite;
  payload: Team;
}

interface RemoveFavoriteAction {
  type: FavoritesActionType.RemoveFavorite;
  payload: Team['id'];
}

type FavoritesAction = AddFavoriteAction | RemoveFavoriteAction;

const initialState: FavoritesState = {
  favorites: [],
};

function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case FavoritesActionType.AddFavorite:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case FavoritesActionType.RemoveFavorite:
      return {
        ...state,
        favorites: state.favorites.filter(team => team.id !== action.payload),
      };
    default:
      return state;
  }
}

const FavoritesContext = createContext<{
  state: FavoritesState;
  dispatch: React.Dispatch<FavoritesAction>;
} | null>(null);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};