import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Animated,
  FlatList,
  Image,
} from "react-native";
import { Header } from "@rneui/base";
import ScreenHeaderBtn from "./ScreenHeaderBtn";
import backarrow from "../../assets/backarrow.png";
import menu from "../../assets/menu.png";
import DropDownPicker from "react-native-dropdown-picker";

import { COLORS, SIZES } from "../../constants/theme";
import { TouchableOpacity } from "react-native-gesture-handler";

const OrderHeader = ({ storeName, props }) => {
  return (
    <Header
      centerComponent={
        <View style={styles.storeNameContainer}>
          <Text style={styles.storeName}>{storeName}</Text>
        </View>
      }
      leftComponent={
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => props.navigation.goBack()}
        >
          <Image style={styles.btnImg} source={backarrow} />
        </TouchableOpacity>
      }
      containerStyle={styles.headerContainer}
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.white,
    alignContent: "center",
    justifyContent: "center",
  },
  btnContainer: {
    width: 40,
    height: 40,
  },
  btnImg: {
    width: "100%",
    height: "100%",
  },
  storeNameContainer: {
    height: 40,
    justifyContent: "center",
  },
  storeName: {
    fontWeight: "bold",
    fontSize: SIZES.medium,
  },
});

export default OrderHeader;
