import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Button,
} from "react-native";
import PostItem from "./PostItem";
import axios from "axios";
import { URI } from "../recoil/constant";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/recoil";

export default function PostList() {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(null);

  const user = useRecoilValue(userState);

  //   const data = Array.from({ length: 100 }, (_, i) => ({
  //     title: (i + 1).toString(),
  //     content: (i + 1).toString(),
  //     price: `$${(i + 1) * 10}`,
  //     location: `Location ${i + 1}`,
  //     timestamp: `2024-01-${(i + 1).toString().padStart(2, "0")}T00:00:00Z`,
  //   }));

  const getRefreshData = async () => {
    //TODO : RefreshDataFetch
    setRefreshing(true);
    await RefreshDataFetch();
    setRefreshing(false);
  };

  const onRefresh = async () => {
    if (!refreshing) {
      const response = await axios
        .get(URI + "/post")
        .then((response) => response.data);
      setData(response);
    }
  };

  const getData = async () => {
    //TODO : DataFetch
    // if (true) {
    //   setLoading(true);
    //   await DataFetch();
    //   setLoading(false);
    // }

    console.log(response);
  };

  const onEndReached = () => {
    if (!loading) {
      getData();
    }
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(_) => _.title}
      style={styles.container}
      onRefresh={onRefresh}
      refreshing={refreshing}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.6}
      ListFooterComponent={loading && <ActivityIndicator />}
      renderItem={({ item }) => {
        const { title, content, price, location, timestamp } = item;
        return (
          <PostItem
            title={title}
            content={content}
            price={price}
            location={location}
            timestamp={timestamp}
          />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
