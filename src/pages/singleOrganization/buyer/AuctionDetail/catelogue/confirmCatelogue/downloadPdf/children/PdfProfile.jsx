import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

function PdfProfile({ catelogueInformation }) {
  return (
    <View>
      <View style={styles.sellerInfoContainer}>
        <Text style={styles.companyName}>
          {catelogueInformation?.sellerInformation?.companyName ||
            "Company Name Not Available"}
        </Text>
        <Text style={styles.companyAddress}>
          {catelogueInformation?.sellerInformation?.companyAddress ||
            "Address Not Available"}
        </Text>
      </View>
      <Text style={styles.supportText}>
        CercleX online auction platform and support services.
      </Text>

      <Text style={styles.auctionSupportServices}>
        {catelogueInformation?.auctionSupportServices ||
          "Auction support services information not available."}
      </Text>
    </View>
  );
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
  supportText: {
    fontSize: 11,
    textTransform: "uppercase",
    backgroundColor: "#6f2da8", 
    color: "#FFF",
    textAlign: "center",
    padding: 5,
    marginTop: 10,
    borderRadius: 10,
  },
  auctionSupportServices: {
    fontSize: 11,
    textAlign: "left",
    whiteSpace: "pre-wrap",
    marginVertical: 8,
  },
});

export default PdfProfile;
