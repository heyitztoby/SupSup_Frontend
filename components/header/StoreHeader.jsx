import * as React from "react";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Animated,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { Header } from "@rneui/base";
import ScreenHeaderBtn from "./ScreenHeaderBtn";
import menu from "../../assets/menu.png";
import DropDownPicker from "react-native-dropdown-picker";

import { COLORS } from "../../constants/theme";
import backarrow from "../../assets/backarrow.png";
import EndButton from "../user-input/EndButton";

const StoreHeader = ({ storeDetails, props }) => {
  // change status bar to black when going back to main page by swiping for IOS
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("beforeRemove", (e) => {
      StatusBar.setBarStyle("dark-content", true);
    });

    return unsubscribe;
  });

  return (
    <Header
      containerStyle={{ height: 230 }}
      leftComponent={
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            props.navigation.goBack();
            StatusBar.setBarStyle("dark-content", true);
          }}
        >
          <View style={styles.btnShadow}>
            <Image source={backarrow} style={styles.btnImg} />
          </View>
        </TouchableOpacity>
      }
      leftContainerStyle={{ position: "absolute", top: -30, left: 10 }}
      backgroundImage={{ uri: storeDetails.Picture }}
      backgroundImageStyle={{
        height: 230,
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

export default StoreHeader;
