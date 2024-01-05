const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// JSON 요청을 처리하기 위한 미들웨어
app.use(express.json());

// 카카오 사용자 정보 요청 라우트
app.post('/user/kakao', async (req, res) => {
    const accessToken = req.body.accessToken; // 프론트엔드에서 전달받은 access token

    try {
        // 카카오 API를 사용하여 사용자 정보 가져오기
        const userInfoResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const userInfo = userInfoResponse.data;

        console.log(userInfo);
        // 사용자 정보를 기반으로 필요한 처리 수행
        // 예: 사용자 정보 확인, 데이터베이스에 저장 등

        res.json(userInfo); // 사용자 정보 응답
    } catch (error) {
        console.error(error.data);
        res.status(500).send('Error retrieving user information');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
