import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PostItem from "../components/PostItem";

import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("ProfileEdit");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profile} onPress={handlePress}>
        <Text style={{ marginRight: 20 }}>이름</Text>
        <Image
          source={{
            uri: "https://github.com/haejunejung/haejunejung.github.io/assets/99087502/d2817771-d076-4012-af8d-b2bd9330eea7",
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <View style={styles.post}>
        <View style={styles.post__header}>
          <Text style={styles.text}>내가 올린 글</Text>
          <Text style={styles.text}>내가 좋아하는 글</Text>
        </View>
        <View style={styles.post__main}>
          <PostItem
            title="title"
            content="content"
            price="price"
            location="location"
            timestamp="timestamp"
          />
        </View>
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
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },

  post__main: {
    flex: 1,
    flexDirection: "column",
  },

  text: {
    padding: 10,
  },
});
