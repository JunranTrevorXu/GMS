import { Map } from "immutable";

export const InitialState = Map({
  email: null,
  nickname: null,
  friend: [],
  friendRequest: [],
  friendTyping: {},
  fromFriendMessage: {},
  toFriendMessage: {},
});
