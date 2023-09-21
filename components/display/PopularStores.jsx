import { useState } from "react";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../constants/theme";
import useFetch from "../../hook/useFetch";

import PopularStoreCard from "../cards/popular/PopularStoreCard";

const PopularStores = () => {
  const router = useRouter();

  const {
    data: popularStores,
    isLoading,
    error,
  } = useFetch("GET", "api/store/getAll", {});

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Stores</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <Text>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            colors={COLORS.primary}
          ></ActivityIndicator>
        ) : error ? (
          <Text>Something went wrong.</Text>
        ) : (
          <FlatList
            data={popularStores}
            renderItem={({ item }) => <PopularStoreCard store={item} />}
            keyExtractor={(item) => item?._id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.medium,
    padding: SIZES.small,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
  },
});

export default PopularStores;
