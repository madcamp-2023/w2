const { accessToken } = req.body;

const { data } = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`
);

console.log(data)

// hgfd
const express = require('express');
const mysql = require('mysql');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
});

const CLIENT_ID = 'YOUR_CLIENT_ID'; // Google Cloud Console에서 받은 클라이언트 ID
const client = new OAuth2Client(CLIENT_ID);

app.post('/googlelogin', async (req, res) => {
  const { token } = req.body;
  
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const userid = payload['sub'];

    // 데이터베이스에서 사용자 확인
    db.query(
      'SELECT * FROM users WHERE google_id = ?',
      [userid],
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          if (results.length === 0) {
            // 사용자가 데이터베이스에 없으면 새로운 사용자로 등록
            db.query(
              'INSERT INTO users (google_id, name, email) VALUES (?, ?, ?)',
              [userid, payload.name, payload.email],
              (error, results) => {
                if (error) {
                  console.error(error);
                  res.status(500).json({ error: 'Internal server error' });
                } else {
                  res.status(200).json({ message: 'User created successfully' });
                }
              }
            );
          } else {
            res.status(200).json({ message: 'User already exists' });
          }
        }
      }
    );
  } catch (error) {
    console.error('Error verifying Google token:', error);
    res.status(400).json({ error: 'Token verification failed' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
