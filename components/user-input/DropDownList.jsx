import * as React from "react";
import { FlatList, StyleSheet, StatusBar } from "react-native";

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const DropDownList = (DATA) => {
  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => {
        return <Item title={item.title} />;
      }}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default DropDownList;
