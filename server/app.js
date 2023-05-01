
const express = require('express');
const cors = require('cors');
const path = require('path');
const { Socket } = require('socket.io');

const app = express();

app.use(cors())

const Port = 5000;

app.use('/', function (req, res, next) {

    const options = {
        root: path.join(__dirname)



    };

    const fileName = '/mychart/index.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
            next();
        }
    });
});

app.get('/', function (req, res) {
    console.log("File Sent")
    res.send();
});












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

