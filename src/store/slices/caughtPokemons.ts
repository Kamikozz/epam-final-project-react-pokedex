import { AppState, Action, ICaughtPokemon } from '../../reducer';
import { IGetCaughtPokemonsParams } from '../../services/pokemons';
import { constructActionType } from './utils';

enum ActionType {
  ADD_MANY = 'addMany',
  ADD_ONE = 'addOne',
  FETCH_REQUESTED = 'fetchRequested',
  FETCH_SUCCEEDED = 'fetchSucceeded',
  FETCH_FAILED = 'fetchFailed',
  SET_LOADER = 'setLoader',
  UNSET_LOADER = 'unsetLoader',
  POST_AND_ADD_ONE_REQUESTED = 'postAndAddOneRequested',
};
export const CaughtPokemonsActionType = constructActionType<typeof ActionType>('caughtPokemons', ActionType);

export interface ICaughtPokemonsState {
  items: ICaughtPokemon[];
  isLoading: boolean;
};

const initialState: ICaughtPokemonsState = {
  items: [],
  isLoading: false,
};

export default function caughtPokemonsReducer(state = initialState, action: Action) {
  switch (action.type) {
    // case ActionType.ADD_CAUGHT_POKEMONS:
    //   return { ...state, items: [...state.items, ...action.payload] };
    case CaughtPokemonsActionType.ADD_ONE: {
      return { ...state, items: [...state.items, action.payload as ICaughtPokemon] };
    }
    // case SagasActionType.FETCH_CAUGHT_POKEMONS_REQUESTED:
    //   return { ...state };
    case CaughtPokemonsActionType.FETCH_SUCCEEDED: {
      return { ...state, items: [...state.items, ...action.payload as ICaughtPokemon[]] };
    }
    case CaughtPokemonsActionType.SET_LOADER:
      return { ...state, isLoading: true };
    case CaughtPokemonsActionType.UNSET_LOADER:
      return { ...state, isLoading: false };
    // case CaughtPokemonsActionType.FETCH_FAILED:
    //   return { ...state };
    default:
      return state;
  }
};

export const addCaughtPokemons = (caughtPokemons: ICaughtPokemon[]) => ({
  type: CaughtPokemonsActionType.ADD_MANY,
  payload: caughtPokemons,
});
export const addCaughtPokemon = (caughtPokemon: ICaughtPokemon) => ({
  type: CaughtPokemonsActionType.ADD_ONE,
  payload: caughtPokemon,
});
export const fetchCaughtPokemons = (payload: Partial<IGetCaughtPokemonsParams> = {}) => ({
  type: CaughtPokemonsActionType.FETCH_REQUESTED,
  payload,
});
export const fetchCaughtPokemonsOk = (payload: ICaughtPokemon[]) => ({
  type: CaughtPokemonsActionType.FETCH_SUCCEEDED,
  payload,
});
export const fetchCaughtPokemonsError = (errorMessage: string) => ({
  type: CaughtPokemonsActionType.FETCH_FAILED,
  payload: errorMessage,
});
export const caughtPokemonsSetLoader = () => ({ type: CaughtPokemonsActionType.SET_LOADER });
export const caughtPokemonsUnsetLoader = () => ({ type: CaughtPokemonsActionType.UNSET_LOADER });
export const postAndAddCaughtPokemon = (pokemonId: number, name: string) => ({
  type: CaughtPokemonsActionType.POST_AND_ADD_ONE_REQUESTED,
  payload: { pokemonId, name },
});

export const selectCaughtPokemons = (state: AppState) => state.caughtPokemons;
export const selectCaughtPokemonsItems = (state: AppState) => state.caughtPokemons.items;
export const selectCaughtPokemonsIsLoading = (state: AppState) => state.caughtPokemons.isLoading;
