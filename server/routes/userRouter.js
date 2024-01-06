const express = require("express");
const axios = require("axios");
const app = express();
const userCtrl = require("../controllers/userCtrl");
const router = express.Router();
const PORT = 3000;

const REST_API_KEY = "19f2b58bfe96f4d595bcd0d00819f21b";
const REDIRECT_URI = "http://143.248.196.188:8000/auth/kakao/callback";

// JSON 요청을 처리하기 위한 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // URL-encoded 본문을 위한 파서

router.route("/test").get(async (req, res) => {
  const messeaage = await userCtrl.testUser("test", "test", "test");
  res.send(messeaage);
});

// 카카오 사용자 정보 요청 라우트
router.route("/login").post(async (req, res) => {
  console.log(req.body)
  console.log("???", req.body.AUTHORIZE_CODE)
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

  const userRequest = await (
    await fetch("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-type": "application/json",
      },
    })
  ).json();

  const user = userCtrl.findOrCreateUser(userRequest.id, userRequest.properties.nickname, userRequest.properties.profile_image);
  res.send(user);
});

module.exports = router;