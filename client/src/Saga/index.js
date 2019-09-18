import { all, takeLatest } from "redux-saga/effects";
import { UserTypes } from "../ReduxStore/User/Actions";

import {
  getUserInfo,
  getFriend,
  getFriendRequest,
  sendFriendRequest,
  acceptFriendRequest
} from "./UserSaga";

export default function* root() {
  yield all([
    takeLatest(UserTypes.GET_USER_INFO, getUserInfo),
    takeLatest(UserTypes.GET_FRIEND, getFriend),
    takeLatest(UserTypes.GET_FRIEND_REQUEST, getFriendRequest),
    takeLatest(UserTypes.SEND_FRIEND_REQUEST, sendFriendRequest),
    takeLatest(UserTypes.ACCEPT_FRIEND_REQUEST, acceptFriendRequest)
  ]);
}
