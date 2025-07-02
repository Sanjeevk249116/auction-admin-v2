import React from "react";
import { View, Image, StyleSheet, Text } from "@react-pdf/renderer";

function ScrapImageDetails({ imageData, lotImages, imageName }) {
    return (
        <View style={styles.container}>
            {imageData.length === 0 ? (
                ""
            ) : (
                imageData.map((base64, index) => (
                    <View wrap={false} style={styles.imageWrapper} key={index}>
                        {lotImages?.[index]?.name && (
                            <Text style={styles.imageText}>{imageName[index]}</Text>
                        )}
                        <Image src={base64} style={styles.image} quality={20} />
                    </View>
                ))
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
    },
    imageWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: 250,
        maxHeight: 250, 
        breakInside: "avoid",
        padding: 8,
    },
    imageText: {
        fontSize: 12,
        marginBottom: 4,
        textAlign: "center",
    },
    image: {
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain", 
    },
});

export default ScrapImageDetails;
