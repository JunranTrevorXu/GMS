import { createReducer } from "reduxsauce";
import { InitialState } from "./InitialState";
import { UserTypes } from "./Actions";
import moment from "moment";

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
    friendTyping: newFriendTyping
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
    friendTyping: newFriendTyping
  });
}

function insertFriendMessage(state, { friendId, messages, refresh }) {
  let friendMessage = state.get("friendMessage");
  let newFriendMessage = {};

  for (let friend of Object.keys(friendMessage)) {
    newFriendMessage[friend] = friendMessage[friend];
  }

  if (refresh || !newFriendMessage[friendId]) newFriendMessage[friendId] = [];

  messages.forEach(message => newFriendMessage[friendId].splice(0, 0, message));

  return state.merge({
    friendMessage: newFriendMessage
  });
}

function setFriendMessageLoading(state, { friendId, loading }) {
  let friendMessageLoading = state.get("friendMessageLoading");
  let newFriendMessageLoading = {};

  for (let friend of Object.keys(friendMessageLoading)) {
    newFriendMessageLoading[friend] = friendMessageLoading[friend];
  }

  newFriendMessageLoading[friendId] = loading;

  return state.merge({
    friendMessageLoading: newFriendMessageLoading
  });
}

function appendFriendMessage(state, { friendId, message }) {
  let friendMessage = state.get("friendMessage");
  let newFriendMessage = {};

  for (let friend of Object.keys(friendMessage)) {
    newFriendMessage[friend] = friendMessage[friend];
  }

  if (!newFriendMessage[friendId]) newFriendMessage[friendId] = [];

  for (let i = newFriendMessage[friendId].length - 1; i >= 0; i--) {
    const currentMessageTime = moment(
      newFriendMessage[friendId][i].timestamp,
      "YYYY-MM-DD HH:mm:ss"
    );
    const newMessageTime = moment(message.timestamp)
      .utc()
      .format("YYYY-MM-DD HH:mm:ss");
    if (currentMessageTime.isBefore(newMessageTime)) {
      newFriendMessage[friendId].splice(i + 1, 0, message);
      break;
    }
  }

  if (newFriendMessage[friendId].length === 0) {
    newFriendMessage[friendId].splice(0, 0, message);
  }

  return state.merge({
    friendMessage: newFriendMessage
  });
}

function setFriendLastMessageAction(state, { friendId, action }) {
  let friendLastMessageAction = state.get("friendLastMessageAction");
  let newFriendLastMessageAction = {};

  for (let friend of Object.keys(friendLastMessageAction)) {
    newFriendLastMessageAction[friend] = friendLastMessageAction[friend];
  }

  newFriendLastMessageAction[friendId] = action;

  return state.merge({
    friendLastMessageAction: newFriendLastMessageAction
  });
}

export const reducer = createReducer(InitialState, {
  [UserTypes.SET_USER_INFO]: setUserInfo,
  [UserTypes.SET_FRIEND]: setFriend,
  [UserTypes.SET_FRIEND_REQUEST]: setFriendRequest,
  [UserTypes.FRIEND_START_TYPING]: friendStartTyping,
  [UserTypes.FRIEND_STOP_TYPING]: friendStopTyping,
  [UserTypes.INSERT_FRIEND_MESSAGE]: insertFriendMessage,
  [UserTypes.SET_FRIEND_MESSAGE_LOADING]: setFriendMessageLoading,
  [UserTypes.APPEND_FRIEND_MESSAGE]: appendFriendMessage,
  [UserTypes.SET_FRIEND_LAST_MESSAGE_ACTION]: setFriendLastMessageAction
});
