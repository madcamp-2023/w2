import { View } from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";

const REST_API_KEY = "19f2b58bfe96f4d595bcd0d00819f21b";
const REDIRECT_URI = "http://143.248.196.188/auth/kakao/callback";
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

export default function KakaoLogin({ onLoginSuccess }) {

  axios.get("http://143.248.196.188:3000/user/test").then((response) => {
    // Handle response from your backend
    console.log(response.data);
  }).catch((error) => {
      // Handle any errors from your backend
      console.error("Error posting to backend:", error);
  });
  const getCode = (url) => {
    console.log(url);

    const regex = /[?&]code=(.*?)(?:&|$)/;
    const match = regex.exec(url);
    if (match && match[1]) {
      const AUTHORIZE_CODE = match[1];
      onLoginSuccess(AUTHORIZE_CODE);

      axios
        .post("http://143.248.196.188:3000/user/login", {
          AUTHORIZE_CODE: AUTHORIZE_CODE,
        })
        .then((response) => {
          // Handle response from your backend
          console.log(response.data);
        })
        .catch((error) => {
          // Handle any errors from your backend
          console.error("Error posting to backend:", error);
        });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={(event) => {
          const data = event.nativeEvent.url;
          getCode(data);
        }}
      />
    </View>
  );
}
