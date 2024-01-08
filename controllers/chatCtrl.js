const connection = require("../config/dbConfig");
const userCtrl = require("./userCtrl");

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
  saveChat: async (req, res) => {
    const room_id = req.body.room_id;
    const user_id = req.body.user_id;
    const message = req.body.mesage;

    const chat = {
      room_id: room_id,
      user_id: user_id,
      message: message,
    };

    const query = "INSERT INTO chat SET ?";

    connection.query(query, chat, (err, results) => {
      if (err) {
        return res.send(err);
      }
      res.send(results);
      connection.query(
        "SELECT * FROM chat WHERE id = ?",
        [results.insertId],
        (err, newChatResult) => {
          if (err) {
            return res.send(err);
          }
          res.send(newChatResult[0]);
        }
      );
    });
  },
};

module.exports = chatCtrl;
