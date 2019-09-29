import { createReducer } from "reduxsauce";
import { InitialState } from "./InitialState";
import { Map } from "immutable";
import { UserTypes } from "./Actions";

function setUserInfo(state, { id, email, nickname }) {
  return state.merge({
    id,
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

function friendStartTyping(state, { friendId }) {
  let friendTyping = state.get("friendTyping");
  let newFriendTyping = {};

  // fucking firefox support
  for (let friend of Object.keys(friendTyping)) {
    newFriendTyping[friend] = friendTyping[friend];
  }

  newFriendTyping[friendId] = true;

  return state.merge({
    friendTyping: Map(newFriendTyping)
  });
}

function friendStopTyping(state, { friendId }) {
  let friendTyping = state.get("friendTyping");
  let newFriendTyping = {};

  for (let friend of Object.keys(friendTyping)) {
    newFriendTyping[friend] = friendTyping[friend];
  }

  newFriendTyping[friendId] = false;

  return state.merge({
    friendTyping: Map(newFriendTyping)
  });
}

export const reducer = createReducer(InitialState, {
  [UserTypes.SET_USER_INFO]: setUserInfo,
  [UserTypes.SET_FRIEND]: setFriend,
  [UserTypes.SET_FRIEND_REQUEST]: setFriendRequest,
  [UserTypes.FRIEND_START_TYPING]: friendStartTyping,
  [UserTypes.FRIEND_STOP_TYPING]: friendStopTyping
});
