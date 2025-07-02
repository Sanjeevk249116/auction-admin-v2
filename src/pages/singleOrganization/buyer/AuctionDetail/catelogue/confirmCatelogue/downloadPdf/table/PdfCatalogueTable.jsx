import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

function PdfCatalogueTable({ catelogueInformation }) {
  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, styles.column1]}>
          Mode of EMD Payment
          (Refer Clause IV - Participation)
        </Text>
        <Text style={[styles.tableHeaderText, styles.column2]}>
          SmartPay / EMD With Client
        </Text>
      </View>
      {catelogueInformation?.auctionInformation?.map((item) => (
        <View style={styles.tableRow} key={item.id}>
          <Text style={[styles.tableCell, styles.column1]}>{item.label}</Text>
          <Text style={[styles.tableCell, styles.column2]}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    padding: 8,
  },
  tableHeaderText: {
    fontWeight: "bold",
    fontSize: 11,
    color: "#6f2da8",
  },
  tableRow: {
    flexDirection: "row",
    padding: 7,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  tableCell: {
    fontSize: 10,
  },
  column1: {
    flex: 6,
  },
  column2: {
    flex: 4,
  },
});

export default PdfCatalogueTable;
