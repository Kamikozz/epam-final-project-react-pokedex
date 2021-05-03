import { call, put, select } from 'redux-saga/effects';

import { ICaughtPokemon, Action } from '../../reducer';
import { getCaughtPokemons, IGetCaughtPokemonsParams } from '../../services/pokemons';
import {
  fetchCaughtPokemonsOk,
  fetchCaughtPokemonsError,
  caughtPokemonsSetLoader,
  caughtPokemonsUnsetLoader,
  selectUserId,
} from '../slices';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* fetchCaughtPokemons(action: Action) {
  yield put(caughtPokemonsSetLoader());
  const params: IGetCaughtPokemonsParams = {
    ...action.payload as IGetCaughtPokemonsParams,
    userId: action.payload.userId ? action.payload.userId : yield select(selectUserId),
  };
  try {
    const caughtPokemons: ICaughtPokemon[] = yield call(getCaughtPokemons, params);
    yield put(fetchCaughtPokemonsOk(caughtPokemons));
  } catch (e) {
    yield put(fetchCaughtPokemonsError(e.message));
  } finally {
    yield put(caughtPokemonsUnsetLoader());
  }
}
