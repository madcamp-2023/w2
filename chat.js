// chat.js
const chatCtrl = require("./controllers/chatCtrl");
const chatRoomCtrl = require("./controllers/chatRoomCtrl");
// :)
/*
프론트에서 채팅하기 버튼 누르면 방 생성(DB)하고 socket.connect(), 방 id로 join room
메세지 보내면 chat message 이벤트 발생, io.to(room_id).emit("chat message", msg)로 메세지 전송.
chat message 이벤트 받으면 DB에 저장하고 프론트에 전송.
나가면 leave room 하고 socket.disconnect() 
*/

const setUpSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("socket entered: "+socket.id);
    console.log("A user connected");

    io.on("disconnect", (input) => {
      console.log(input.room_id)
      console.log("User disconnected");
    });

    socket.on("join room", (input) =>{
      console.log("Joined room: "+input.room_id);
      socket.join(input.room_id);
      console.log(socket.adapter.rooms)
    })

    // 나갈 때 DB에 있는 거 다 읽음 처리
    socket.on("leave room", (input) =>{
      console.log("Left room: "+input.room_id);
      socket.leave(input.room_id);
      console.log(socket.adapter.rooms)
    })

    // 메세지 보내면 DB에 저장하고 프론트에 전송
    socket.on("send chat", (input) => {
      console.log("send chat");
      console.log("room_id: " + input.room_id+ " msg: "+input.msg);
      socket.to(input.room_id).emit("receive chat ", input.msg);
    });

    socket.on("receive chat ", (input) => {
      console.log("receive chat ");
      console.log("room_id: " + input.room_id+ " msg: "+input.msg);
    });
  });
};

module.exports = setUpSocket;