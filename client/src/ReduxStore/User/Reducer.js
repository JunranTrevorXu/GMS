import { createReducer } from "reduxsauce";
import { InitialState } from "./InitialState";
import { UserTypes } from "./Actions";

function loggingIn(state) {
  state.merge({
    loggingIn: true
  });
}

function loggingOut(state) {
  state.merge({
    loggingOut: true
  });
}

function setIsLoggedIn(state, isLoggedIn) {
  state.merge({
    isLoggedIn
  });
}

export const reducer = createReducer(InitialState, {
  [UserTypes.LOGGING_IN]: loggingIn,
  [UserTypes.LOGGING_OUT]: loggingOut,
  [UserTypes.SET_IS_LOGGED_IN]: setIsLoggedIn
});
