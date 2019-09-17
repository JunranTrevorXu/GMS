import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  getUserInfo: null,
  setUserInfo: ["email", "nickname"],
  getFriend: null,
  setFriend: ["friend"],
  getFriendRequest: null,
  setFriendRequest: ["friendRequest"]
});

export const UserTypes = Types;
export default Creators;
