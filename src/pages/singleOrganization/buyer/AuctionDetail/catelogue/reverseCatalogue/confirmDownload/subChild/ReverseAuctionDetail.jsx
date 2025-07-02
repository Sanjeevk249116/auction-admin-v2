import { View, StyleSheet, Text } from '@react-pdf/renderer';
import React from 'react'

function ReverseAuctionDetail({ reverseCatalogueInformation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.companyDetails}>
                {reverseCatalogueInformation?.procurementOfHiring?.declaration || "Data not available"}
            </Text>
            <Text style={styles.auctionSupportServices}>
                {reverseCatalogueInformation?.procurementOfHiring?.serviceInformation ||
                    "Auction support services information not available."}
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 8,
        marginVertical: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    companyDetails: {
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "center",
    },
    auctionSupportServices: {
        fontSize: 11,
        textAlign: "left",
        whiteSpace: "pre-wrap",
        marginVertical: 8,
    },
});
export default ReverseAuctionDetail
