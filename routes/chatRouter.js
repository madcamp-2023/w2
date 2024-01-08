const express = require("express");
const app = express();
const chatCtrl = require("../controllers/chatCtrl");
const router = express.Router();

// JSON 요청을 처리하기 위한 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // URL-encoded 본문을 위한 파서

router.route("/").get(chatCtrl.showEveryChat);

module.exports = router;
