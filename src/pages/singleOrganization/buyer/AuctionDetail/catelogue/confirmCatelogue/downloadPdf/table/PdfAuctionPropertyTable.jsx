import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  table: {
    width: "100%",
    borderRadius: 5,
    marginVertical: 10,
  },
  col1: { width: "18%" },
  col2: { width: "6%" },
  col3: { width: "8%" },
  col4: { width: "8%" },
  col5: { width: "8%" },
  col6: { width: "6%" },
  col7: { width: "12%" },
  col8: { width: "8%" },
  col9: { width: "12%" },
  col10: { width: "8%" },
  col11: { width: "5%" },
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
  font9: {
    fontSize: 9,
  },
  dataStyelLast: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
 
});


const PdfAuctionPropertyTable = ({ catelogueInformation }) => {
  const formatString = (text) => {
    if (typeof text !== "string") return text;
    return text?.replace(/^"|"$/g, "");
  };

  const HeaderCell = ({ style, children }) => (
    <View style={[style, styles.headerSize]}>
      <Text style={styles.headerFont}>{children}</Text>
    </View>
  );

  const TbodyCell = ({ style, children, font9, symbol }) => (
    <View style={[style, styles.dataStyel]}>
      {symbol && <Text style={styles.trFont}>Rs.</Text>}
      <Text style={font9 ? styles.font9 : styles.trFont}>{children}</Text>
    </View>
  );

  return (
    <View wrap={true} style={styles.table}>
      <View style={[styles.row, styles.header]}>
        <HeaderCell style={styles.col11}>Lot No</HeaderCell>
        <HeaderCell style={styles.col1}>Product Name</HeaderCell>
        <HeaderCell style={styles.col2}>Qty</HeaderCell>
        <HeaderCell style={styles.col3}>UOM</HeaderCell>
        <HeaderCell style={styles.col4}>Bid{"\n"}Basis</HeaderCell>
        <HeaderCell style={styles.col5}>GST (%)</HeaderCell>
        <HeaderCell style={styles.col6}>TCS (%)</HeaderCell>
        <HeaderCell style={styles.col7}>Product{"\n"}Location</HeaderCell>
        <HeaderCell style={styles.col8}>PCB (Y/N)</HeaderCell>
        <HeaderCell style={styles.col9}>EMD (Rs.)</HeaderCell>
        <HeaderCell style={styles.col9}>Event Fee</HeaderCell>
        <Text style={[styles.col10, styles.headerSizeLast]}>
          Lifting Period (Days)
        </Text>
      </View>
      {catelogueInformation?.auctionProperty?.map((row, i) => {
        const isLastRowOnPage = i === 16;
        const breakPoint = i === 17;
        const lastData =
          i === catelogueInformation?.auctionProperty?.length - 1;

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
            <TbodyCell style={styles.col11}>{i + 1}</TbodyCell>
            <TbodyCell style={styles.col1} font9>
              {row?.scrapDetails?.type}
            </TbodyCell>
            <TbodyCell style={styles.col2}>
              {row?.scrapDetails?.quantity}
            </TbodyCell>
            <TbodyCell style={styles.col3}>{row?.scrapDetails?.unit}</TbodyCell>
            <TbodyCell style={styles.col4}>{row?.scrapDetails?.unit}</TbodyCell>
            <TbodyCell style={styles.col5}>{row?.GSTTaxes}</TbodyCell>
            <TbodyCell style={styles.col6}>{row?.ItTCSTaxes}</TbodyCell>
            <TbodyCell style={styles.col7}>
              {formatString(row?.location) || "..."}{" "}
            </TbodyCell>
            <TbodyCell style={styles.col8}>
              {row?.requiresPCBCertificate ? "Y" : "N"}{" "}
            </TbodyCell>
            <TbodyCell style={styles.col9} symbol={true}>
              {" "}
              {row?.EMDAmount}
            </TbodyCell>
            <TbodyCell style={styles.col9} symbol={true}>{row?.eventFee}</TbodyCell>
            <View style={[styles.col10, styles.dataStyelLast]}>
              <Text style={styles.trFont}> {row?.liftingPeriod}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default PdfAuctionPropertyTable;
