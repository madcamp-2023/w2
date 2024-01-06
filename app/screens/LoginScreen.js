// LoginForm.js
import React, { useState } from "react";
import { Button, View, Modal, Image, StyleSheet, Text } from "react-native";
import KakaoLogin from "../components/KakaoLogin";

export default function LoginScreen({ handleIsLoggedIn }) {
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);

  const handleLoginSuccess = (code) => {
    setLoginModalVisible(false);
    // handleIsLoggedIn(true);
    console.log(code);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://github.com/haejunejung/haejunejung.github.io/assets/99087502/d2817771-d076-4012-af8d-b2bd9330eea7",
        }}
        style={styles.image}
      />

      <Button title='Kakao Login' onPress={() => setLoginModalVisible(true)} />
      <Modal visible={isLoginModalVisible}>
        <KakaoLogin onLoginSuccess={handleLoginSuccess} />
      </Modal>
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
