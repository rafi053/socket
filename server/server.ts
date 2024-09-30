import express from 'express';
import http from 'http';
import{ Server} from 'socket.io';
const portClient = 'http://localhost:4000';
const portServer = 3000;

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors:
    {origin: portClient

    }
});

io.on("connection", (socket) => {
    console.log('User is connected!!!');
    socket.on("draw", (data) => {
        socket.broadcast.emit('draw', data)
    })
    
});


io.on("disconnect", () => {
    console.log('User is disconnect!!!');
    
});


server.listen(portServer, ()=> {console.log(`server listen to port:  ${portServer}`);
});
