import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  setUserInfo: ["id", "email", "nickname"],
  setIsLoggedIn: ["isLoggedIn"]
});

export const UserTypes = Types;
export default Creators;
