const connection = require("../config/dbConfig");

const postCtrl = {
  showEveryPost: async (req, res) => {
    const query = "SELECT * FROM post ORDER BY id DESC";
    // 먼저 kakao_id가 존재하는지 확인
    connection.query(query, (err, results) => {
      if (err) {
        return res.send(err);
      }
      res.send(results);
    });
  },
  createPost: async (createField) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO post SET ?";
      // 먼저 kakao_id가 존재하는지 확인
      connection.query(query, [createField], (err, results) => {
        if (err) {
          return reject(err);
        }
        // 새로 추가된 사용자 정보 반환
        connection.query(
          "SELECT * FROM post WHERE id = ?",
          [results.insertId],
          (err, newPostResult) => {
            if (err) {
              return reject(err);
            }

            resolve(newPostResult[0]);
          }
        );
      });
    });
  },
  editPostById: async (id, editFields) => {
    return new Promise((resolve, reject) => {
      // 먼저 id가 존재하는지 확인
      connection.query(
        "SELECT * FROM post WHERE id = ?",
        [id],
        (err, results) => {
          if (err) {
            return reject(err);
          }

          // 해당 id를 가진 사용자가 존재하지 않는 경우
          if (results.length === 0) {
            return reject("post not found");
          }

          // 사용자 정보 업데이트
          connection.query(
            "UPDATE post SET ? WHERE id = ?",
            [editFields, id],
            (err, editResult) => {
              if (err) {
                return reject(err);
              }

              // 업데이트된 사용자 정보 반환
              connection.query(
                "SELECT * FROM post WHERE id = ?",
                [id],
                (err, editPostResult) => {
                  if (err) {
                    return reject(err);
                  }

                  resolve(editPostResult);
                }
              );
            }
          );
        }
      );
    });
  },
  deletePostById: async (id) => {
    connection.query("DELETE FROM post WHERE id = ?", [id], (err, results) => {
      if (err) {
        return reject(err);
      }
    });
  },
};

module.exports = postCtrl;
