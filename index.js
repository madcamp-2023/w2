const express = require("express");
const app = express();
const port = 3000;

const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

const setUpSocket = require("./chat");
setUpSocket(io);

const bodyParser = require("body-parser");

const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const chatRouter = require("./routes/chatRouter");
const chatRoomRouter = require("./routes/chatRoomRouter");
const mapRouter = require("./routes/mapRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // URL-encoded 본문을 위한 파서

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("made by 박정민 & 정해준");
});

server.listen(port, () => {
  console.log(`Express Listening @ ${port}`);
});

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/chat", chatRouter);
app.use("/chatRoom", chatRoomRouter);
app.use("/map", mapRouter);
app.use('/uploads', express.static('uploads'));