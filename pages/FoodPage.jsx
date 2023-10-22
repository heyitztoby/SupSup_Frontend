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
  Button,
  StatusBar,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { COLORS, SIZES } from "../constants/theme";
import useFetch from "../hook/useFetch";

import FoodHeader from "../components/header/FoodHeader";

import Toast from "react-native-root-toast";

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
    console.log("ERROR: ", e);
  }
};

const FoodPage = ({ props }) => {
  let foodDetails = props.route.params.props;
  const [update, setUpdate] = useState(props.route.params.update);
  const [currentQty, setCurrentQty] = useState(props.route.params.quantity);
  const [basketItems, setBasketItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(foodDetails.Price.toFixed(2));

  useEffect(() => {
    const focusListener = props.navigation.addListener("focus", (e) => {
      if (currentQty > 0) {
        setQuantity(currentQty);
        setTotalPrice((currentQty * foodDetails.Price).toFixed(2));
      }
    });

    const getData = async (key) => {
      try {
        const value = await AsyncStorage.getItem(key);

        value === null ? setBasketItems([]) : setBasketItems(JSON.parse(value));
        // await AsyncStorage.removeItem("64ecde5f6dbe32f3ba77d57b");
      } catch (e) {
        console.log("ERROR: ", e);
      }
    };

    getData(foodDetails.StoreID.toString());

    return focusListener;
  }, [basketItems]);

  const handlePlusButtonPress = (quantity) => {
    setQuantity(quantity + 1);
    setTotalPrice(((quantity + 1) * foodDetails.Price).toFixed(2));
  };

  const handleMinusButtonPress = (quantity) => {
    setQuantity(quantity - 1);
    setTotalPrice(((quantity - 1) * foodDetails.Price).toFixed(2));
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <FoodHeader foodDetails={foodDetails} props={props} />

        <View style={styles.foodDetailContainer}>
          <FoodDetailContainer foodDetails={foodDetails} />
          <QuantityOfProduct
            quantity={quantity}
            handlePlusButtonPress={handlePlusButtonPress}
            handleMinusButtonPress={handleMinusButtonPress}
          />
        </View>

        {/* Just for spacing */}
        {/* <View
          style={{ backgroundColor: COLORS.lightWhite, height: 200 }}
        ></View> */}
      </ScrollView>
      <View
        style={{
          backgroundColor: "white",
          height: "12%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {quantity === 0 ? (
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              height: "50%",
              width: "90%",
              borderRadius: SIZES.medium,
              alignItems: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              if (currentQty > 0) {
                storeData(
                  foodDetails.StoreID.toString(),
                  basketItems.filter((item) => item.FoodID !== foodDetails._id)
                );
              }
              props.navigation.goBack();
            }}
          >
            {currentQty > 0 ? (
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: SIZES.medium,
                }}
              >
                Remove from Basket
              </Text>
            ) : (
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: SIZES.medium,
                }}
              >
                Back to menu
              </Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              height: "50%",
              borderRadius: SIZES.medium,
              alignItems: "center",
              justifyContent: "center",
              alignItems: "center",
              width: "90%",
            }}
            onPress={() => {
              let existing = false;
              var jsonObject = {
                StoreID: foodDetails.StoreID,
                FoodID: foodDetails._id,
                Name: foodDetails.Name,
                Quantity: quantity,
                Price: foodDetails.Price.toFixed(2),
              };
              const updateExistingObject = basketItems.map((item) => {
                if (item.FoodID === foodDetails._id) {
                  existing = true;
                  return {
                    ...item,
                    Quantity: quantity,
                  };
                } else {
                  return item;
                }
              });

              if (!existing) {
                storeData(foodDetails.StoreID.toString(), [
                  ...basketItems,
                  jsonObject,
                ]);
              } else {
                storeData(foodDetails.StoreID.toString(), updateExistingObject);
              }

              {
                currentQty > 0
                  ? Toast.show("Successfully updated basket", {
                      duration: Toast.durations.SHORT,
                      position: 0,
                      shadow: false,
                      opacity: 1,
                    })
                  : Toast.show("Successfully added to basket", {
                      duration: Toast.durations.SHORT,
                      position: 0,
                      shadow: false,
                      opacity: 1,
                    });
              }

              props.navigation.goBack();
            }}
          >
            {currentQty > 0 ? (
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: SIZES.medium,
                }}
              >
                Update Basket - S${totalPrice}
              </Text>
            ) : (
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: SIZES.medium,
                }}
              >
                Add to Basket - S${totalPrice}
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const QuantityOfProduct = ({
  quantity,
  handlePlusButtonPress,
  handleMinusButtonPress,
}) => {
  return (
    <View style={styles.quantityContainer}>
      <TouchableOpacity
        style={[
          styles.quantityContent,
          {
            borderWidth: 0.3,
            borderColor: "gray",
            borderRadius: SIZES.medium,
          },
        ]}
        onPress={() => {
          if (quantity > 0) {
            handleMinusButtonPress(quantity);
          }
        }}
      >
        <Text style={styles.quantityIcons}>-</Text>
      </TouchableOpacity>
      <View style={styles.quantityContent}>
        <Text style={styles.quantityNumber}>{quantity}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.quantityContent,
          {
            borderWidth: 0.3,
            borderColor: "gray",
            borderRadius: SIZES.medium,
          },
        ]}
        onPress={() => {
          handlePlusButtonPress(quantity);
        }}
      >
        <Text style={styles.quantityIcons}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const FoodDetailContainer = ({ foodDetails }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text style={styles.foodDetails}>{foodDetails.Name}</Text>
      <Text style={styles.foodDetails}>S${foodDetails.Price.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  foodDetailContainer: {
    flex: 1,
    padding: 15,
  },
  foodDetails: {
    fontWeight: "bold",
    fontSize: SIZES.large,
  },
  quantityIcons: {
    fontWeight: "bold",
    fontSize: SIZES.large,
  },
  quantityNumber: {
    fontWeight: "bold",
    fontSize: SIZES.large,
  },
  quantityContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    alignSelf: "center",
    marginTop: 50,
  },
  quantityContent: {
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FoodPage;
