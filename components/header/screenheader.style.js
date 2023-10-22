import { StyleSheet } from "react-native";

import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
  btnContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: 10,
  }),
});

export default styles;
