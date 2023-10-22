import * as React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Text,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import DynamicHeader from "../components/header/DynamicHeader";
import SearchBar from "../components/user-input/SearchBar";
import MovingBanner from "../components/display/MovingBanner";
import GenericStores from "../components/display/GenericStores";

import { COLORS, SIZES } from "../constants/theme";
import useFetch from "../hook/useFetch";
import AllStores from "../components/display/AllStores";

const MainPage = ({ props }) => {
  StatusBar.setBarStyle("dark-content", true);
  const {
    data: deliveryLocations,
    isLoading,
    error,
  } = useFetch("GET", "api/deliveryLocation/getAll", {});

  let allDeliveryLocations = deliveryLocations.map((item) => {
    return { value: item._id, label: item.Name };
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.lightWhite,
      }}
    >
      <View style={{ zIndex: 100 }}>
        {isLoading ? (
          <ActivityIndicator size="large" colors="#312651"></ActivityIndicator>
        ) : error ? (
          <Text>Something went wrong.</Text>
        ) : (
          <DynamicHeader DATA={allDeliveryLocations} />
        )}
      </View>

      <SafeAreaView
        style={{
          padding: SIZES.medium,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <SearchBar placeholderText="What are you craving?" />
          <MovingBanner />
          <GenericStores props={props} title="Popular Stores" api="store" />
          <GenericStores props={props} title="All Stores" api="store" />
          {/* Just for spacing */}
          <View
            style={{ backgroundColor: COLORS.lightWhite, height: 150 }}
          ></View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MainPage;
