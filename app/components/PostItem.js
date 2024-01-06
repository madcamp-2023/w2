import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PostItem = ({ title, content, price, location, timestamp, onPress }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.postContainer}
      onPress={() =>
        navigation.navigate("MyPostDetail", {
          title,
          content,
          price,
          location,
          timestamp,
        })
      }
    >
      <Image
        source={{
          uri: "https://github.com/haejunejung/haejunejung.github.io/assets/99087502/d2817771-d076-4012-af8d-b2bd9330eea7",
        }}
        style={styles.postImage}
      />
      <View style={styles.post}>
        <View style={styles.postCotent__left}>
          <Text style={styles.postTitle}>{title}</Text>
          <Text style={styles.postContent}>{content}</Text>
          <Text style={styles.postPrice}>{price}</Text>
        </View>
        <View style={styles.postContent__right}>
          <Text style={styles.location}>{location}</Text>
          <Text style={styles.timestamp}>{timestamp}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  postContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#ffffff",
  },
  postImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  post: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  postCotent__left: {
    flexDirection: "column",
  },
  postContent__right: {
    flexDirection: "column",
  },
});
