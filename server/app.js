
const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const path = require('path');
const { Socket } = require('socket.io');

dotenv.config();
const app = express();

app.use(cors())

const Port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '../client/build')));
app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"))
);


const server = app.listen(Port, console.log(`server run port ${Port}`))

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
    }

})
io.on("connection", (socket) => {
    console.log("user connected : ", socket.id);
    socket.on("send_mess", (data) => {
        const { joinId, msg, username } = data
        console.log({ data })
        socket.to(joinId).emit("receive_mess", { msg, username });
        // socket.emit("receive_mess", msg);
    })

    socket.on("join_room", (data) => {
        const { joinId, username } = data
        socket.join(joinId);
        socket.emit("join_successful", username);
    })
})
