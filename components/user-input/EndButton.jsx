import * as React from "react";
import { TouchableOpacity, Image, View } from "react-native";
import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../constants/theme";
import arrow from "../../assets/rightarrow.png";

const EndButton = ({ iconUrl, handlePress }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <View style={styles.btnShadow}>
        <Image source={arrow} style={styles.btnImg} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: 100,
    height: 180,
    backgroundColor: COLORS.lightWhite,
    justifyContent: "center",
    alignItems: "center",
  },
  btnImg: {
    borderRadius: 50 / 2,
    maxWidth: 50,
    maxHeight: 50,
  },
  btnShadow: {
    borderRadius: 50 / 2,
    backgroundColor: COLORS.lightWhite,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
});

export default EndButton;
