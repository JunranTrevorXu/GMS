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
                    resolve({id: results.length > 0 ? results[0].id : null});
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

function logout(userId): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`update ONLINE set online = false where userId = ${userId}`,
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

function getOnline(userId): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`select online from ONLINE where userId = ${userId}`,
            (error, results) => {
                if (error) {
                    console.log('login error: ', error);
                    reject(error);
                }
                else {
                    console.log('login succeed: ', results);
                    resolve({online: results.length > 0 ? results[0].online : null});
                }
            });
    });
}

function sendFriendRequest(fromUserId, toUserId): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`insert into FRIEND_REQUEST (fromUserId, toUserId, viewed) values (${fromUserId}, ${toUserId}, false)`,
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

function acceptFriendRequest(fromUserId, toUserId): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`update FRIEND_REQUEST set viewed = true where fromUserId = ${fromUserId} and toUserId = ${toUserId}`,
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

function addFriend(userAId, userBId): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`insert into FRIEND (userAId, userBId) values (${userAId}, ${userBId})`,
            (error, results) => {
                if (error) {
                    console.log('login error: ', error);
                    reject(error);
                }
                else {
                    console.log('login succeed: ', results);
                    resolve();
                }
            })
        .then(() => {
            mysqlConnection.query(`insert into FRIEND (userAId, userBId) values (${userBId}, ${userAId})`,
                (error, results) => {
                    if (error) {
                        console.log('login error: ', error);
                        reject(error);
                    }
                    else {
                        console.log('login succeed: ', results);
                        resolve();
                    }
                })
        })
    });
}

export {
    createUser,
    getUserId,
    login,
    logout,
    setNickname,
    setPassword,
    createOnline,
    setOnline,
    sendFriendRequest,
    acceptFriendRequest,
    addFriend,
};