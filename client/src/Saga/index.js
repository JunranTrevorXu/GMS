import { takeLatest, all } from "redux-saga/effects";
import { UserTypes } from "../ReduxStore/User/Actions";

export default function* root() {
  yield all([]);
}
