import mysqlConnection from './index';

function createUser(email): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`insert into USER (id, email) values (uuid(), "${email}");`,
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
                    resolve({id: results.length > 0 ? results[0].id : null})
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
                    resolve({auth: results.length > 0})
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

export {
    createUser,
    getUserId,
    login,
    setNickname,
    setPassword,
};