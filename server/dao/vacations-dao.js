let connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");

// ALL
async function getAllVacations() {
    let sql = `SELECT 
                v.id,
                v.destination,
                v.description,
                v.image_url AS imageUrl,
                v.start_date AS startDate,
                v.end_date AS endDate,
                v.price,

                CASE
                    WHEN followed.vacation_id IS NOT NULL THEN 1
                    ELSE 0
                END AS 'isFollowed',

                CASE
                    WHEN fv.followers IS NOT NULL THEN fv.followers
                    ELSE 0
                END AS 'amountOfFollowers'

                FROM vacations v

                        LEFT JOIN
                    (SELECT vacation_id FROM followed_vacations WHERE user_id = null) followed 
                    ON v.id = followed.vacation_id

                        LEFT JOIN
                    (SELECT vacation_id, COUNT(vacation_id) AS 'followers'
                    FROM
                        followed_vacations
                    GROUP BY vacation_id) fv ON v.id = fv.vacation_id`;

    try {
        let allVacations = await connection.execute(sql);
        return allVacations;
    }
    catch (err) {
        console.error(err);
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
}


// USER
async function getUsersFollowing(userId) {
    let sql = `SELECT 
                    vacation_id AS 'vacationId'
                FROM
                    followed_vacations
                WHERE
                    user_id = ?`;

    let parameters = [userId];
    let userFollowedVacations = await connection.executeWithParameters(sql, parameters);
    return userFollowedVacations;
}

async function followVacation(vacation, user) {
    let sql = `INSERT INTO followed_vacations 
               (vacation_id, user_id) 
               VALUES(?, ?)`;

    let parameters = [vacation.vacationId, user.id];

    try {
        await connection.executeWithParameters(sql, parameters);
    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
}

async function unfollowVacation(vacationId, userId) {
    let sql = `Delete FROM followed_vacations WHERE vacation_id = ? AND user_id = ?`;
    let parameters = [vacationId, userId];

    try {
        await connection.executeWithParameters(sql, parameters);
    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
}


// ADMIN
async function getChartData() {
    let sql = `SELECT 
                    vacation_id AS id,
                    COUNT(vacation_id) AS 'amountOfFollowers'
                FROM
                    followed_vacations
                GROUP BY vacation_id`;
    try {
        return await connection.execute(sql);
    }
    catch (err) {
        console.error(err);
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
}

async function addVacation(newVacation) {
    let sql = `INSERT INTO vacations 
               (id, destination, image_url, description, price, start_date, end_date) 
               VALUES(?, ?, ?, ?, ?, ?, ?) `;

    let formattedStartDate = newVacation.startDate.split("T");
    let formattedEndDate = newVacation.endDate.split("T");

    let parameters = [newVacation.id,
    newVacation.destination, newVacation.imageUrl, newVacation.description, newVacation.price,
    formattedStartDate[0], formattedEndDate[0]];

    try {
        await connection.executeWithParameters(sql, parameters);
    } catch (err) {
        console.error(err);
    }
}

async function editVacation(vacation) {
    let sql = `UPDATE vacations SET 
        destination = ? , image_url = ? , description = ? , price = ? , 
        start_date = ? , end_date = ?  
        where id = ? `;

    let formattedStartDate = vacation.startDate.split("T");
    let formattedEndDate = vacation.endDate.split("T");

    let parameters = [
        vacation.destination, vacation.imageUrl, vacation.description, vacation.price,
        formattedStartDate[0], formattedEndDate[0], vacation.id];

    try {
        await connection.executeWithParameters(sql, parameters);
    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
}

async function deleteVacation(vacationId) {
    // (BTS: on foreign key delete - CASCADE)

    let sql = `Delete FROM vacations WHERE id = ?`;
    let parameters = [vacationId];

    try {
        await connection.executeWithParameters(sql, parameters);
    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
}

async function getVacation(id) {
    let sql = `SELECT 
                id, 
                destination,
                image_url AS imageUrl,
                description,
                price,
                start_date AS startDate,
                end_date AS endDate 
                FROM vacations 
                WHERE id = ? `;
    let parameters = [id];

    try {
        let vacation = await connection.executeWithParameters(sql, parameters);
        return vacation;
    }
    catch (err) {
        console.error(err);
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
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
