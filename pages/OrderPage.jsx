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

import AsyncStorage from "@react-native-async-storage/async-storage";

import OrderHeader from "../components/header/OrderHeader";

const OrderPage = ({ props }) => {
  // LogBox.ignoreLogs([
  //   "Non-serializable values were found in the navigation state",
  // ]);
  StatusBar.setBarStyle("dark-content", true);
  const deliveryFee = props.route.params.deliveryFee;
  const storeID = props.route.params.storeID;
  const storeName = props.route.params.storeName;

  const [basketItems, setBasketItems] = useState([{ Name: "Default" }]);
  const [accumulatedAmt, setAccumulatedAmt] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orders, setOrders] = useState(new Map());
  const [allFoods, setAllFoods] = useState([
    ...props.route.params.props.values(),
  ]);

  let orderMap = new Map();

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      value === null ? setBasketItems(null) : setBasketItems(JSON.parse(value));
    } catch (e) {
      console.log("ERROR: ", e);
    }
  };

  useEffect(() => {
    const focusListener = props.navigation.addListener("focus", (e) => {
      getData(storeID.toString());
    });

    let amt = 0;
    setAccumulatedAmt(0);

    if (basketItems) {
      basketItems.forEach((item) => {
        let qty = item.Quantity;
        let name = item.Name;
        let id = item.FoodID;
        let price = item.Price;

        amt += parseFloat(price * qty);

        if (!orderMap.get(id)) {
          orderMap.set(id, {
            Name: name,
            Quantity: qty,
            Price: price,
          });
        } else {
          orderMap.set(id, {
            Name: name,
            Quantity: orderMap.get(id).Quantity + qty,
            Price: price,
          });
        }
      });

      setAccumulatedAmt(amt.toFixed(2));
      amt += parseFloat(deliveryFee);
      setTotalPrice(amt.toFixed(2));
      setOrders(orderMap);
    }

    if (basketItems.length === 0) {
      props.navigation.goBack();
    }

    return focusListener;
  }, [basketItems]);

  const handleEditPress = (food) => {
    let foodDetail = {};
    allFoods.forEach((item) => {
      if (item._id === food) {
        foodDetail = item;
      }
    });
    props.navigation.navigate("Food", {
      props: foodDetail,
      update: true,
      quantity: orders.get(food).Quantity,
    });
  };

  const FoodDetailContainer = () => {
    let foodIDs = [];
    let basketSize = orders.size;

    if (basketSize > 0) {
      foodIDs = [...orders.keys()];
    }

    return (
      <>
        {basketSize > 0 ? (
          <FlatList
            data={foodIDs}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "row", padding: 10, flex: 1 }}>
                <View>
                  <Text style={styles.qty}>{orders.get(item).Quantity}x</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flex: 1,
                    marginLeft: 10,
                  }}
                >
                  <View>
                    <Text style={styles.foodName}>{orders.get(item).Name}</Text>
                    <TouchableOpacity onPress={() => handleEditPress(item)}>
                      <Text>Edit</Text>
                    </TouchableOpacity>
                  </View>

                  {/* <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        borderWidth: 0.2,
                        justifyContent: "center",
                        alignItems: "center",
                        height: 20,
                        width: 20,
                      }}
                    >
                      <Text>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        marginLeft: 10,
                        borderWidth: 0.2,
                        justifyContent: "center",
                        alignItems: "center",
                        height: 20,
                        width: 20,
                      }}
                    >
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View> */}

                  <View>
                    <Text>
                      S$
                      {(
                        orders.get(item).Quantity * orders.get(item).Price
                      ).toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        ) : (
          <Text>Basket is empty</Text>
        )}
      </>
    );
  };

  const SubtotalContainer = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: SIZES.medium, fontWeight: "600" }}>
          Subtotal
        </Text>
        <Text style={{ fontSize: SIZES.medium }}>S${accumulatedAmt}</Text>
      </View>
    );
  };

  const DeliveryFeeContainer = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <Text style={{ fontSize: SIZES.medium, fontWeight: "600" }}>
          Delivery Fee
        </Text>
        <Text style={{ fontSize: SIZES.medium }}>S${deliveryFee}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <OrderHeader storeName={storeName} props={props} />
      <ScrollView>
        <Text style={styles.title}>List of orders:</Text>
        <FoodDetailContainer />
        <SubtotalContainer />
        <DeliveryFeeContainer />
      </ScrollView>
      <View
        style={{
          backgroundColor: COLORS.white,
          height: "20%",
          // alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            top: -15,
          }}
        >
          <Text style={{ fontSize: SIZES.large, fontWeight: "600" }}>
            Total
          </Text>
          <Text style={{ fontSize: SIZES.large, fontWeight: "600" }}>
            S${totalPrice}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            height: "35%",
            width: "90%",
            borderRadius: SIZES.medium,
            alignItems: "center",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            padding: 15,
            alignSelf: "center",
            bottom: 15,
          }}
          // onPress={() =>
          //   handleOrderButtonPress(storeDetails._id, deliveryFee)
          // }
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: SIZES.medium,
            }}
          >
            Pay Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    padding: SIZES.small,
    fontWeight: "bold",
    fontSize: SIZES.medium,
  },
  foodName: {
    fontWeight: "600",
    fontSize: SIZES.medium,
  },
  qty: {
    fontSize: SIZES.medium,
  },
});

export default OrderPage;
