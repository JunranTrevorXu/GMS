import mysqlConnection from './index';

function postMessage(fromUserId, toUserId, timestamp, content): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`insert into MESSAGE (timestamp, content) values ("${timestamp}", "${content}")`,
            (error, results) => {
                if (error) {
                    console.log('insert Message error: ', error);
                    reject(error);
                }
                else {
                    console.log('insert Message succeed: ', results);
                    resolve(results.insertId);
                }
            })
    }).then((insertId) => {
        mysqlConnection.query(`insert into CHAT (fromUserId, toUserId, messageId) 
        values (${fromUserId}, ${toUserId}, ${insertId})`,
            (error, results) => {
                if (error) {
                    console.log('insert into chat error: ', error);
                    throw(error);
                }
                else {
                    console.log('insert into chat succeed: ', results);
                    return;
                }
            })
    });
}

function fetchMessage(userAId, userBId, limit, skip): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`select * from MESSAGE inner join CHAT on MESSAGE.id = CHAT.messageId
        where (CHAT.fromUserId = ${userAId} and CHAT.toUserId = ${userBId})
        or (CHAT.fromUserId = ${userBId} and CHAT.toUserId = ${userAId}) 
        order by MESSAGE.timestamp desc, MESSAGE.id desc limit ${skip}, ${limit}`,
            (error, results) => {
                if (error) {
                    console.log('fetch message error: ', error);
                    reject(error);
                }
                else {
                    console.log('fetch message succeed: ', results);
                    resolve(results);
                }
            });
    });
}

export {
    postMessage,
    fetchMessage,
}