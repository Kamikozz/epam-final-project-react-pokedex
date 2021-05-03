import { takeEvery, takeLatest } from 'redux-saga/effects';

import { fetchPokemons } from './fetchPokemons';
import { fetchCaughtPokemons } from './fetchCaughtPokemons';
import { fetchNextPagePokemons } from './fetchNextPagePokemons';
import { postAndAddCaughtPokemon } from './postAndAddCaughtPokemon';
import {
  CaughtPokemonsActionType, PokemonsActionType, PaginatedPokemonsActionType,
} from '../slices';

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* rootSaga() {
  yield takeEvery(PokemonsActionType.FETCH_REQUESTED, fetchPokemons);
  yield takeEvery(CaughtPokemonsActionType.FETCH_REQUESTED, fetchCaughtPokemons);
  yield takeEvery(
    PaginatedPokemonsActionType.FETCH_NEXT_PAGE_POKEMONS_REQUESTED, fetchNextPagePokemons,
  );
  yield takeEvery(CaughtPokemonsActionType.POST_AND_ADD_ONE_REQUESTED, postAndAddCaughtPokemon);
}

// /*
//   Alternatively you may use takeLatest.

//   Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
//   dispatched while a fetch is already pending, that pending fetch is cancelled
//   and only the latest one will be run.
// */
// function* rootSaga() {
//   yield takeLatest(ActionType.USER_FETCH_REQUESTED, fetchUser);
// }

export default rootSaga;
