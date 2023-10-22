import * as React from "react";
import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Header } from "@rneui/base";

import { COLORS } from "../../constants/theme";
import backarrow from "../../assets/backarrow.png";

const FoodHeader = ({ foodDetails, props }) => {
  return (
    <Header
      containerStyle={{ height: 300 }}
      leftComponent={
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => props.navigation.goBack()}
        >
          <View style={styles.btnShadow}>
            <Image source={backarrow} style={styles.btnImg} />
          </View>
        </TouchableOpacity>
      }
      leftContainerStyle={{
        position: "absolute",
        top: -50,
        left: 10,
      }}
      backgroundImage={{ uri: foodDetails.Thumbnail }}
      backgroundImageStyle={{
        height: 300,
        resizeMode: "stretch",
        backgroundColor: COLORS.lightWhite,
      }}
    />
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    height: 50,
    borderRadius: 50 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  btnImg: {
    borderRadius: 40 / 2,
    maxWidth: 40,
    maxHeight: 40,
  },
  btnShadow: {
    backgroundColor: COLORS.lightWhite,
    borderRadius: 40 / 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
});

export default FoodHeader;
