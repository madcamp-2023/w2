const connection = require("../config/dbConfig");

const chatRoomCtrl = {
  testUser: async (req, res) => {
    console.log("testChat");
  },
  showEveryChatRoom: async (req, res) => {
    const query = "SELECT * FROM chat_room ORDER BY id DESC";
    connection.query(query, (err, results) => {
      if (err) {
        return res.send(err);
      }
      res.send(results);
    });
  },
  makeChatRoom: async (req, res) => {
    const user1_id = req.body.user1_id;
    const user2_id = req.body.user2_id;
    const post_id = req.body.post_id;
    const query = "INSERT INTO chat_room SET ?";
    connection.query(
      query,
      { user1_id: user1_id, user2_id: user2_id },
      (err, results) => {
        if (err) {
          return res.send(err);
        }
        connection.query(
          "UPDATE post SET chat_number = chat_number + 1 WHERE id = ?",
          [post_id],
          (err, Result) => {
            if (err) {
              return res.send(err);
            }
          }
        );
        connection.query(
          "SELECT * FROM chat_room WHERE id = ?",
          [results.insertId],
          (err, newChatRoomResult) => {
            if (err) {
              return res.send(err);
            }
            res.send(newChatRoomResult[0]);
          }
        );
      }
    );
  },
  updateLastChat: (room_id) => {
    const query =`
    UPDATE chat_room 
    SET last_chat = (SELECT message FROM chat WHERE room_id = ${room_id} ORDER BY id DESC LIMIT 1),
        last_chat_time = (SELECT created_time FROM chat WHERE room_id = ${room_id} ORDER BY id DESC LIMIT 1)
    WHERE id = ${room_id};
    `
    connection.query(
      query,
      (err, results) => {
        if (err) {
          return res.send(err);
        }
      }
    );
  },
  updateUnread: (room_id, user1_id, user2_id) => {
    // user1이 안 읽은 채팅의 개수는 user1_unread에 저장
    const query = `
    UPDATE chat_room
    SET user1_unread = (
      SELECT COUNT(*)
      FROM chat
      WHERE user_id <> ${user1_id} AND is_read = 0 AND room_id = ${room_id}
    ),
    user2_unread = (
      SELECT COUNT(*)
      FROM chat
      WHERE user_id <> ${user2_id} AND is_read = 0 AND room_id = ${room_id}
    )
    WHERE id = ${room_id};
  `;
    connection.query(query, (err, results) => {
      if (err) {
        return res.send(err);
      }
    });
  },
};

module.exports = chatRoomCtrl;
