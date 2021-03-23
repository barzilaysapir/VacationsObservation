const express = require("express");
const cors = require('cors');
const server = express();
const port = process.env.port || 3001;

const usersController = require("./controllers/user-controller");
const vacationsController = require("./controllers/vacations-controller");

const errorHandler = require('./errors/error-handler');
const loginFilter = require('./middleware/login-filter');

server.use(express.json()); // Extract the JSON from the body and create object containing it
server.use(express.static('public'));

server.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3002', 'http://localhost:3004'] }));
server.use(loginFilter());

server.use("/users", usersController);
server.use("/vacations", vacationsController);


server.use(errorHandler);
server.listen(port, () =>
    console.log(`Listening on http://localhost: ${port}`)
);
