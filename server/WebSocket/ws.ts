const moment = require('moment');

import * as mysqlUser from "../Database/MySql/user";
import * as mysqlChat from '../Database/MySql/chat';
import webpush from "../Service/webpush";

var user_socket_map = {};

function unregisterUserSocket(userId) {
    console.log("unregister: ", userId);
    user_socket_map[userId] = null;
}

export default function attachWebSocketServer(server) {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
        socket.on('register', ({ userId }) => {
            console.log("register: ", userId);
            user_socket_map[userId] = socket.id;
        });

        socket.on('typing', ({ fromUserId, toUserId }) => {
            console.log("typing: ", fromUserId, toUserId);
            if (user_socket_map[toUserId]) {
                io.to(user_socket_map[toUserId]).emit('typing', { fromUserId });
            }
        });

        socket.on('message', async ({ fromUserId, toUserId, message }) => {
            const timestamp = moment(new Date()).utc().format('YYYY-MM-DD HH:mm:ss');
            io.to(user_socket_map[fromUserId]).emit('messageSent', { toUserId, timestamp, message });
            if (user_socket_map[toUserId]) {
                io.to(user_socket_map[toUserId]).emit('message', { fromUserId, timestamp, message });
            }
            else {
                // web push
                const subscribeData = await mysqlUser.getSubscribe(toUserId);
                const pushSubscriptionObj = {
                    endpoint: subscribeData.endpoint,
                    keys: {
                        auth: subscribeData.auth,
                        p256dh: subscribeData.p256dh,
                    }
                };
                const fromUserInfo = await mysqlUser.getUserInfo(fromUserId);
                const payloadObj = {
                    notification: true,
                    message: 'New message',
                    nickname: fromUserInfo.nickname
                };
                webpush.sendNotification(pushSubscriptionObj, Buffer.from(JSON.stringify(payloadObj)));
            }
            await mysqlChat.postMessage(fromUserId, toUserId, timestamp, message);
        });
    });
}

export {
    unregisterUserSocket
}