import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { COLORS, SIZES, SHADOWS } from "../../../constants/theme";

import plusButton from "../../../assets/plusbutton.png";

const NormalFoodCard = ({ food, selectedFood, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedFood, food)}
      onPress={() => handleCardPress(food)}
    >
      <View style={styles.logoContainer(selectedFood, food)}>
        <Image
          source={{ uri: food.Thumbnail }}
          resizeMode="stretch"
          style={styles.logoImage}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{ flexDirection: "column", justifyContent: "space-between" }}
        >
          <Text style={styles.foodName} numberOfLines={1}>
            {food.Name}
          </Text>
          <Text style={styles.foodPrice} numberOfLines={1}>
            S${food.Price.toFixed(2)}
          </Text>
        </View>

        <View style={styles.plusButton}>
          <Image
            source={plusButton}
            resizeMode="stretch"
            style={styles.logoImage}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: (selectedFood, food) => ({
    width: "100%",
    padding: SIZES.small,
    backgroundColor:
      selectedFood === food._id ? COLORS.primary : COLORS.lightWhite,
    borderRadius: SIZES.medium,
    // justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    marginTop: 2,
    flexDirection: "row",
  }),
  logoContainer: (selectedFood, food) => ({
    width: 100,
    height: 100,
    backgroundColor: selectedFood === food._id ? "#FFF" : COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  }),
  logoImage: {
    width: "100%",
    height: "100%",
    borderRadius: SIZES.medium,
  },
  foodName: {
    fontSize: SIZES.medium,
    // color: "#B3AEC6",
    color: COLORS.black,
    marginTop: 2,
    marginLeft: SIZES.small / 1.5,
  },
  foodPrice: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
    // color: "#B3AEC6",
    color: COLORS.black,
    marginBottom: 2,
    marginLeft: SIZES.small / 1.5,
  },
  plusButton: {
    width: 30,
    height: 30,
    borderRadius: SIZES.medium,
    alignSelf: "flex-end",
  },
  infoContainer: {
    marginTop: SIZES.large,
  },
  jobName: (selectedFood, food) => ({
    fontSize: SIZES.large,
    color: selectedFood === food._id ? COLORS.white : COLORS.primary,
  }),
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  publisher: (selectedFood) => ({
    fontSize: SIZES.medium - 2,
    color: selectedFood === food._id ? COLORS.white : COLORS.primary,
  }),
  location: {
    fontSize: SIZES.medium - 2,
    color: "#B3AEC6",
  },
});

export default NormalFoodCard;
