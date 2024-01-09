const express = require("express");
const axios = require("axios");
const app = express();
const userCtrl = require("../controllers/userCtrl");
const router = express.Router();
const REST_API_KEY = "406d35070a2f8f7ca0e51a1e894ffdc6";
const REDIRECT_URI = "http://143.248.229.183:8081/auth/kakao/callback";

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

router.route("/").patch(async (req, res) => {
  const id = req.body.id;
  const newName = req.body.name;
  const newLocation = req.body.location; 
  const newBio = req.body.bio;
  const newImage = req.body.image;

  const user = await userCtrl.editUserById(
    id,
    {
      name: newName,
      location: newLocation,
      bio: newBio,
      image: newImage,
    }
  );
  res.send(user);
});

module.exports = router;