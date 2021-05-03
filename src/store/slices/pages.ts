import { AppState, Action } from '../../reducer';
import { constructActionType } from './utils';

enum ActionType {
  NEXT_PAGE = 'nextPage',
  FETCH_NEXT_PAGE_POKEMONS_REQUESTED = 'fetchNextPagePokemonsRequested'
};
export const PaginatedPokemonsActionType = constructActionType<typeof ActionType>('pagination', ActionType);

const initialState = 1;

export default function pagesReducer(state = initialState, action: Action) {
  switch (action.type) {
    case PaginatedPokemonsActionType.NEXT_PAGE:
      return state + 1;
    default:
      return state;
  }
};

export const nextPage = () => ({ type: PaginatedPokemonsActionType.NEXT_PAGE });
export const fetchNextPagePokemons = () => ({
  type: PaginatedPokemonsActionType.FETCH_NEXT_PAGE_POKEMONS_REQUESTED,
});

export const selectPage = (state: AppState) => state.page;
