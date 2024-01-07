import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import AntDesgin from "react-native-vector-icons/AntDesign";

import PostList from "../components/PostList";
import { useState } from "react";
import PostMap from "../components/PostMap";
import Dropdown from "../components/Dropdown";
import DropdownLocation from "../components/DropdownLocation";

export default function PostScreen() {
  const navigation = useNavigation();
  const [nav, setNav] = useState("Feed");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header__location}>
          <DropdownLocation />
        </View>
        <View style={{ marginRight: 10 }}>
          <AntDesgin
            name="search1"
            size={30}
            onPress={() => navigation.navigate("PostSearch")}
          />
        </View>
      </View>
      <View style={styles.post}>
        <View style={styles.post__header}>
          <Text style={styles.text} onPress={() => setNav("Feed")}>
            피드로 보기
          </Text>
          <Text style={styles.text} onPress={() => setNav("Map")}>
            지도로 보기
          </Text>

          <Dropdown />
        </View>
        <View style={styles.post__main}>
          {nav === "Feed" ? <PostList /> : <PostMap />}

          {/* //TODO : navigate : createPost */}
          <TouchableOpacity
            style={styles.createPost}
            onPress={() => navigation.navigate("PostCreate")}
          >
            <AntDesgin name="pluscircleo" size={30} color="#000" />
          </TouchableOpacity>
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
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 30,
  },

  header__location: {
    flex: 1,
    flexDirection: "row",
  },

  header__location__text: {
    marginRight: 10,
  },

  header__location__select: {
    marginLeft: 10,
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
    zIndex: 1,
  },

  post__main: {
    flex: 1,
    flexDirection: "column",
  },

  text: {
    padding: 10,
  },

  dropdownContainer: {
    width: 100,
    height: 40,
    zIndex: 1000,
    elevation: 1000,
  },

  createPost: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
