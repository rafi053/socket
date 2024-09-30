"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const portClient = 'http://localhost:4000';
const portServer = 3000;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: { origin: portClient
    }
});
io.on("connection", (socket) => {
    console.log('User is connected!!!');
    socket.on("draw", (data) => {
        socket.broadcast.emit('draw', data);
    });
});
io.on("disconnect", () => {
    console.log('User is disconnect!!!');
});
server.listen(portServer, () => {
    console.log(`server listen to port:  ${portServer}`);
});
