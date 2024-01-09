const connection = require("../config/dbConfig");

const chatCtrl = {
  testUser: async (req, res) => {
    console.log("testChat");
  },
  showEveryChat: async (req, res) => {
    const room_id = req.query.room_id;
    console.log(room_id);
    // console.log(req)
    const query = "SELECT * FROM chat WHERE room_id = ? ORDER BY id DESC ";
    connection.query(query, [room_id], (err, results) => {
      if (err) {
        return res.send(err);
      }
      res.send(results);
    });
  },
  saveChat: (req) => {
    const room_id = req.room_id;
    const user_id = req.user_id;
    const message = req.message;

    const chat = {
      room_id: room_id,
      user_id: user_id,
      message: message,
    };

    const query = "INSERT INTO chat SET ?";
    connection.query(query, chat, (err, results) => {
      if (err) {
        return err;
      }
      connection.query(
        "UPDATE chat_room SET last_chat = ? WHERE room_id = ?",
        [message, room_id],
        (err, _) => {
          if (err) {
            return err;
          }
          connection.query(
            "SELECT * FROM chat WHERE id = ?",
            [results.insertId],
            (err, newChatResult) => {
              if (err) {
                return err;
              }
              return newChatResult[0];
            }
          );
        }
      );
    });
  },
  makeAllRead: (room_id,user_id) => {
    const query = "UPDATE chat SET is_read = 1 WHERE room_id = ? AND user_id <> ?";
    connection.query(query, [room_id, user_id], (err, results) => {
      if (err) {
        return res.send(err);
      }
    });
  },
};

module.exports = chatCtrl;
