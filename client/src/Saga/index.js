import { all, takeLatest } from "redux-saga/effects";
import { UserTypes } from "../ReduxStore/User/Actions";

import { getUserInfo, getFriend, getFriendRequest } from "./UserSaga";

export default function* root() {
  yield all([
    takeLatest(UserTypes.GET_USER_INFO, getUserInfo),
    takeLatest(UserTypes.GET_FRIEND, getFriend),
    takeLatest(UserTypes.GET_FRIEND_REQUEST, getFriendRequest)
  ]);
}
