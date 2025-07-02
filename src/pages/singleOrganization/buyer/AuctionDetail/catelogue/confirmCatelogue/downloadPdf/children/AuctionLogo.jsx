import React from 'react'
import { View, Image, StyleSheet, } from "@react-pdf/renderer";
import { compressImage } from '../../../../../../../../helper/helpers';

function AuctionLogo() {

    const fetchAndCompressImage = async () => {
        try {
            const response = await fetch('/images/catalogue-pdf.jpg');
            const blob = await response.blob();
            return await compressImage(blob);

        } catch (error) {
            console.error("Compression failed:", error);
        }
    };

    return (
        <View style={styles.imageWrapper}>
            <Image src={fetchAndCompressImage()} style={styles.image} quality={20} />
        </View>
    )
}

const styles = StyleSheet.create({
    imageWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: "-10px"
    },
    image: {
        width: 180
    },
});

export default AuctionLogo
