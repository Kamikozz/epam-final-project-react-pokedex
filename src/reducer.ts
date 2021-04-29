import { createStore, Reducer } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import { ICaughtPokemon } from './pages/CaughtPokemonsPage/CaughtPokemonsPage';
import { IPokemon } from './pages/PokemonPage/PokemonPage';

interface Action {
  type: string;
  payload?: any;
};

export interface AppState {
  userId: number;
  page: number;
  caughtPokemons: null | Array<ICaughtPokemon>;
  caughtPokemonsIds: null | Set<number>;
  pokemons: Array<IPokemon>;
};

export enum ActionType {
  NEXT_PAGE = 'pagination/nextPage',
  // SET_CAUGHT_POKEMONS = 'SET_CAUGHT_POKEMONS',
  SET_NEW_STATE = 'state/setNewState',
};

const initialState: AppState = {
  userId: 1,
  page: 1,
  caughtPokemons: null,
  caughtPokemonsIds: null,
  pokemons: [],
};

export const reducer: Reducer<AppState, Action> = (state = initialState, action: Action): AppState =>{
  switch (action.type) {
    case ActionType.NEXT_PAGE: {
      return {
        ...state,
        page: state.page + 1,
      };
    }
    case ActionType.SET_NEW_STATE: {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state;
  }
};

export const store = createStore(
  reducer,
  devToolsEnhancer({}),
);
