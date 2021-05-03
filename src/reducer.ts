import { combineReducers } from 'redux';

import pagesReducer from "./store/slices/pages";
import usersReducer from "./store/slices/users";
import pokemonsReducer, { IPokemonsState } from "./store/slices/pokemons";
import caughtPokemonsReducer, { ICaughtPokemonsState } from './store/slices/caughtPokemons';

export interface IPokemon {
  id: number;
  name: string;
};
export interface ICaughtPokemon {
  id?: number;
  pokemonId: number;
  name: string;
  caughtDate: string;
};
export interface AppState {
  userId: number;
  page: number;
  caughtPokemons: ICaughtPokemonsState;
  pokemons: IPokemonsState;
};

export enum ActionType {
  NEXT_PAGE = 'pagination/nextPage',
  // SET_CAUGHT_POKEMONS = 'SET_CAUGHT_POKEMONS',
  SET_NEW_STATE = 'state/setNewState',
};

export interface Action {
  type: string;
  payload?: any;
};

const rootReducer = combineReducers({
  page: pagesReducer,
  userId: usersReducer,
  pokemons: pokemonsReducer,
  caughtPokemons: caughtPokemonsReducer,
  // caughtPokemonsIds: caughtPokemonsIdsReducer,
});

export default rootReducer;
