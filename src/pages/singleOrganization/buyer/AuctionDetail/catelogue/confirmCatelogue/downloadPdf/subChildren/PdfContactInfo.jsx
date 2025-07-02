import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

function PdfContactInfo({ catelogueInformation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.companyDetails}>
        {catelogueInformation?.companyDetails || "Data not available"}
      </Text>
      <View style={styles.grid}>
        <Text style={styles.officeDetails}>
          {catelogueInformation?.registerOffice || "Data not available"}
        </Text>
        <Text style={styles.officeDetails}>
          {catelogueInformation?.branchOffice || "Data not available"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  companyDetails: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    marginTop: 8,
    textAlign: "left",
    gap: 20,
  },
  officeDetails: {
    flex: 1,
    fontSize: 11,
  },
});

export default PdfContactInfo;
