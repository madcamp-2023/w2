const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

const REST_API_KEY = "406d35070a2f8f7ca0e51a1e894ffdc6";
const REDIRECT_URI = "http://127.0.0.1:8081/auth/kakao/callback";

// JSON 요청을 처리하기 위한 미들웨어
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.send({ message: "GET 요청 성공!" });
  console.log("!");
});

app.post("/api/test", (req, res) => {
  console.log(req.body); // POST 요청의 본문을 콘솔에 출력
  res.send({ message: "POST 요청 성공!", receivedData: req.body });
});

// 카카오 사용자 정보 요청 라우트
app.post("/user/kakao", async (req, res) => {
  const AUTHORIZE_CODE = req.body.AUTHORIZE_CODE; // 프론트엔드에서 전달받은 access token

  console.log(AUTHORIZE_CODE);

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

  console.log(response.data.access_token);

  const { access_token } = response.data;
  console.log(access_token);

  const userRequest = await (
    await fetch("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-type": "application/json",
      },
    })
  ).json();

  console.log(userRequest);

  // try {
  //   // 카카오 API를 사용하여 사용자 정보 가져오기
  //   const userInfoResponse = await axios.get(
  //     "https://kapi.kakao.com/v2/user/me",
  //     {
  //       headers: {
  //         Authorization: `Bearer ${access_token}`,
  //       },
  //     }
  //   );

  //   const userInfo = userInfoResponse.data;

  //   console.log(userInfo);
  //   // 사용자 정보를 기반으로 필요한 처리 수행
  //   // 예: 사용자 정보 확인, 데이터베이스에 저장 등

  //   res.json(userInfo); // 사용자 정보 응답
  // } catch (error) {
  //   console.error(error.data);
  //   res.status(500).send("Error retrieving user information");
  // }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
