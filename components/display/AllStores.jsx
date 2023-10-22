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

import NormalStoreCard from "../cards/normal/NormalFoodCard";

const AllStores = () => {
  const router = useRouter();

  const {
    data: allStores,
    isLoading,
    error,
  } = useFetch("GET", "api/store/getAll", {});

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Stores</Text>
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
            data={allStores}
            renderItem={({ item }) => <NormalStoreCard store={item} />}
            keyExtractor={(item) => item?._id}
            contentContainerStyle={{
              borderBottomColor: COLORS.gray,
              rowGap: 1,
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.medium,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    color: COLORS.primary,
    padding: SIZES.small,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
  },
});

export default AllStores;
