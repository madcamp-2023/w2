import { WebView } from "react-native-webview";

export default function Location() {
  return <WebView source={{ uri: "http://webview-domain/app/map" }} />;
}
