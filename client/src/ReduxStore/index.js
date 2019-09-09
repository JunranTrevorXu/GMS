import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistReducer, persistStore } from "redux-persist";
import immutableTransform from "redux-persist-transform-immutable";
import storage from "redux-persist/lib/storage";

import { combineReducers } from "redux";
import { reducer as UserReducer } from "./User/Reducer";

import rootSaga from "../Saga/index";

const persistConfig = {
  transforms: [immutableTransform()],
  key: "root",
  blacklist: [],
  storage
};

function _combineReducers() {
  return combineReducers({
    user: UserReducer
  });
}

const rootReducer = _combineReducers();

const sagaMiddleware = createSagaMiddleware();

// Redux persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
