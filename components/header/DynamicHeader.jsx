import * as React from "react";
import { useState } from "react";
import { Text, View, StyleSheet, Animated, FlatList } from "react-native";
import { Header } from "@rneui/base";
import ScreenHeaderBtn from "./ScreenHeaderBtn";
import profile from "../../assets/kemal.jpg";
import menu from "../../assets/menu.png";
import DropDownPicker from "react-native-dropdown-picker";

import { COLORS } from "../../constants/theme";

const DynamicHeader = (DATA) => {
  const [selected, setSelected] = useState("Select your location");
  const [open, setOpen] = useState(false);

  return (
    <Header
      backgroundImageStyle={{}}
      barStyle="default"
      centerComponent={
        <View style={{ flexDirection: "row" }}>
          <DropDownPicker
            placeholder="Select your location"
            open={open}
            value={selected}
            items={DATA.DATA}
            setOpen={setOpen}
            setValue={setSelected}
            style={{
              backgroundColor: COLORS.white,
              borderWidth: 0.5,
              borderColor: "grey",
              // alignContent: "center",
            }}
            containerStyle={{
              borderWidth: 0,
              width: 170,
            }}
            dropDownContainerStyle={{
              borderWidth: 1,
              borderColor: "red",
            }}
            labelStyle={{
              color: "blue",
            }}
            listItemLabelStyle={{
              color: "green",
            }}
            listItemContainer={{
              borderWidth: 10,
            }}
            textStyle={{ fontSize: 12 }}
          />
        </View>
      }
      centerContainerStyle={{
        alignSelf: "center",
      }}
      containerStyle={{ backgroundColor: COLORS.lightWhite }}
      leftComponent={
        <View style={{ flexDirection: "row" }}>
          <ScreenHeaderBtn iconUrl={profile} dimension="100%" />
        </View>
      }
      leftContainerStyle={{}}
      linearGradientProps={{}}
      placement="left"
      rightComponent={
        <View style={{ flexDirection: "row" }}>
          <ScreenHeaderBtn iconUrl={menu} dimension="80%" />
          <ScreenHeaderBtn iconUrl={menu} dimension="80%" />
        </View>
      }
      rightContainerStyle={{}}
      statusBarProps={{}}
    />
    // </Animated.View>
  );
};

const styles = StyleSheet.create({
  dropdownlist: {
    position: "absolute",
    zIndex: 100,
    borderWidth: 0,
    marginTop: 50,
    backgroundColor: COLORS.white,
    width: 200,
  },
  dropdownbox: {
    borderWidth: 0,
    width: 200,
  },
});

export default DynamicHeader;
