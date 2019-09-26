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
  friendStopTyping: ["friendId"]
});

export const UserTypes = Types;
export default Creators;
