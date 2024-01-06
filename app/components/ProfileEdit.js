import { useState } from "react";
import { Alert, Button, Image, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AntDesign from "react-native-vector-icons/AntDesign";
import LabelInput from "./LabelInput";

const ProfileEdit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const navigation = useNavigation();

  const handleSubmit = () => {
    //TODO: POST
    Alert.alert("프로필 업데이트!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign
          name="back"
          size={30}
          onPress={() => navigation.navigate("ProfileHome")}
        />
      </View>
      <View style={styles.content}>
        <Image
          source={{
            uri: "https://github.com/haejunejung/haejunejung.github.io/assets/99087502/d2817771-d076-4012-af8d-b2bd9330eea7",
          }}
          style={styles.image}
        />
        <LabelInput
          label="이름"
          value={name}
          onChangeText={setName}
          placeholder="여기에 입력하세요"
        />
        <LabelInput
          label="이메일"
          value={email}
          onChangeText={setEmail}
          placeholder="여기에 입력하세요"
        />
        <LabelInput
          label="자기소개"
          value={bio}
          onChangeText={setBio}
          placeholder="여기에 setBio"
        />
        <Button title="수정하기" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    alignSelf: "flex-start",
    padding: 10,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
});

export default ProfileEdit;
