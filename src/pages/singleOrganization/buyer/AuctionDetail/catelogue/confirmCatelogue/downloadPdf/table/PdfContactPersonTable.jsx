import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

function PdfContactPersonTable({ catelogueInformation }) {
  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderCell}>#</Text>
        <Text style={styles.tableHeaderCell}>Name</Text>
        <Text style={styles.tableHeaderCell}>Mobile</Text>
      </View>

      {catelogueInformation?.contactOfficialData.map((item, index) => (
        <View style={styles.tableRow} key={item.id}>
          <Text style={styles.tableCell}>{index + 1}</Text>
          <Text style={styles.tableCell}>{item.name}</Text>
          <Text style={styles.tableCell}>{item.mobileNumber}</Text>
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
  tableHeaderCell: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 12,
    color: "#6f2da8",
  },
  tableRow: {
    flexDirection: "row",
    padding: 7,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  tableCell: {
    flex: 1,
    fontSize: 11,
  },
});

export default PdfContactPersonTable;
