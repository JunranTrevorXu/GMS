import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  getUserInfo: null,
  setUserInfo: ["id", "email", "nickname"],
  getFriend: null,
  setFriend: ["friend"],
  getFriendRequest: null,
  setFriendRequest: ["friendRequest"],
  sendFriendRequest: ["toUserEmail"],
  acceptFriendRequest: ["fromUserId"],
  friendStartTyping: ["friendId"],
  friendStopTyping: ["friendId"],
  getFriendMessage: ["friendId", "limit", "skip", "refresh"],
  insertFriendMessage: ["friendId", "messages", "refresh"],
  setFriendMessageLoading: ["friendId", "loading"],
  appendFriendMessage: ["friendId", "message"],
  setFriendLastMessageAction: ["friendId", "action"],
  enqueueFriendSendingMessage: ["friendId", "message"],
  dequeueFriendSendingMessage: ["friendId"]
});

export const UserTypes = Types;
export default Creators;
