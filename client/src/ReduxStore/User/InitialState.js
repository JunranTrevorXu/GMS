import { Map } from "immutable";

export const InitialState = Map({
  id: null,
  email: null,
  nickname: null,
  friend: [],
  friendRequest: [],
  friendTyping: {},
  fromFriendMessage: {},
  toFriendMessage: {}
});
