const express = require("express");
const app = express();
const mapCtrl = require("../controllers/mapCtrl");
const router = express.Router();

// JSON 요청을 처리하기 위한 미들웨어
router.use(express.json());
router.use(express.urlencoded({ extended: true })); // URL-encoded 본문을 위한 파서

router.route("/").get(mapCtrl.showEveryMap);

module.exports = router;
