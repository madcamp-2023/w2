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
    connection.query(query, {user1_id: user1_id, user2_id: user2_id}, (err, results) => {
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
    });
  },
};

module.exports = chatRoomCtrl;
