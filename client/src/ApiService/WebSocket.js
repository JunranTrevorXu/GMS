import io from "socket.io-client";
import { store } from "../ReduxStore/index";
import UserActions from "../ReduxStore/User/Actions";

const socket = io("http://localhost:1994");

var timeoutId;

socket.on("messageSent", () => {});

socket.on("message", ({ fromUserId, message }) => {});

socket.on("typing", ({ fromUserId }) => {
  if (timeoutId) clearTimeout(timeoutId);

  store.dispatch(UserActions.friendStartTyping(fromUserId));
  timeoutId = setTimeout(
    store.dispatch(UserActions.friendStopTyping(fromUserId)),
    1000
  );
});

export default socket;
