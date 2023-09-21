import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { COLORS, SIZES, SHADOWS } from "../../../constants/theme";

const NormalStoreCard = ({ store, selectedStore, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedStore, store)}
      onPress={() => handleCardPress(store)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedStore, store)}>
        <Image
          source={{ uri: store.Picture }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.storeName} numberOfLines={1}>
        {store.Name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: (selectedStore, store) => ({
    width: "100%",
    padding: SIZES.xLarge,
    backgroundColor: selectedStore === store._id ? COLORS.primary : "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  logoContainer: (selectedStore, store) => ({
    width: 50,
    height: 50,
    backgroundColor: selectedStore === store._id ? "#FFF" : COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  }),
  logoImage: {
    width: "70%",
    height: "70%",
  },
  storeName: {
    fontSize: SIZES.medium,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
  },
  infoContainer: {
    marginTop: SIZES.large,
  },
  jobName: (selectedStore, store) => ({
    fontSize: SIZES.large,
    color: selectedStore === store._id ? COLORS.white : COLORS.primary,
  }),
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  publisher: (selectedStore) => ({
    fontSize: SIZES.medium - 2,
    color: selectedStore === store._id ? COLORS.white : COLORS.primary,
  }),
  location: {
    fontSize: SIZES.medium - 2,
    color: "#B3AEC6",
  },
});

export default NormalStoreCard;
