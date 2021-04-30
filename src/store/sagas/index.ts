import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

// import Api from '...';

export enum ActionType {
  USER_FETCH_REQUESTED = 'USER_FETCH_REQUESTED',
  USER_FETCH_SUCCEEDED = 'USER_FETCH_SUCCEEDED',
  USER_FETCH_FAILED = 'USER_FETCH_FAILED',
};

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
   try {
      const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: ActionType.USER_FETCH_SUCCEEDED, user: user});
   } catch (e) {
      yield put({type: ActionType.USER_FETCH_FAILED, message: e.message});
   }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* rootSaga() {
  yield takeEvery(ActionType.USER_FETCH_REQUESTED, fetchUser);
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* rootSaga() {
  yield takeLatest(ActionType.USER_FETCH_REQUESTED, fetchUser);
}

export default rootSaga;
