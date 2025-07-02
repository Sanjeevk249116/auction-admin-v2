import React from 'react'
import { View, Text, StyleSheet } from "@react-pdf/renderer";

function ReversePdfProfile({reverseCatalogueInformation}) {
    return (
        <View style={styles.sellerInfoContainer}>
            <Text style={styles.companyName}>
                {reverseCatalogueInformation?.buyerDetails?.buyerName ||
                    "Company Name Not Available"}
            </Text>
            <Text style={styles.companyAddress}>
                {reverseCatalogueInformation?.buyerDetails?.buyerAddress ||
                    "Address Not Available"}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
  sellerInfoContainer: {
    backgroundColor: "#F8F8F8",
    padding: 8,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  companyName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  companyAddress: {
    fontSize: 10,
  },
});

export default ReversePdfProfile
