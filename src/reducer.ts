import { combineReducers } from 'redux';

import pagesReducer from "./store/slices/pages";
import usersReducer from "./store/slices/users";
import pokemonsReducer from "./store/slices/pokemons";
import caughtPokemonsReducer from './store/slices/caughtPokemons';

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
export interface ICaughtPokemons {
  items: ICaughtPokemon[];
  uniqueIds: null | Set<number>;
};
export interface AppState {
  userId: number;
  page: number;
  caughtPokemons: ICaughtPokemons;
  pokemons: IPokemon[];
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
