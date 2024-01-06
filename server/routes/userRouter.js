const express = require("express");
const axios = require("axios");
const app = express();
// const userCtrl = require("../controllers/userCtrl");
const router = express.Router();
const PORT = 3001;

const REST_API_KEY = "406d35070a2f8f7ca0e51a1e894ffdc6";
const REDIRECT_URI = "http://127.0.0.1:8081/auth/kakao/callback";

// JSON 요청을 처리하기 위한 미들웨어
app.use(express.json());

app.use(express.urlencoded({ extended: true })); // URL-encoded 본문을 위한 파서

router.get("/test", async (req, res) => {
  const messeaage = await userCtrl.testUser("test", "test", "test");
  res.send(messeaage);
});

// 카카오 사용자 정보 요청 라우트
router.post("/login", async (req, res) => {
  console.log(req.body)
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

	console.log(userRequest)
  // const user = userCtrl.findOrCreateUser(userRequest.id, userRequest.properties.nickname, userRequest.properties.profile_image);
 //  res.send(user);
});

module.exports = router;
