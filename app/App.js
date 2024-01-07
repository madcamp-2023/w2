import "react-native-gesture-handler";

import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import * as Location from "expo-location";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PostScreen from "./screens/PostScreen";
import ChatScreen from "./screens/ChatScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileEdit from "./components/ProfileEdit";
import PostDetail from "./components/PostDetail";

import { RecoilRoot } from "recoil";
import PostMap from "./components/PostMap";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileHome" component={ProfileScreen} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      <Stack.Screen name="MyPostDetail" component={PostDetail} />
    </Stack.Navigator>
  );
}

function PostStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Stack.Screen name="PostHome" component={PostScreen} />
      <Stack.Screen name="PostMap" component={PostMap} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          let location = await Location.getCurrentPositionAsync({});
          // location.coords.latitude와 location.coords.longitude로
          // 유저의 현 위치를 가져올 수 있다.

          console.log(location);
        }
      })();
    }
  }, [isLoggedIn]);

  return (
    <RecoilRoot>
      <View style={styles.container}>
        <Text>{isLoggedIn}</Text>
        {!isLoggedIn ? (
          <LoginScreen handleIsLoggedIn={setIsLoggedIn} />
        ) : (
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
              }}
            >
              <Tab.Screen
                name="Post"
                component={PostScreen}
                options={{
                  tabBarIcon: ({ focused, color, size }) => (
                    <MaterialCommunityIcons
                      name="post"
                      size={size}
                      color={color}
                    />
                  ),
                  tabBarLabel: "Post",
                }}
              />
              <Tab.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                  tabBarIcon: ({ focused, color, size }) => (
                    <Entypo name="chat" size={size} color={color} />
                  ),
                  tabBarLabel: "Chat",
                }}
              />
              <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                  tabBarIcon: ({ focused, color, size }) => (
                    <Fontisto name="person" size={size} color={color} />
                  ),
                  tabBarLabel: "Profile",
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        )}
      </View>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
