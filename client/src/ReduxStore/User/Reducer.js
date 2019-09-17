import { createReducer } from "reduxsauce";
import { InitialState } from "./InitialState";
import { UserTypes } from "./Actions";

function setUserInfo(state, { email, nickname }) {
  return state.merge({
    email,
    nickname
  });
}

function setFriend(state, { friend }) {
  return state.merge({
    friend
  });
}

function setFriendRequest(state, { friendRequest }) {
  return state.merge({
    friendRequest
  });
}

export const reducer = createReducer(InitialState, {
  [UserTypes.SET_USER_INFO]: setUserInfo,
  [UserTypes.SET_FRIEND]: setFriend,
  [UserTypes.SET_FRIEND_REQUEST]: setFriendRequest
});
