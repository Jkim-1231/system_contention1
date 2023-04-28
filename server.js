const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = 3000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    console.log("ユーザーが接続しました");
    socket.on("good button", (gob) => {
        // console.log("メッセージ:" + gob);
        io.emit("good button", gob);
    });
    // socket.on("disconnect", () => {
    //     console.log("ユーザーが切断されました");
    // });

    socket.on('startTimer', () => {
        let time = 300;
    
        const timer = setInterval(() => {
          time--;
          const minutes = Math.floor(time / 60)
            .toString()
            .padStart(2, '0');
          const seconds = (time % 60).toString().padStart(2, '0');
          const currentTime = `${minutes}:${seconds}`;
          io.emit('updateTimer', currentTime);
    
          if (time <= 0) {
            clearInterval(timer);
          }
        }, 1000);
      });
});

server.listen(PORT , ()=>{
    console.log("listening on 3000");
});