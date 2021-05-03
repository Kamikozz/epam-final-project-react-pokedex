import { put, select } from 'redux-saga/effects';

import { Action } from '../../reducer';
import {
  nextPage,
  fetchPaginatedPokemons,
  fetchPaginatedPokemonsError,
  selectPage,
} from '../slices';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* fetchNextPagePokemons(action: Action) {
  try {
    yield put(nextPage());
    const page: number = yield select(selectPage);
    yield put(fetchPaginatedPokemons({ page }));
  } catch (e) {
    yield put(fetchPaginatedPokemonsError(e.message));
  }
}
