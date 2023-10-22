import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
  FlatList,
  LogBox,
  StatusBar,
} from "react-native";

import { COLORS, SIZES } from "../constants/theme";
import useFetch from "../hook/useFetch";

import star from "../assets/goldstar.png";
import deliverytransport from "../assets/deliverytransport.png";
import StoreHeader from "../components/header/StoreHeader";
import NormalFoodCard from "../components/cards/normal/NormalFoodCard";

import AsyncStorage from "@react-native-async-storage/async-storage";

const SHORT = "Short";
const MEDIUM = "Medium";
const FAR = "Far";
const VERYFAR = "Very far";

const StorePage = ({ props }) => {
  StatusBar.setBarStyle("light-content", true);
  LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

  let storeDetails = props.route.params.props;
  let hashMap = new Map();

  const [basketItems, setBasketItems] = useState([]);
  const [accumulatedAmt, setAccumulatedAmt] = useState(0);
  const [accumulatedQty, setAccumulatedQty] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  let allFoods = [];

  useEffect(() => {
    const focusListener = props.navigation.addListener("focus", (e) => {
      getData(storeDetails._id.toString());
    });

    let amt = 0;
    let totalQty = 0;
    setAccumulatedAmt(0);

    console.log("BASKET: ", basketItems);

    if (basketItems && basketItems.length > 0) {
      console.log("HERE");
      basketItems.forEach((item) => {
        let qty = item.Quantity;

        amt += parseFloat(item.Price * qty);
        totalQty += qty;
      });
      setAccumulatedAmt(amt.toFixed(2));
      setAccumulatedQty(totalQty);
    }

    return focusListener;
  }, [basketItems]);

  console.log("AMT: ", accumulatedAmt);
  console.log("QTY: ", accumulatedQty);

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      value === null ? setBasketItems(null) : setBasketItems(JSON.parse(value));
    } catch (e) {
      console.log("ERROR: ", e);
    }
  };

  const handleOrderButtonPress = (storeID, deliveryFee) => {
    props.navigation.navigate("Order", {
      props: allFoods,
      storeID: storeID,
      storeName: storeDetails.Name,
      deliveryFee: deliveryFee,
    });
  };

  // const pan = React.useRef(new Animated.ValueXY()).current;

  // Details of the store
  const StoreDetailContainer = ({ storeDetails }) => {
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={styles.storeName}>{storeDetails.Name}</Text>
        <Text style={styles.storeLocation}>{storeDetails.Location}</Text>
        <RatingContainer storeDetails={storeDetails} />
        <DeliveryFeeContainer storeDetails={storeDetails} />
        <DiscountContainer storeDetails={storeDetails} />
      </View>
    );
  };

  // Ratings for the store
  const RatingContainer = ({ storeDetails }) => {
    const storeID = storeDetails._id;
    let avgRating = 0;
    let numOfRatings = 0;

    const {
      data: storeReviews,
      isLoading,
      error,
    } = useFetch("GET", `api/review/get/${storeID}`, {});

    numOfRatings = storeReviews.length;

    if (numOfRatings > 0) {
      storeReviews.forEach((review) => {
        avgRating += review.Rating;
      });
      avgRating = (avgRating / numOfRatings).toFixed(1);
    }

    return (
      <>
        {isLoading ? (
          <ActivityIndicator size="large" colors="#312651"></ActivityIndicator>
        ) : error ? (
          <Text>Something went wrong.</Text>
        ) : (
          <TouchableOpacity style={{ marginTop: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <Image source={star} style={styles.icon}></Image>
              <Text style={{ fontWeight: "bold", marginLeft: 2 }}>
                {avgRating}
              </Text>
              <Text style={{ marginLeft: 2 }}>({numOfRatings}</Text>
              {/* if 1 or lesser reviews then remove the s */}
              {numOfRatings <= 1 ? (
                <Text> review)</Text>
              ) : (
                <Text> reviews)</Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  };

  // delivery fee based on the store location
  const DeliveryFeeContainer = ({ storeDetails }) => {
    const storeLoc = storeDetails.Location;
    let dist = 2.2;
    let distCategory;

    // these lines of codes are just for testing
    // need to write code to determine distance between hall and the store location, and classify it into categories (short, medium, far, etc.)
    // 0-3km: Short, 3-6km: Medium, 6-10km: Far, >10km: Very far
    if (dist < 3) {
      distCategory = SHORT;
    } else if (dist < 6) {
      distCategory = MEDIUM;
    } else if (dist < 10) {
      distCategory = FAR;
    } else {
      distCategory = VERYFAR;
    }

    const { data, isLoading, error } = useFetch(
      "GET",
      `api/deliveryFee/get/${distCategory}`,
      {}
    );

    useEffect(() => {
      if (data.length > 0) {
        setDeliveryFee(data[0].Price.toFixed(2));
      }
    }, [data]);

    return (
      <>
        {isLoading ? (
          <ActivityIndicator size="large" colors="#312651"></ActivityIndicator>
        ) : error ? (
          <Text>Something went wrong.</Text>
        ) : (
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Image
              source={deliverytransport}
              style={[styles.icon, { marginTop: 1 }]}
            ></Image>
            <Text style={{ fontWeight: "bold", marginLeft: 2 }}>
              Contactless Delivery
            </Text>
            <Text style={{ marginLeft: 6 }}>{dist.toFixed(1)} km</Text>
            <Text style={{ marginLeft: 2 }}>
              , S${data[0].Price.toFixed(2)}
            </Text>
          </View>
        )}
      </>
    );
  };

  // any discounts will be shown here
  const DiscountContainer = (storeDetails) => {
    return (
      <>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ marginLeft: 2 }}>10% Discount</Text>
        </View>
      </>
    );
  };

  const FoodContainer = ({ storeDetails, props }) => {
    const storeID = storeDetails._id;

    const handleFoodCardPress = (food) => {
      props.navigation.navigate("Food", { props: food });
    };

    const {
      data: foods,
      isLoading,
      error,
    } = useFetch("GET", `api/food/get/${storeID}`, {});

    let categories;
    hashMap = new Map();

    useEffect(() => {
      allFoods = foods;
    }, [foods]);

    if (foods.length > 0) {
      foods.forEach((food) => {
        let foodArray = hashMap.get(food.Category);
        if (!foodArray) {
          hashMap.set(food.Category, [food]);
        } else {
          hashMap.set(food.Category, [...foodArray, food]);
        }
      });
    }

    return (
      <>
        {isLoading ? (
          <ActivityIndicator size="large" colors="#312651"></ActivityIndicator>
        ) : error ? (
          <Text>Something went wrong.</Text>
        ) : (
          <View style={{ flex: 1, padding: 10 }}>
            <FlatList
              data={[...hashMap.keys()]}
              renderItem={({ item }) => (
                <View style={styles.cardsContainer}>
                  <Text style={styles.categoryName}>{item}</Text>
                  <FlatList
                    data={hashMap.get(item)}
                    renderItem={({ item }) => (
                      <NormalFoodCard
                        food={item}
                        handleCardPress={handleFoodCardPress}
                      />
                    )}
                    keyExtractor={(item) => item?._id}
                    contentContainerStyle={{
                      columnGap: SIZES.medium,
                    }}
                  />
                </View>
              )}
              contentContainerStyle={{
                borderBottomColor: COLORS.gray,
                rowGap: 1,
              }}
            />
          </View>
        )}
      </>
    );
  };

  return (
    // <Animated.ScrollView
    //   style={{ flex: 1 }}
    //   scrollEventThrottle={1}
    //   onScroll={Animated.event(
    //     [{ nativeEvent: { contentOffset: { y: pan.y } } }],
    //     {
    //       useNativeDriver: false,
    //     }
    //   )}
    // >
    //   <Animated.Image
    //     resizeMode="cover"
    //     style={{
    //       transform: [
    //         {
    //           translateY: pan.y.interpolate({
    //             inputRange: [-200000, 0],
    //             outputRange: [20, 1],
    //             extrapolate: "clamp",
    //           }),
    //         },
    //         {
    //           scale: pan.y.interpolate({
    //             inputRange: [-40000, 10],
    //             outputRange: [400, 1],
    //             extrapolate: "clamp",
    //           }),
    //         },
    //       ],
    //       //   width: "100%",
    //       height: 250,
    //     }}
    //     source={{ uri: storeDetails.Picture }}
    //   />
    //   {/* <SafeAreaView> */}
    //   {/* <Animated.View
    //     style={{
    //       paddingHorizontal: 10,
    //       transform: [
    //         {
    //           translateY: pan.y.interpolate({
    //             inputRange: [0, 200000],
    //             outputRange: [80, -10],
    //             extrapolate: "clamp",
    //           }),
    //         },
    //       ],
    //     }}
    //   > */}
    //     <Text>Hello</Text>
    //   {/* </Animated.View> */}
    //   {/* </SafeAreaView> */}
    // </Animated.ScrollView>
    <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <StoreHeader storeDetails={storeDetails} props={props} />

        <StoreDetailContainer storeDetails={storeDetails} />
        <FoodContainer storeDetails={storeDetails} props={props} />
        {/* Just for spacing */}
        <View
          style={{ backgroundColor: COLORS.lightWhite, height: 200 }}
        ></View>
      </ScrollView>

      {accumulatedAmt > 0 && accumulatedQty > 0 ? (
        <View
          style={{
            backgroundColor: COLORS.white,
            height: "12%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              height: "50%",
              width: "90%",
              borderRadius: SIZES.medium,
              alignItems: "center",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              padding: 15,
            }}
            onPress={() =>
              handleOrderButtonPress(storeDetails._id, deliveryFee)
            }
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: SIZES.medium,
              }}
            >
              Basket ({accumulatedQty} items)
            </Text>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: SIZES.medium,
              }}
            >
              S${accumulatedAmt}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  storeName: {
    fontSize: SIZES.xLarge,
    fontWeight: "bold",
  },
  categoryName: {
    fontSize: SIZES.large,
    fontWeight: "bold",
  },
  storeLocation: {
    fontSize: SIZES.medium,
    marginTop: 10,
  },
  icon: {
    maxWidth: SIZES.medium,
    maxHeight: SIZES.medium,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
  },
});

export default StorePage;
