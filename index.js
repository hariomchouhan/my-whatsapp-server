import express from "express";
import 'dotenv/config';
import cors from 'cors';
import { Connection } from "./src/Config/DbConfig.js";
import bodyParser from "body-parser";
import route from './src/Routes/route.js'

const app = express();

app.use(cors());
app.use(express.json());

// app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));



// ################### Socket.io ###################

import { Server } from 'socket.io';

const io = new Server(9000, {
    cors: {
        origin: `${process.env.FRONTEND_URL}`
    }
})

let users = [];

const addUser = (userData, socketId) => {
    !users.some(user => user.sub == userData.sub) && users.push({ ...userData, socketId });
}

const getUser = (userId) => {
    return users.find(user => user.sub === userId);
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

io.on('connection', (socket) => {
    console.log(`user connected`);

    socket.on("addUsers", userData => {
        addUser(userData, socket.id);
        io.emit('getUsers', users);
    })

    socket.on("sendMessage", data => {
        const user = getUser(data.receiverId);
        io.to(user.socketId).emit('getMessage', data);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    })
})

// ################### Socket.io ################### 



const PORT = process.env.SERVER_PORT || 8000;


app.use('/', route);
app.listen(PORT, () => {
    console.log(`Server is running successfully on ${PORT}`);
    Connection();
})