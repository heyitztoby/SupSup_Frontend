import * as React from "react";
import { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { SliderBox } from "react-native-image-slider-box";

const MovingBanner = () => {
  const [images, setImages] = useState([
    "https://source.unsplash.com/1024x768/?nature",
    "https://source.unsplash.com/1024x768/?water",
    "https://source.unsplash.com/1024x768/?tree",
  ]);

  return (
    <View style={styles.container}>
      <SliderBox
        images={images}
        sliderBoxHeight={250}
        dotColor="#FFEE58"
        inactiveDotColor="#90A4AE"
        onCurrentImagePressed={(index) =>
          console.warn(`image ${index} pressed`)
        }
        paginationBoxVerticalPadding={20}
        autoplay
        circleLoop
      />
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
});

export default MovingBanner;
