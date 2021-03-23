const expressJwt = require("express-jwt");
const config = require("../config.json");

let { secret } = config;

function authenticateJwtRequestToken() {
    return expressJwt({ secret, algorithms: ["HS256"] }).unless({
        path: [
            // Get vacations for guests
            '/vacations',

            // Register
            '/users',

            // Login
            '/users/login',
        ]
    });
}

module.exports = authenticateJwtRequestToken;