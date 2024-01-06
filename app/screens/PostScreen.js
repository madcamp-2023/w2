import { StyleSheet, Text, View } from "react-native";
import PostItem from "../components/PostItem";

import { useNavigation } from "@react-navigation/native";
import AntDesgin from "react-native-vector-icons/AntDesign";

export default function PostScreen() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("ProfileEdit");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header__location}>
          <Text style={styles.header__location__text}>어은동</Text>
          <AntDesgin
            name="down"
            size={30}
            style={styles.header__location__select}
          />
        </View>
        <View>
          <AntDesgin
            name="search1"
            size={30}
            onPress={() => navigation.navigate("PostSearch")}
          />
        </View>
      </View>
      <View style={styles.post}>
        <View style={styles.post__header}>
          <Text style={styles.text}>피드로 보기</Text>
          <Text style={styles.text}>지도로 보기</Text>
          <Text style={styles.text}>가격 높은 순</Text>
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

  header: {
    flexDirection: "row",
  },

  header__location: {
    flex: 1,
    flexDirection: "row",
  },

  header__location__text: {
    marginRight: 10,
    backgroundColor: "#FFF",
  },

  header__location__select: {
    marginLeft: 10,
    backgroundColor: "#fff",
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
