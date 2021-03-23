const ServerError = require("./../errors/server-error");
const ErrorType = require("./../errors/error-type");
const usersDao = require("../dao/users-dao");

const cache = require("../controllers/cache-controller");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const config = require('../config.json');

const RIGHT_SALT = "gtrhusgrh";
const LEFT_SALT = "f56sb4%^Y";


async function login(user) {
    validateRequiredInputs(user);
    user = hashPassword(user);

    let userLoginData = await usersDao.login(user);
    let saltedUserName = LEFT_SALT + userLoginData.username + RIGHT_SALT;
    const token = jwt.sign({ sub: saltedUserName }, config.secret);

    cache.set(token, userLoginData);
    let response = { token, userType: userLoginData.type };
    return response;
}

async function addUser(user) {
    validateRequiredInputs(user);
    user = hashPassword(user);

    if (await usersDao.isUserExistByName(user.username)) {
        throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
    }
    
    await usersDao.addUser(user);
}

async function updateUserDetails(updatedUserDetails, userDataFromCache) {
    // Validate the user entered his password
    if (updatedUserDetails.password == '') {
        throw new ServerError(ErrorType.PASSWORD_FIELD_MISSING);
    }

    updatedUserDetails = hashPassword(updatedUserDetails);

    // Validate the password is correct
    if (updatedUserDetails.password != userDataFromCache.password) {
        throw new ServerError(ErrorType.INCORRECT_PASSWORD);
    }

    let userId = userDataFromCache.id;
    await usersDao.updateUserDetails(updatedUserDetails, userId);
}

async function deleteUser(userId) {
    await usersDao.deleteUser(userId);
}

async function getUserDetails(userId) {
    return await usersDao.getUserDetails(userId);
}


// VALIDATIONS
function validateRequiredInputs(user) {
    if (user.username == null && user.password == null) {
        throw new ServerError(ErrorType.REQUIRED_FIELD_MISSING);
    }
    else if (user.username == null) {
        throw new ServerError(ErrorType.USERNAME_FIELD_MISSING);
    }
    else if (user.password == null) {
        throw new ServerError(ErrorType.PASSWORD_FIELD_MISSING);
    }
}

function hashPassword(user) {
    user.password = crypto.createHash("md5")
        .update(LEFT_SALT + user.password + RIGHT_SALT).digest('hex');
    return user;
}

module.exports = {
    login,
    addUser,
    updateUserDetails,
    deleteUser,
    getUserDetails
};
