import { AppState, Action, IPokemon } from '../../reducer';
import { IPagination } from '../../services/pokemons';
import { constructActionType } from './utils';

enum ActionType {
  FETCH_REQUESTED = 'fetchRequested',
  FETCH_SUCCEEDED = 'fetchSucceeded',
  FETCH_FAILED = 'fetchFailed',
  SET_LOADER = 'setLoader',
  UNSET_LOADER = 'unsetLoader',
};
export const PokemonsActionType = constructActionType<typeof ActionType>('pokemons', ActionType);

export interface IPokemonsState {
  items: IPokemon[];
  isLoading: boolean;
};

const initialState: IPokemonsState = {
  items: [],
  isLoading: false,
};

export default function pokemonsReducer(state = initialState, action: Action) {
  switch (action.type) {
    // case PokemonsActionType.FETCH_REQUESTED:
    //   return { ...state };
    case PokemonsActionType.FETCH_SUCCEEDED:
      return { ...state, items: [...state.items, ...action.payload] };
    case PokemonsActionType.FETCH_FAILED:
      return { ...state };
    case PokemonsActionType.SET_LOADER:
      return { ...state, isLoading: true };
    case PokemonsActionType.UNSET_LOADER:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export const fetchPaginatedPokemons = (pagination: IPagination) => ({
  type: PokemonsActionType.FETCH_REQUESTED,
  payload: pagination,
});
export const fetchPaginatedPokemonsOk = (payload: IPokemon[]) => ({
  type: PokemonsActionType.FETCH_SUCCEEDED,
  payload,
});
export const fetchPaginatedPokemonsError = (errorMessage: string) => ({
  type: PokemonsActionType.FETCH_FAILED,
  payload: errorMessage,
});
export const pokemonsSetLoader = () => ({ type: PokemonsActionType.SET_LOADER });
export const pokemonsUnsetLoader = () => ({ type: PokemonsActionType.UNSET_LOADER });

export const selectPokemons = (state: AppState) => state.pokemons;
export const selectPokemonsItems = (state: AppState) => state.pokemons.items;
export const selectPokemonsIsLoading = (state: AppState) => state.pokemons.isLoading;
