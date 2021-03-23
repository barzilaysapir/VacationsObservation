const userLogic = require('../logic/users-logic');
const cache = require("../controllers/cache-controller");
const express = require('express');
const router = express.Router();

// LOGIN
router.post("/login", async (request, response, next) => {
    let userLoginDetails = request.body;
    
    try {
        let successfullLoginData = await userLogic.login(userLoginDetails);
        response.json(successfullLoginData);

    } catch (err) {
        return next(err);
    }
});

// REGISTER
router.post("/", async (request, response, next) => {
    let newUserDetails = request.body;
    
    try {
        let successfullRegister = await userLogic.addUser(newUserDetails);
        response.json(successfullRegister);

    } catch (err) {
        return next(err);
    }
});

// GET USER DETAILS (for editing)
router.get("/", async (request, response, next) => {
    let userId = cache.extractUserDataFromCache(request).id;
    
    try {
        let userDetails = await userLogic.getUserDetails(userId);
        response.json(userDetails);

    } catch (err) {
        console.error(err);
        return next(err);
    }
});

// UPDATE USER DETAILS
router.put("/", async (request, response, next) => {
    let updatedUserDetails = request.body;
    let userDataFromCache = cache.extractUserDataFromCache(request);
    
    try {
        await userLogic.updateUserDetails(updatedUserDetails, userDataFromCache);
        response.json();
        
    } catch (err) {
        return next(err);
    }
});

// DELETE USER from system
router.delete("/", async (request, response, next) => {
    let userId = cache.extractUserDataFromCache(request).id;
    
    try {
        await userLogic.deleteUser(userId);
        response.json();
    }
    catch (err) {
        return next(err);
    }
});


module.exports = router;
