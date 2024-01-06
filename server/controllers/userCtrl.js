const connection = require("../config/dbConfig");

const usrtCtrl= {
  // test용 함수
  testUser: async (kakao_id, name, image) => {
    return new Promise((resolve, reject) => {
      const user = { kakao_id: kakao_id, name: name, image: image, bio: null };
      const query = 'INSERT INTO user SET ?';

      connection.query(query, user, (err, results) => {
        if (err) {
          return reject(err);
        }

        connection.query('SELECT * FROM user', (err, results) => {
          if (err) {
            return reject(err);
          }
          console.log(results);
          resolve(results);
        });
      });
    });
  },
  // 처음 로그인때 kakao_id가 존재하는지 확인하고, 없으면 추가
  findOrCreateUser: async (kakao_id, name, image) => {
    return new Promise((resolve, reject) => {
      // 먼저 kakao_id가 존재하는지 확인
      connection.query('SELECT * FROM user WHERE kakao_id = ?', [kakao_id], (err, results) => {
        if (err) {
          return reject(err);
        }

        // 이미 존재하는 경우, 해당 row 반환
        if (results.length == 1) {
          console.log(results)
          return resolve(results[0]);
        }
        // 해당하는 user가 2명 이상인 경우 오류 반환
        else if (results.length > 1) {
          return reject('Duplicated user');
        }
        // 존재하지 않는 경우, 새로 추가
        else{
          const newUser = { kakao_id: kakao_id, name: name, image: image, bio: null };
          connection.query('INSERT INTO user SET ?', newUser, (err, insertResult) => {
            if (err) {
              return reject(err);
            }
            console.log(insertResult)
            console.log("에라이")

            // 새로 추가된 사용자 정보 반환
            connection.query('SELECT * FROM user WHERE id = ?', [insertResult[0].id], (err, newUserResult) => {
              if (err) {
                return reject(err);
              }

              resolve(newUserResult[0]);
            });
          });
        }
      });
    });
  },
  // user의 id를 집어넣으면 user 정보를 반환
  findUser: async (id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM user WHERE id = ?';

      connection.query(query, [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results[0]);
      });
    });
  },
  // user의 id와 바꿀 정보를 입력하면 해당 user의 정보를 업데이트
  updateUserById: async (id, updatedFields) => {
    return new Promise((resolve, reject) => {
      // 먼저 id가 존재하는지 확인
      connection.query('SELECT * FROM user WHERE id = ?', [id], (err, results) => {
        if (err) {
          return reject(err);
        }
  
        // 해당 id를 가진 사용자가 존재하지 않는 경우
        if (results.length === 0) {
          return reject('User not found');
        }
  
        // 사용자 정보 업데이트
        connection.query('UPDATE user SET ? WHERE id = ?', [updatedFields, id], (err, updateResult) => {
          if (err) {
            return reject(err);
          }
  
          // 업데이트된 사용자 정보 반환
          connection.query('SELECT * FROM user WHERE id = ?', [id], (err, updatedUserResult) => {
            if (err) {
              return reject(err);
            }
  
            resolve(updatedUserResult[0]);
          });
        });
      });
    });
  },
}

module.exports = usrtCtrl;