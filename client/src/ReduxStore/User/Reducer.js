import { createReducer } from "reduxsauce";
import { InitialState } from "./InitialState";
import { UserTypes } from "./Actions";

function setUserInfo(state, { id, email, nickname }) {
  return state.merge({
    id,
    email,
    nickname
  });
}

function setIsLoggedIn(state, { isLoggedIn }) {
  return state.merge({
    isLoggedIn
  });
}

export const reducer = createReducer(InitialState, {
  [UserTypes.SET_USER_INFO]: setUserInfo,
  [UserTypes.SET_IS_LOGGED_IN]: setIsLoggedIn
});
