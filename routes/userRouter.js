const express = require("express");
const axios = require("axios");
const app = express();
const userCtrl = require("../controllers/userCtrl");
const router = express.Router();
const REST_API_KEY = "406d35070a2f8f7ca0e51a1e894ffdc6";
const REDIRECT_URI = "http://143.248.229.183:8081/auth/kakao/callback";
const fs = require("fs");
const { randomUUID } = require('crypto');

// JSON 요청을 처리하기 위한 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // URL-encoded 본문을 위한 파서

// 카카오 사용자 정보 요청 라우트
router.route("/login").post(async (req, res) => {
  console.log("login");
  const AUTHORIZE_CODE = req.body.AUTHORIZE_CODE; // 프론트엔드에서 전달받은 access token

  // Exchange the authorization code for an access token
  const response = await axios.post(
    "https://kauth.kakao.com/oauth/token",
    {
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: AUTHORIZE_CODE,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const { access_token } = response.data;

  console.log(access_token);

  const userRequest = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-type": "application/json",
    },
  });

  const userData = userRequest.data;

  // res.send(userData)

  const user = await userCtrl.findOrCreateUser(
    userData.id,
    userData.properties.nickname,
    userData.properties.profile_image
  );
  res.send(user);
});

// 카카오 로그아웃 라우트
router.route("/logout").post(async (req, res) => {
  const accessToken = req.body.accessToken; // 프론트엔드에서 전달받은 access token

  try {
    // 카카오 로그아웃 API 호출
    await axios.post('https://kapi.kakao.com/v1/user/logout', {}, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    res.status(200).send("Successfully logged out");
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).send("Error during logout");
  }
});

router.route("/").patch(async (req, res) => {
  const id = req.body.id;
  const newName = req.body.name;
  const newLocation = req.body.location;
  const newBio = req.body.bio;
  const newImage = req.body.image;

  // 'data:image/jpeg;base64,' 부분을 제거
  const base64Data = newImage.replace(/^data:image\/jpeg;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  console.log(buffer);

  const filePath = `./uploads/profile/${randomUUID()}.jpeg`; // 저장할 파일 경로

  // 이미지 파일 저장
  fs.writeFile(filePath, buffer, async (err) => {
    if (err) {
      return res.status(500).send("Error saving the image");
    }

    // 파일을 Base64 문자열로 인코딩
    fs.readFile(filePath, { encoding: "base64" }, async (err, base64Image) => {
      if (err) {
        return res.status(500).send("Error reading the image file");
      }

      // 데이터베이스에 Base64 문자열 저장
      const user = await userCtrl.editUserById(id, {
        name: newName,
        location: newLocation,
        bio: newBio,
        image: base64Image, // Base64 인코딩된 이미지 문자열
      });
      res.send(user);
    });
  });
});

module.exports = router;
