const ServerError = require("./../errors/server-error");
const ErrorType = require("./../errors/error-type");
let vacationsDao = require("../dao/vacations-dao");
let pushController = require("../controllers/push-controller");

// ALL
async function getAllVacations() {
    return await vacationsDao.getAllVacations();
}


// USER
async function getUsersFollowing(userId) {
    return await vacationsDao.getUsersFollowing(userId);
}

async function followVacation(vacation, userId) {
    await vacationsDao.followVacation(vacation, userId);
}

async function unfollowVacation(vacationId, userId) {
    await vacationsDao.unfollowVacation(vacationId, userId);
}


// ADMIN
async function getChartData() {
    return await vacationsDao.getChartData();
}

async function addVacation(userType, vacationDetails, senderId) {
    // Validate all fields are filled in
    if (!vacationDetails.destination || !vacationDetails.imageUrl || !vacationDetails.description ||
        !vacationDetails.startDate || !vacationDetails.endDate) {
        throw new ServerError(ErrorType.REQUIRED_FIELDS_MISSING);
    }
    if (!userType == "ADMIN") {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    await vacationsDao.addVacation(vacationDetails);
    let addEvent = { eventType: 'ADD_VACATION', parameters: vacationDetails };
    pushController.asyncBroadcast(addEvent, senderId);
}

async function editVacation(userType, vacation, senderId) {
    if (!vacation.destination || !vacation.imageUrl || !vacation.description ||
        !vacation.price || !vacation.startDate || !vacation.endDate) {
        throw new ServerError(ErrorType.REQUIRED_FIELDS_MISSING);
    }
    if (!userType == "ADMIN") {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }
    
    await vacationsDao.editVacation(vacation);
    let editEvent = { eventType: 'EDIT_VACATION', parameters: vacation };
    pushController.asyncBroadcast(editEvent, senderId);

}

async function deleteVacation(userType, vacationId, senderId) {
    if (!userType == "ADMIN") {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }
    await vacationsDao.deleteVacation(vacationId);
    let deleteEvent = { eventType: 'DELETE_VACATION', parameters: vacationId };
    pushController.asyncBroadcast(deleteEvent, senderId);
}

async function getVacation(vacationId) {
    return await vacationsDao.getVacation(vacationId);
}


module.exports = {
    // all
    getAllVacations,
    // user
    followVacation,
    unfollowVacation,
    getUsersFollowing,
    // admin
    getChartData,
    addVacation,
    editVacation,
    deleteVacation,
    getVacation
};
