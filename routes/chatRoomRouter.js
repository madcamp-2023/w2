const express = require("express");
const app = express();
const chatRoomCtrl = require("../controllers/chatRoomCtrl");
const router = express.Router();

// JSON 요청을 처리하기 위한 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // URL-encoded 본문을 위한 파서

router.route("/").get(chatRoomCtrl.showEveryChatRoom);
router.route("/").post(chatRoomCtrl.makeChatRoom);

module.exports = router;
