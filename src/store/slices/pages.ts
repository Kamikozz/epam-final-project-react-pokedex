import { AppState, Action } from "../../reducer";

enum ActionType {
  NEXT_PAGE = 'nextPage',
  FETCH_NEXT_PAGE_POKEMONS_REQUESTED = 'fetchNextPagePokemonsRequested'
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

export const PaginatedPokemonsActionType = constructActionType('pagination');

const initialState = 1;

export default function pagesReducer(state = initialState, action: Action) {
  switch (action.type) {
    case PaginatedPokemonsActionType.NEXT_PAGE: {
      return state + 1;
    }
    default:
      return state;
  }
};

export const nextPage = () => ({ type: PaginatedPokemonsActionType.NEXT_PAGE });
export const fetchNextPagePokemons = () => ({
  type: PaginatedPokemonsActionType.FETCH_NEXT_PAGE_POKEMONS_REQUESTED,
});

export const selectPage = (state: AppState) => state.page;
