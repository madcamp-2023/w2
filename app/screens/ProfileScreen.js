import { useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";

import LabelInput from "../components/LabelInput";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Text style={{ marginRight: 20 }}>이름</Text>
        <Image
          source={{
            uri: "https://github.com/haejunejung/haejunejung.github.io/assets/99087502/d2817771-d076-4012-af8d-b2bd9330eea7",
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.post}>
        <View style={styles.post__header}>
          <Text style={styles.text}>내가 올린 글</Text>
          <Text style={styles.text}>내가 좋아하는 글</Text>
        </View>
        <View style={styles.post__main}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  profile: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 30,
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 20,
  },

  post: {
    flex: 1,
    flexDirection: "column",
  },

  post__header: {
    flex: 1,
    flexDirection: "row",
    borderBlockColor: 10,
  },

  text: {
    padding: 10,
  },
});
