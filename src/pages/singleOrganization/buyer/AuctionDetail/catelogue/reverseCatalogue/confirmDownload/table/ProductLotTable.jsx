import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    table: {
        width: "100%",
        borderRadius: 5,
        marginVertical: 10,
    },
    col1: { width: "10%" },
    col2: { width: "50%" },
    col3: { width: "15%" },
    col4: { width: "15%" },
    col5: { width: "20%" },
    lastRowOnPage: {
        borderBottom: "1px solid black",
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        borderLeft: "1px solid black",
        borderRight: "1px solid black",
        borderTop: "1px solid black",
    },
    header: {
        backgroundColor: "#f0f0f0",
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        color: "#6f2da8",
        borderTop: "1px solid black",
    },
    headerSize: {
        textAlign: "center",
        borderRightWidth: 1,
        padding: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    headerFont: {
        fontSize: 11,
    },
    dataStyel: {
        textAlign: "center",
        borderRightWidth: 1,
        padding: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    trFont: {
        fontSize: 10,
    },
    headerSizeLast: {
        fontSize: 11,
        textAlign: "center",
        padding: 3,
    },
    dataStyelLast: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
    },
});

const ProductLotTable = ({ reverseCatalogueInformation }) => {
    const HeaderCell = ({ style, children }) => (
        <View style={[style, styles.headerSize]}>
            <Text style={styles.headerFont}>{children}</Text>
        </View>
    );

    const TbodyCell = ({ style, children, symbol }) => (
        <View style={[style, styles.dataStyel]}>
            {symbol && <Text style={styles.trFont}>Rs.</Text>}
            <Text style={styles.trFont}>{children}</Text>
        </View>
    );

    console.log("reverseCatalogueInformation", reverseCatalogueInformation);

    return (
        <View wrap={true} style={styles.table}>
            <View style={[styles.row, styles.header]}>
                <HeaderCell style={styles.col1}>Lot No</HeaderCell>
                <HeaderCell style={styles.col2}>Particulars</HeaderCell>
                <HeaderCell style={styles.col3}>Quantity</HeaderCell>
                <HeaderCell style={styles.col4}>UOM</HeaderCell>
                <Text style={[styles.col5, styles.headerSizeLast]}>Bid Basis</Text>
            </View>
            {reverseCatalogueInformation?.productList?.map((row, i) => {
                const isLastRowOnPage = i === 16;
                const breakPoint = i === 17;
                const lastData = i === reverseCatalogueInformation?.productList?.length - 1;

                return (
                    <View
                        key={row?._id}
                        style={[
                            styles.row,
                            isLastRowOnPage && styles.lastRowOnPage,
                            lastData && styles.lastRowOnPage,
                        ]}
                        wrap={true}
                        break={breakPoint}
                    >
                        <TbodyCell style={styles.col1}>{i + 1}</TbodyCell>
                        <TbodyCell style={styles.col2}>
                            {row?.productDetails?.type || "N/A"}
                        </TbodyCell>
                        <TbodyCell style={styles.col3}>
                            {row?.productDetails?.quantity || "N/A"}
                        </TbodyCell>
                        <TbodyCell style={styles.col4}>{row?.productDetails?.unit || "N/A"}</TbodyCell>
                        <View style={[styles.col5, styles.dataStyelLast]}>
                            <Text style={styles.trFont}> {'Rupees (INR)'} </Text>
                        </View>
                    </View>
                );
            })}
        </View>
    );
};

export default ProductLotTable;
