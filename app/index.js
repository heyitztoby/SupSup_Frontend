import * as React from "react";
import { useState } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import DynamicHeader from "../components/header/DynamicHeader";
import SearchBar from "../components/user-input/SearchBar";
import MovingBanner from "../components/display/MovingBanner";
import PopularStores from "../components/display/PopularStores";

import { COLORS, SIZES } from "../constants/theme";
import useFetch from "../hook/useFetch";
import AllStores from "../components/display/AllStores";

// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// const Stack = createNativeStackNavigator();

const Home = () => {
  const router = useRouter();
  const {
    data: deliveryLocations,
    isLoading,
    error,
  } = useFetch("GET", "api/deliveryLocation/getAll", {});

  let allDeliveryLocations = deliveryLocations.map((item) => {
    return { value: item._id, label: item.Name };
  });

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightWhite,
      }}
      bounces={false}
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
          flex: 1,
          padding: SIZES.medium,
        }}
      >
        <SearchBar placeholderText="What are you craving?" />
        <MovingBanner />
        <PopularStores />
        <AllStores />
      </SafeAreaView>
    </ScrollView>

    // <SafeAreaView
    //   style={{
    //     flex: 1,
    //     backgroundColor: COLORS.lightWhite,
    //   }}
    // >
    //   {/* <Stack.Screen
    //     options={{
    //       headerStyle: { backgroundColor: COLORS.lightWhite },
    //       headerShadowVisible: false,
    //       headerLeft: () => (
    //         <ScreenHeaderBtn iconUrl={profile} dimension="100%" />
    //       ),
    //       // headerRight: () => <ScreenHeaderBtn iconUrl={menu} dimension="70%" />,
    //       headerTitle: "",
    //     }}
    //   /> */}

    //   {/* <ScreenHeaderBtn iconUrl={profile} dimension="100%" /> */}

    // </SafeAreaView>

    // <Stack.Navigator>
    //   <Stack.Screen
    //     name="Home"
    //     component={HomeScreen}
    //     options={{ title: "Welcome" }}
    //   />
    //   <Stack.Screen name="Profile" component={ProfileScreen} />
    // </Stack.Navigator>
  );
};

export default Home;
