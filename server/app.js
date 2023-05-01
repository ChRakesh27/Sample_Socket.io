
const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const path = require('path');
const { Socket } = require('socket.io');

dotenv.config();
const app = express();

app.use(cors())

const Port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '/build')));
app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname + "/build/index.html"))
);


const server = app.listen(Port, console.log(`server run port ${Port}`))

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
    }

})






io.on("connection", (socket) => {
    console.log(`user connected ${socket.id}`);
    socket.on("send_mess", (data) => {
        // console.log(data);
        socket.to(data.join).emit("receive_mes", data);
    })

    socket.on("join_room", (data) => {
        socket.join(data);
    })

})

