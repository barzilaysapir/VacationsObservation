const express = require("express");
const expressServer = express();

const http = require("http");
const socketIO = require("socket.io");
const cache = require("./cache-controller");
const httpServer = http.createServer(expressServer); 
const socketServer = socketIO(httpServer, { cors: { origin: ['http://localhost:3001', 'http://localhost:3002', 'http://localhost:3004'] } });

let userIdToSocketsMap = new Map();

socketServer.on("connection", socket => {
    console.log("Connection request");

    let handshakeData = socket.request;
    let token = handshakeData._query['token'].substring("Bearer ".length);
    let id = cache.get(token).id;

    userIdToSocketsMap.set(id, socket);
    console.log("One client has been connected... Total clients: " +
        userIdToSocketsMap.size + " " + JSON.stringify(userIdToSocketsMap));

    socket.on("disconnect", () => {
        let handshakeData = socket.request;
        let token = handshakeData._query['token'].substring("Bearer ".length);
        let id = cache.get(token).id;

        if (!id) {
            return;
        }

        userIdToSocketsMap.delete(id);
        console.log("Client has been disconnected. Total clients: " + userIdToSocketsMap.size);
    });

});

function asyncBroadcast(event, senderId) {
    for (let [userId, socket] of userIdToSocketsMap) {
        if (senderId != userId) {
            socket.emit(event.eventType, event.parameters);
        }
    }
}

httpServer.listen(3002, console.log(`Listening on port 3002`));
module.exports = { asyncBroadcast };

