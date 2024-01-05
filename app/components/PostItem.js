import { Image, StyleSheet, Text, View } from "react-native";

const PostItem = ({ title, content, price, location, timestamp }) => {
  return (
    <View style={styles.postItem}>
      <Image
        source={{
          uri: "https://github.com/haejunejung/haejunejung.github.io/assets/99087502/d2817771-d076-4012-af8d-b2bd9330eea7",
        }}
        style={styles.postImage}
      />
      <View style={styles.postContent}>
        <View style>
          <Text style={styles.postTitle}>{title}</Text>
          <Text style={styles.postContent}>{content}</Text>
          <Text style={styles.postPrice}>{price}</Text>
        </View>
        <View>
          <Text style={styles.location}>{location}</Text>
          <Text style={styles.timestamp}>{timestamp}</Text>
        </View>
      </View>
    </View>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  postItem: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
  },
  postImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  postContent: {
    flex: 1,
    justifyContent: "center",
  },
  postTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  postExcerpt: {
    fontSize: 14,
    color: "#666",
  },
  postStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    marginLeft: 4,
    marginRight: 8,
  },
});
