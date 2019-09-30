import io from "socket.io-client";
import { store } from "../ReduxStore/index";
import UserActions from "../ReduxStore/User/Actions";

const socket = io("http://localhost:1994");

var timeoutId;

socket.on("message", ({ fromUserId, timestamp, message }) => {
  const messageObj = { timestamp, content: message, fromUserId, id: -1 };
  store.dispatch(UserActions.setFriendLastMessageAction(fromUserId, "append"));
  store.dispatch(UserActions.appendFriendMessage(fromUserId, messageObj));
});

socket.on("messageSent", ({ toUserId, timestamp, message }) => {
  const messageObj = { timestamp, content: message, toUserId, id: -1 };
  store.dispatch(UserActions.setFriendLastMessageAction(toUserId, "append"));
  store.dispatch(UserActions.appendFriendMessage(toUserId, messageObj));
});

socket.on("typing", ({ fromUserId }) => {
  if (timeoutId) clearTimeout(timeoutId);

  store.dispatch(UserActions.friendStartTyping(fromUserId));
  timeoutId = setTimeout(
    () => store.dispatch(UserActions.friendStopTyping(fromUserId)),
    1000
  );
});

export default socket;
