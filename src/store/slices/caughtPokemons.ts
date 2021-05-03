import { AppState, Action, ICaughtPokemon } from "../../reducer";
import { IGetCaughtPokemonsParams } from '../../services/pokemons';

enum ActionType {
  ADD_MANY = 'addMany',
  ADD_ONE = 'addOne',
  FETCH_REQUESTED = 'fetchRequested',
  FETCH_SUCCEEDED = 'fetchSucceeded',
  FETCH_FAILED = 'fetchFailed',
  SET_LOADER = 'setLoader',
  UNSET_LOADER = 'unsetLoader',
};

const prefixSliceName = (sliceName: string, actionName: string) => `${sliceName}/${actionName}`;
const constructActionType = (sliceName: string) => {
  return Object
    .entries(ActionType)
    .reduce((acc: any, [key, value]) => {
      acc[key] = prefixSliceName(sliceName, value);
      return acc;
    }, {}) as typeof ActionType;
};

export const CaughtPokemonsActionType = constructActionType('caughtPokemons');
export interface ICaughtPokemonsState {
  items: ICaughtPokemon[];
  uniqueIds: null | Set<number>;
  isLoading: boolean;
};

const initialState: ICaughtPokemonsState = {
  items: [],
  uniqueIds: null,
  isLoading: false,
};

export default function caughtPokemonsReducer(state = initialState, action: Action) {
  switch (action.type) {
    // case ActionType.ADD_CAUGHT_POKEMONS:
    //   return { ...state, items: [...state.items, ...action.payload] };
    case CaughtPokemonsActionType.ADD_ONE: {
      const caughtPokemon: ICaughtPokemon = action.payload;
      const oldUniqueIds = state.uniqueIds ? state.uniqueIds : new Set<number>();
      return {
        ...state,
        items: [...state.items, caughtPokemon],
        uniqueIds: new Set(oldUniqueIds.add(caughtPokemon.pokemonId).values()),
      };
    }
    // case SagasActionType.FETCH_CAUGHT_POKEMONS_REQUESTED:
    //   return { ...state };
    case CaughtPokemonsActionType.FETCH_SUCCEEDED: {
      const newCaughtPokemons: ICaughtPokemon[] = action.payload;
      const oldUniqueIds = state.uniqueIds ? state.uniqueIds : new Set<number>();
      newCaughtPokemons.forEach(({ pokemonId }) => oldUniqueIds.add(pokemonId));
      return {
        ...state,
        items: [...state.items, ...newCaughtPokemons],
        uniqueIds: new Set(oldUniqueIds.values()),
      };
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

export const selectCaughtPokemons = (state: AppState) => state.caughtPokemons;
export const selectCaughtPokemonsItems = (state: AppState) => state.caughtPokemons.items;
export const selectCaughtPokemonsIds = (state: AppState) => state.caughtPokemons.uniqueIds;
export const selectCaughtPokemonsIsLoading = (state: AppState) => state.caughtPokemons.isLoading;
