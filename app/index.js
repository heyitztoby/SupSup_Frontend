import * as React from "react";
import { useRouter } from "expo-router";
import MainPage from "../pages/MainPage";
import StorePage from "../pages/StorePage";
import FoodPage from "../pages/FoodPage";
import OrderPage from "../pages/OrderPage";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Home = () => {
  const router = useRouter();

  return (
    // <ScrollView
    //   style={{
    //     flex: 1,
    //     backgroundColor: COLORS.lightWhite,
    //   }}
    //   bounces={false}
    // >
    //   <View style={{ zIndex: 100 }}>
    //     {isLoading ? (
    //       <ActivityIndicator size="large" colors="#312651"></ActivityIndicator>
    //     ) : error ? (
    //       <Text>Something went wrong.</Text>
    //     ) : (
    //       <DynamicHeader DATA={allDeliveryLocations} />
    //     )}
    //   </View>

    //   <SafeAreaView
    //     style={{
    //       flex: 1,
    //       padding: SIZES.medium,
    //     }}
    //   >
    //     <SearchBar placeholderText="What are you craving?" />
    //     <MovingBanner />
    //     <GenericStores />
    //     <AllStores />
    //   </SafeAreaView>
    // </ScrollView>

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

    // <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Store" component={Store} />
      <Stack.Screen name="Food" component={Food} />
      <Stack.Screen name="Order" component={Order} />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

const Store = (props) => {
  return <StorePage props={props} />;
};

const Main = (props) => {
  return <MainPage props={props} />;
};

const Food = (props) => {
  return <FoodPage props={props} />;
};

const Order = (props) => {
  return <OrderPage props={props} />;
};

export default Home;
