import { call, put, select } from 'redux-saga/effects';

import { ICaughtPokemon, Action } from '../../reducer';
import { postCaughtPokemon } from '../../services/pokemons';
import {
  addCaughtPokemon,
  selectUserId,
} from '../slices';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* postAndAddCaughtPokemon(action: Action) {
  const userId: number = yield select(selectUserId);
  const dataToSend: ICaughtPokemon = {
    ...action.payload,
    caughtDate: new Date().toLocaleString(),
  };
  const createdCaughtPokemon: ICaughtPokemon = yield call(postCaughtPokemon, userId, dataToSend as ICaughtPokemon);
  if (createdCaughtPokemon) {
    yield put(addCaughtPokemon(createdCaughtPokemon));
  }
}
