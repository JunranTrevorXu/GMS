import mysqlConnection from './index';

function createUser(email): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`insert into USER (email) values ("${email}");`,
            (error, results) => {
                if (error) {
                    console.log('create user error: ', error);
                    reject(error);
                }
                else {
                    console.log('create user succeed: ', results);
                    resolve();
                }
            });
    });
}

function getUserId(email): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`select id from USER where email = "${email}"`,
            (error, results) => {
                if (error) {
                    console.log('get user Id error: ', error);
                    reject(error);
                }
                else {
                    console.log('get user Id succeed: ', results);
                    resolve(results.length > 0 ? results[0].id : null);
                }
            });
    });
}

function getUserInfo(id):  Promise<any> {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`select email, nickname from USER where id = "${id}"`,
            (error, results) => {
                if (error) {
                    console.log('get user info error: ', error);
                    reject(error);
                }
                else {
                    console.log('get user info succeed: ', results);
                    resolve(results.length > 0 ? results[0] : null);
                }
            });
    });
}

function login(email, password): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`select id from USER where email = "${email}" and password = "${password}"`,
            (error, results) => {
                if (error) {
                    console.log('login error: ', error);
                    reject(error);
                }
                else {
                    console.log('login succeed: ', results);
                    resolve({auth: results.length > 0});
                }
            });
    });
}

function setNickname(id, nickname): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`update USER set nickname = "${nickname}" where id = ${id}`,
            (error, result) => {
                if (error) {
                    console.log('set nickname error: ', error);
                    reject(error);
                }
                else {
                    resolve();
                }
            });
    });
}

function setPassword(id, password): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`update USER set password = "${password}" where id = ${id}`,
            (error, result) => {
                if (error) {
                    console.log('set password error: ', error);
                    reject(error);
                }
                else {
                    resolve();
                }
            });
    });
}

function createOnline(userId): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`insert into ONLINE (userId, online) values (${userId}, false)`,
            (error, results) => {
                if (error) {
                    console.log('login error: ', error);
                    reject(error);
                }
                else {
                    console.log('login succeed: ', results);
                    resolve();
                }
            });
    });
}

function setOnline(userId): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`update ONLINE set online = true where userId = ${userId}`,
            (error, results) => {
                if (error) {
                    console.log('set online error: ', error);
                    reject(error);
                }
                else {
                    console.log('set online succeed: ', results);
                    resolve();
                }
            });
    });
}

function getOnline(userId): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`select online from ONLINE where userId = ${userId}`,
            (error, results) => {
                if (error) {
                    console.log('get online error: ', error);
                    reject(error);
                }
                else {
                    console.log('get online succeed: ', results);
                    resolve({online: results.length > 0 ? results[0].online : null});
                }
            });
    });
}

function setOffline(userId): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`update ONLINE set online = false where userId = ${userId}`,
            (error, results) => {
                if (error) {
                    console.log('set offline error: ', error);
                    reject(error);
                }
                else {
                    console.log('set offline succeed: ', results);
                    resolve();
                }
            });
    });
}

function sendFriendRequest(fromUserId, toUserId): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`insert into FRIEND_REQUEST (fromUserId, toUserId, viewed) values (${fromUserId}, ${toUserId}, false)`,
            (error, results) => {
                if (error) {
                    console.log('send friend request error: ', error);
                    reject(error);
                }
                else {
                    console.log('send friend request succeed: ', results);
                    resolve();
                }
            });
    });
}

function acceptFriendRequest(fromUserId, toUserId): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`update FRIEND_REQUEST set viewed = true where fromUserId = ${fromUserId} and toUserId = ${toUserId}`,
            (error, results) => {
                if (error) {
                    console.log('accept friend request error: ', error);
                    reject(error);
                }
                else {
                    console.log('accept friend request succeed: ', results);
                    resolve();
                }
            });
    });
}

function getFriendRequest(toUserId): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`select USER.id, USER.nickname, USER.email from FRIEND_REQUEST inner join USER 
        on FRIEND_REQUEST.fromUserId = USER.id where FRIEND_REQUEST.toUserId = ${toUserId} and FRIEND_REQUEST.viewed = false`,
            (error, results) => {
                if (error) {
                    console.log('get friend request error: ', error);
                    reject(error);
                }
                else {
                    console.log('get friend request succeed: ', results);
                    resolve(results);
                }
            });
    });
}

function addFriend(userAId, userBId): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`insert into FRIEND (userAId, userBId) values (${userAId}, ${userBId})`,
            (error, results) => {
                if (error) {
                    console.log('add friend  error: ', error);
                    reject(error);
                }
                else {
                    console.log('add friend succeed: ', results);
                    resolve();
                }
            });
    }).then(() => {
        mysqlConnection.query(`insert into FRIEND (userAId, userBId) values (${userBId}, ${userAId})`,
            (error, results) => {
                if (error) {
                    console.log('add friend reverse error: ', error);
                    throw(error);
                }
                else {
                    console.log('add friend reverse succeed: ', results);
                    return;
                }
            });
    });
}

function getFriend(userAId):  Promise<any> {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`select USER.id, USER.nickname, USER.email, ONLINE.online from 
        FRIEND inner join USER on FRIEND.userBId = USER.id
        inner join ONLINE on USER.id = ONLINE.userId where FRIEND.userAId = ${userAId}`,
            (error, results) => {
                if (error) {
                    console.log('get friend  error: ', error);
                    reject(error);
                }
                else {
                    console.log('get friend succeed: ', results);
                    resolve(results);
                }
            });
    });
}

function setEndpoint(endpoint, p256h, auth) {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`insert into ENDPOINT (endpoint, p256h, auth) values ("${endpoint}", "${p256h}", "${auth}")`,
            (error, results) => {
                if (error) {
                    console.log('set endpoint error: ', error);
                    reject(error);
                } else {
                    console.log('set endpoint succeed: ', results);
                    resolve(results.insertId);
                }
            });
    });
}

function getEndpointId(endpoint) {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`select id from ENDPOINT where endpoint = "${endpoint}"`,
            (error, results) => {
                if (error) {
                    console.log('get endpointId error: ', error);
                    reject(error);
                } else {
                    console.log('get endpointId succeed: ', results);
                    resolve({endpointId: results.length > 0 ? results[0].id : null});
                }
            });
    });
}

function getSubscribe(userId) {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`select ENDPOINT.* from ENDPOINT inner join USER_SUBSCRIPTION 
        on ENDPOINT.id = USER_SUBSCRIPTION.endpointId where USER_SUBSCRIPTION.userId = ${userId}`,
            (error, results) => {
                if (error) {
                    console.log('get subscribe error: ', error);
                    reject(error);
                } else {
                    console.log('get subscribe succeed: ', results);
                    resolve(results.length > 0 ? results[0] : null);
                }
            });
    });
}

function subscribe(userId, endpointId) {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`insert into USER_SUBSCRIPTION (userId, endpointId) values (${userId}, ${endpointId})`,
            (error, results) => {
                if (error) {
                    console.log('insert error: ', error);
                    reject(error);
                } else {
                    console.log('insert succeed: ', results);
                    resolve();
                }
            });
    });
}

function preemptSubscribe(userId, endpointId) {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`update USER_SUBSCRIPTION set userId = ${userId} where endpointId = ${endpointId}`,
            (error, results) => {
                if (error) {
                    console.log('preempt error: ', error);
                    reject(error);
                } else {
                    console.log('preempt succeed: ', results);
                    resolve();
                }
            });
    });
}

function removeSubscribe(userId) {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`delete from USER_SUBSCRIPTION where userId = ${userId}`,
            (error, results) => {
                if (error) {
                    console.log('remove error: ', error);
                    reject(error);
                } else {
                    console.log('remove succeed: ', results);
                    resolve();
                }
            });
    });
}

function updateSubscribe(userId, endpointId) {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`update USER_SUBSCRIPTION set endpointId = ${endpointId} where userId = ${userId}`,
            (error, results) => {
                if (error) {
                    console.log('update error: ', error);
                    reject(error);
                } else {
                    console.log('update succeed: ', results);
                    resolve();
                }
            });
    });
}

function checkEndpointOccupation(endpointId) {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`select * from USER_SUBSCRIPTION where endpointId = ${endpointId}`,
            (error, results) => {
                if (error) {
                    console.log('check error: ', error);
                    reject(error);
                } else {
                    console.log('check succeed: ', results);
                    resolve(results.length > 0);
                }
            });
    });
}

export {
    createUser,
    getUserId,
    getUserInfo,
    login,
    setNickname,
    setPassword,
    createOnline,
    setOnline,
    getOnline,
    setOffline,
    sendFriendRequest,
    acceptFriendRequest,
    getFriendRequest,
    addFriend,
    getFriend,
    setEndpoint,
    getEndpointId,
    getSubscribe,
    subscribe,
    preemptSubscribe,
    updateSubscribe,
    removeSubscribe,
    checkEndpointOccupation,
};