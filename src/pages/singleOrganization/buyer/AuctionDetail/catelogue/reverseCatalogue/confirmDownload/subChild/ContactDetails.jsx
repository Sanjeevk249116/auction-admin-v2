import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import PdfContactPersonTable from "../../../confirmCatelogue/downloadPdf/table/PdfContactPersonTable";

function ContactDetails({ reverseCatalogueInformation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.companyDetails}>
                {"Contact Details"}
            </Text>
            <View style={styles.grid}>
                <Text style={styles.officeDetails}>
                    {reverseCatalogueInformation?.contactDetails?.buyerContactDetails || "Data not available"}
                </Text>
                <Text style={styles.officeDetails}>
                    {reverseCatalogueInformation?.contactDetails?.cerclexContactDetails || "Data not available"}
                </Text>
            </View>
            <View style={styles.contact}>
                <PdfContactPersonTable
                catelogueInformation={reverseCatalogueInformation}
            />
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
    contact: {
        marginTop: 12,
    },
});

export default ContactDetails;
