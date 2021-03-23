const vacationLogic = require("../logic/vacations-logic");
const cache = require("../controllers/cache-controller");
const express = require("express");
const router = express.Router();

// GET GENERIC VACATIONS LIST
router.get("/", async (request, response, next) => {
    try {
        let allVacations = await vacationLogic.getAllVacations();
        response.json(allVacations);
    }
    catch (err) {
        return next(err);
    }
});


// USER (customer)
// Get user's following list
router.get("/followed", async (request, response, next) => {
    
    try {
        let userId = cache.extractUserDataFromCache(request).id;
        let userVacations = await vacationLogic.getUsersFollowing(userId);
        response.json(userVacations);
    }
    catch (err) {
        return next(err);
    }
});

// Follow vacation
router.post("/followed", async (request, response, next) => {
    let vacation = request.body;
    let userId = cache.extractUserDataFromCache(request);

    try {
        await vacationLogic.followVacation(vacation, userId);
        response.json();
    }
    catch (err) {
        return next(err);
    }
});

// Unfollow vacation
router.delete("/followed/:id", async (request, response, next) => {
    let vacationId = request.params.id;
    let userId = cache.extractUserDataFromCache(request).id;

    try {
        await vacationLogic.unfollowVacation(vacationId, userId);
        response.json();
    }
    catch (err) {
        return next(err);
    }
});


// ADMIN
// Get chart data
router.get("/chart", async (request, response, next) => {
    try {
        let followedVacations = await vacationLogic.getChartData();
        response.json(followedVacations);
    }
    catch (err) {
        return next(err);
    }
});

// Add new vacation
router.post("/", async (request, response, next) => {
    let user = cache.extractUserDataFromCache(request);
    
    try {
        let newVacationDetails = request.body;
        await vacationLogic.addVacation(user.type, newVacationDetails, user.id);
        response.json();

    } catch (err) {
        return next(err);
    }
});

// Edit vacation
router.put("/", async (request, response, next) => {
    
    try {
        let user = cache.extractUserDataFromCache(request);
        let vacationToEdit = request.body;
        await vacationLogic.editVacation(user.type, vacationToEdit, user.id);
        response.json();
    }
    catch (err) {
        return next(err);
    }
});

// Delete vacation
router.delete("/:id", async (request, response, next) => {
    
    try {
        let user = cache.extractUserDataFromCache(request);
        let vacationId = request.params.id;
        await vacationLogic.deleteVacation(user.type, vacationId, user.id);
        response.json("Vacation was deleted successfully");
    }
    catch (err) {
        return next(err);
    }
});

// Get spesific vacation details (not in used on client - I used redux for that)
router.get("/:id", async (request, response, next) => {
    let vacationId = request.params.id;
    
    try {
        let vacationDetails = await vacationLogic.getVacation(vacationId);
        response.json(vacationDetails);
    }
    catch (err) {
        return next(err);
    }
});


module.exports = router;
