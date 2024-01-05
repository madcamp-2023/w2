const express = require('express'); //express를 설치했기 때문에 가져올 수 있다.
const app = express();
const winston = require('winston');
const logger = winston.createLogger();
const fetch = require('node-fetch');

const getUserInfo = async (url, access_token) => {
    try {
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'Authorization': `Bearer ${access_token}`
            }
        }).then(res => res.json());
    }catch(e) {
        logger.info("error", e);
    }
};

app.get('/user/login', async (req, res) => {
    const access_token = "tRELhQocYC2FYRFZFhywOVO-pXqxfNyKV_8jvk6AHAzjAsJV6fdPSpdAFLAKPXVcAAABjNnTLfSxu3fh8M0xkQ"
    const userInfo = await getUserInfo('https://kapi.kakao.com/v2/user/me', access_token);
    console.log(userInfo);
    res.send(userInfo);
})

app.listen(8081);