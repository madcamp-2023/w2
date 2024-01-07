import { useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import LabelInput from "./LabelInput";
import { userState } from "../recoil/recoil";
import { useRecoilValue } from "recoil";

import axios from "axios";

export default function PostCreate() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [due, setDue] = useState(new Date()); // 날짜 상태
  const [show, setShow] = useState(false); // DateTimePicker 표시 상태

  const user = useRecoilValue(userState);

  const handleSubmit = () => {
    function getCurrentDateTime() {
      const now = new Date();

      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더해줍니다.
      const day = String(now.getDate()).padStart(2, "0");

      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
    }

    const duee = getCurrentDateTime();
    const created_time = getCurrentDateTime();

    axios
      .post(URI + "/post/create", {
        image: image,
        title: title,
        body: body,
        location: location,
        price: price,
        user_id: user.id,
        user_name: user.name,
        user_image: user.image,
        due: eeee,
        created_time: created_time,
      })
      .then((response) => console.log(response));
  };

  return (
    <View>
      <View>
        <AntDesign
          name="arrowleft"
          size={30}
          onPress={() => navigation.navigate("ProfileHome")}
        />
      </View>
      <View>
        <View>
          <Image
            source={{
              uri: "https://github.com/haejunejung/haejunejung.github.io/assets/99087502/d2817771-d076-4012-af8d-b2bd9330eea7",
            }}
            style={styles.image}
          />
        </View>
        <View>
          <LabelInput
            label="제목"
            value={title}
            onChangeText={setTitle}
            placeholder="제목을 입력하세요."
          />
          <LabelInput
            label="위치"
            value={location}
            onChangeText={setLocation}
            placeholder="위치를 입력하세요."
          />
          <LabelInput
            label="가격"
            value={price}
            onChangeText={setPrice}
            placeholder="가격을 입력하세요."
          />
          <LabelInput
            label="마감 기한"
            value={due}
            onChangeText={setDue}
            placeholder="마감 기한을 선택하세요."
          />
          <LabelInput
            label="내용"
            value={body}
            onChangeText={setBody}
            placeholder="내용을 입력하세요."
          />
          <Button title="수정하기" onPress={handleSubmit} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 200, // 원하는 너비
    height: 200, // 원하는 높이
    borderRadius: 100, // 이미지를 원형으로 만들고 싶은 경우
  },
});
