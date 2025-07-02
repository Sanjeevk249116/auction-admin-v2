import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

function HeaderPrototype({ lable, childrens }) {
  return (
    <View style={styles.breakPage}>
      <Text style={styles.headerText}>{lable}</Text>
      {childrens}
    </View>
  );
}
const styles = StyleSheet.create({
  headerText: {
    fontSize: 11,
    textTransform: "uppercase",
    backgroundColor: "#6f2da8",
    color: "#FFF",
    textAlign: "center",
    padding: 5,
    marginTop: 10,
    borderRadius: 10,
  },
  breakPage: { breakInside: "avoid" }
});

export default HeaderPrototype;
