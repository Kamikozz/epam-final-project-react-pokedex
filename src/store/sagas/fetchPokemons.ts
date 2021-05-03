import { call, put } from 'redux-saga/effects';

import { IPokemon, Action } from '../../reducer';
import { getPokemons } from '../../services/pokemons';
import {
  fetchPaginatedPokemonsOk,
  fetchPaginatedPokemonsError,
  pokemonsSetLoader,
  pokemonsUnsetLoader,
} from '../slices';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* fetchPokemons(action: Action) {
  yield put(pokemonsSetLoader());
  try {
    const pokemons: IPokemon[] = yield call(getPokemons, action.payload);
    yield put(fetchPaginatedPokemonsOk(pokemons));
  } catch (e) {
    yield put(fetchPaginatedPokemonsError(e.message));
  } finally {
    yield put(pokemonsUnsetLoader());
  }
}
