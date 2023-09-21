import * as React from "react";
import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from "react-native";

import { COLORS, SIZES } from "../../constants/theme";

import search from "../../assets/search.png";

const SearchBar = (placeholderText) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <View style={styles.searchContainer}>
      <View elevation={5} style={styles.searchWrapper}>
        <TextInput
          style={[
            styles.searchInput,
            Platform.OS === "web" ? { outlineColor: "#000000" } : null,
          ]}
          value={searchValue}
          onChangeText={(text) => {
            setSearchValue(text);
          }}
          placeholder={placeholderText.placeholderText}
          placeholderTextColor={"lightgrey"}
        />
      </View>

      <TouchableOpacity style={styles.searchBtn}>
        <Image
          source={search}
          resizeMode="contain"
          style={styles.searchBtnImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.small,
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  searchInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
    borderRadius: SIZES.medium,
  },
  searchBtn: {
    width: "15%",
    height: "100%",
    backgroundColor: "#FF7754",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
});

export default SearchBar;
