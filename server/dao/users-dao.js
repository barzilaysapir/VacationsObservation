let connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");

async function login(user) {
    let sql = "SELECT * FROM users where username = ? and password = ?";
    let parameters = [user.username, user.password];
    let usersLoginResult;

    try {
        usersLoginResult = await connection.executeWithParameters(sql, parameters);
    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), err);
    }

    // In case user details doesn't exists on DB 
    if (usersLoginResult == null || usersLoginResult.length == 0) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    return usersLoginResult[0];
}

async function addUser(user) {
    let sql = "INSERT INTO users (username, password, first_name, last_name) values(?, ?, ?, ?)";
    let parameters = [user.username, user.password, user.firstName, user.lastName];

    try {
        await connection.executeWithParameters(sql, parameters);
    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
}

async function updateUserDetails(updatedUserDetails, userId) {
    let sql = `UPDATE users SET 
                username = ?, first_name = ?, last_name = ? 
                WHERE id = ? `;

    let parameters = [updatedUserDetails.username, updatedUserDetails.firstName, updatedUserDetails.lastName, userId];

    try {
        await connection.executeWithParameters(sql, parameters);
    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
}

async function deleteUser(userId) {
    let sql = "DELETE FROM users WHERE id = ?";
    let parameters = [userId];

    try {
        await connection.executeWithParameters(sql, parameters);
    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
}

async function getUserDetails(userId) {
    let sql = `SELECT 
                username, 
                password, 
                first_name AS firstName, 
                last_name AS lastName
                FROM users WHERE id = ? `;
    let parameters = [userId];

    let userDetails = await connection.executeWithParameters(sql, parameters);
    return userDetails;
}


// VALIDATION 

async function isUserExistByName(username) {
    let sql = "SELECT * FROM users WHERE username = ?";
    let parameters = [username];
    let registeryResponse;

    try {
        registeryResponse = await connection.executeWithParameters(sql, parameters);
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), e);
    }

    // Not exists
    if (registeryResponse == null || registeryResponse.length == 0) {
        return false;
    }

    // Exists
    return true;
}

module.exports = {
    login,
    addUser,
    updateUserDetails,
    deleteUser,
    isUserExistByName,
    getUserDetails
};
