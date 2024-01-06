import { Button, Image, StyleSheet, Text, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const PostDetail = ({ route }) => {
  const { title, content, price, location, timestamp } = route.params;

  const navigation = useNavigation();

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
        <View style={styles.content__child}>
          <Image
            source={{
              uri: "https://github.com/haejunejung/haejunejung.github.io/assets/99087502/d2817771-d076-4012-af8d-b2bd9330eea7",
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.content__child}>
          <Text>??</Text>
        </View>
        <View style={styles.content__child}>
          <Text>??</Text>
        </View>
        <View style={styles.content__child}>
          <Text>??</Text>
        </View>
        <View style={styles.btnContainer}>
          <Button title="수정하기" styles={styles.btn} />
          <Button title="삭제하기" styles={styles.btn} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  header: {
    alignSelf: "flex-start",
    padding: 10,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },

  content__child: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    width: "100%",
  },

  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingBottom: 20,
  },
});

export default PostDetail;
