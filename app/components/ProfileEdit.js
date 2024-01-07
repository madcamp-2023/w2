import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  View,
  Pressable,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import LabelInput from "./LabelInput";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/recoil";

import * as ImagePicker from "expo-image-picker";

import axios from "axios";
import { URI } from "../recoil/constant";

const ProfileEdit = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const user = useRecoilValue(userState);

  useEffect(() => {
    if (user.image) {
      setImageUrl(user.image);
    }
  }, [user]);

  const uploadImage = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1],
    });

    if (result.canceled) {
      return null;
    }

    const uri = result.assets[0].uri;
    setImageUrl(uri);
  };

  const handleSubmit = () => {
    //TODO: POST, userState 변경
    Alert.alert("프로필 업데이트!");

    axios
      .patch(URI + "/user/edit", {
        id: user.id,
        bio: bio,
        image: imageUrl,
        location: location,
        name: name,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign
          name="arrowleft"
          size={30}
          onPress={() => navigation.navigate("ProfileHome")}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Pressable onPress={uploadImage}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <FontAwesome
              name="camera"
              size={27}
              style={styles.iconOverlay}
              onPress={() => {}}
            />
          </Pressable>
        </View>
        <LabelInput
          label="이름"
          value={name}
          onChangeText={setName}
          placeholder="이름을 입력하세요."
        />
        <LabelInput
          label="활동위치"
          value={location}
          onChangeText={setLocation}
          placeholder="주요 위치를 입력하세요."
        />
        <LabelInput
          label="자기소개"
          value={bio}
          onChangeText={setBio}
          placeholder="자기소개를 입력하세요."
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

  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconOverlay: {
    position: "absolute",
    backgroundColor: "white",
    borderColor: "white",
    borderRadius: 100,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    padding: 10,
    right: 20,
    bottom: 20,
  },
});

export default ProfileEdit;
