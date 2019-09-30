import { put, call } from "redux-saga/effects";
import * as UserService from "../ApiService/UserService";
import UserActions from "../ReduxStore/User/Actions";

export function* getUserInfo() {
  const response = yield call(UserService.getUserInfo);
  if (response.data.OK) {
    const data = response.data;
    yield put(UserActions.setUserInfo(data.id, data.email, data.nickname));
  }
}

export function* getFriend() {
  const response = yield call(UserService.getFriend);
  if (response.data.OK) {
    const data = response.data;
    yield put(UserActions.setFriend(data.friendList));
    for (let i = 0; i < data.friendList.length; i++) {
      yield put(
        UserActions.getFriendMessage(data.friendList[i].id, 20, 0, true)
      );
    }
  }
}

export function* getFriendRequest() {
  const response = yield call(UserService.getFriendRequest);
  if (response.data.OK) {
    const data = response.data;
    yield put(UserActions.setFriendRequest(data.requestList));
  }
}

export function* sendFriendRequest(action) {
  yield call(UserService.sendFriendRequest, action.toUserEmail);
}

export function* acceptFriendRequest(action) {
  const response = yield call(
    UserService.acceptFriendRequest,
    action.fromUserId
  );
  if (response.data.OK) {
    yield put(UserActions.getFriendRequest());
    yield put(UserActions.getFriend());
  }
}

export function* getFriendMessage(action) {
  yield put(UserActions.setFriendMessageLoading(action.friendId, true));
  const response = yield call(
    UserService.getFriendMessage,
    action.friendId,
    action.limit,
    action.skip
  );
  if (response.data.OK) {
    yield put(
      UserActions.setFriendLastMessageAction(action.friendId, "insert")
    );
    yield put(
      UserActions.insertFriendMessage(
        action.friendId,
        response.data.messages,
        action.refresh
      )
    );
    yield put(UserActions.setFriendMessageLoading(action.friendId, false));
  }
}
