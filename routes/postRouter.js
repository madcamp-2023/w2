const express = require("express");
const app = express();
const postCtrl = require("../controllers/postCtrl");
const mapCtrl = require("../controllers/mapCtrl");
const router = express.Router();
const fs = require("fs");

// JSON 요청을 처리하기 위한 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // URL-encoded 본문을 위한 파서

router.route("/").get(postCtrl.showEveryPost);

router.route("/").patch(async (req, res) => {
  const id = req.body.id;
  const newImage = req.body.image;
  const newTitle = req.body.title;
  const newBody = req.body.body;
  const newLocation = req.body.location;
  const newPrice = req.body.price;
  const newDue = req.body.due;

  const post = await postCtrl.editPostById(id, {
    image: newImage,
    title: newTitle,
    body: newBody,
    location: newLocation,
    price: newPrice,
    due: newDue,
  });
  res.send(post);
});

router.route("/").delete(async (req, res) => {
  const id = req.query.id;
  await postCtrl.deletePostById(id);
});

router.route("/create").post(async (req, res) => {
  const image = req.body.image;
  const title = req.body.title;
  const body = req.body.body;
  const location = req.body.location;
  const price = req.body.price;
  const user_id = req.body.user_id;
  const user_name = req.body.user_name;
  const user_image = req.body.user_image;
  const due = req.body.due;
  const zip_location = location;

  const unzip_location = zip_location.split(/[\(\)]/);
  const map_name = unzip_location[0];
  const label = unzip_location[1].replace(/\d+/g, "");
  const latitudeLongitude = await mapCtrl.findLatitudeLongitude(map_name);
  const latitude = latitudeLongitude.latitude;
  const longitude = latitudeLongitude.longitude;

  
  // 'data:image/jpeg;base64,' 부분을 제거
  const base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  console.log(buffer);

  const filePath = `./uploads/post/${user_id}${Date.now()}.jpeg`

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

      console.log(base64Image);

      // 데이터베이스에 Base64 문자열 저장
      const post = await postCtrl.createPost({
        image: base64Image,
        title: title,
        body: body,
        location: location,
        price: price,
        user_id: user_id,
        user_name: user_name,
        user_image: user_image,
        due: due,
        latitude: latitude,
        longitude: longitude,
        label: label,
      });
      res.send(post);
    });
  });
});

module.exports = router;
