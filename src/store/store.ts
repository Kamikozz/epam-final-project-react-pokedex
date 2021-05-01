import { createStore, compose, applyMiddleware } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../store/sagas';

import rootReducer from "../reducer";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    devToolsEnhancer({}),
  ),
);

// then run the saga
sagaMiddleware.run(rootSaga);

export default store;
