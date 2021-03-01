import React from "react";
import { ICaughtPokemon } from "./pages/CaughtPokemonsPage/CaughtPokemonsPage";
import { IPokemon } from "./pages/PokemonPage/PokemonPage";

interface Action {
  type: string;
  payload?: any;
}

interface AppState {
  userId: number;
  page: number;
  caughtPokemons: null | Array<ICaughtPokemon>;
  caughtPokemonIds: null | Set<number>;
  pokemons: Array<IPokemon>;
};


export enum ActionType {
  NEXT_PAGE = 'NEXT_PAGE',
  // SET_CAUGHT_POKEMONS = 'SET_CAUGHT_POKEMONS',
  SET_NEW_STATE = 'SET_NEW_STATE',
}

export const initialState: AppState = {
  userId: 1,
  page: 1,
  caughtPokemons: null,
  caughtPokemonIds: null,
  pokemons: [],
};

export const reducer = (state: AppState, action: Action): AppState =>{
  switch (action.type) {
    case ActionType.NEXT_PAGE: {
      state.page += 1;
      return {
        ...state,
      };
    }
    case ActionType.SET_NEW_STATE: {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      throw new Error();
  }
};

export interface ContextType {
  dispatch: React.Dispatch<Action>;
  state: AppState;
};

export const AppContext = React.createContext<ContextType>({
  dispatch: () => {},
  state: initialState
});
