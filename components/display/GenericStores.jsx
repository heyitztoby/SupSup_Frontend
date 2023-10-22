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

import GenericStoreCard from "../cards/generic/GenericStoreCard";
import EndButton from "../user-input/EndButton";

const GenericStores = ({ props, title, api }) => {
  const router = useRouter();

  const {
    data: genericStores,
    isLoading,
    error,
  } = useFetch("GET", `api/${api}/getAll`, {});

  const handleGenericCardPress = (store) => {
    // console.log(store);
    props.navigation.navigate("Store", { props: store });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        {/* <TouchableOpacity style={styles.headerBtn}>
          <Text>Show All</Text>
        </TouchableOpacity> */}
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
            data={genericStores}
            renderItem={({ item }) => (
              <GenericStoreCard
                store={item}
                handleCardPress={handleGenericCardPress}
              />
            )}
            keyExtractor={(item) => item?._id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={() => <EndButton />}
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
    fontWeight: "bold",
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

export default GenericStores;
