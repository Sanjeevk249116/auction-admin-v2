import { Document, Page, Text, StyleSheet, Font, View } from "@react-pdf/renderer";
import PdfProfile from "../children/PdfProfile";
import PdfAuctionDetails from "../children/PdfAuctionDetails";
import PdfContactDetail from "../children/PdfContactDetail";
import PdfContactOfficial from "../children/PdfContactOfficial";
import PdfAuctionProperties from "../children/PdfAuctionProperties";
import PdfSellerTermsCondition from "../children/PdfSellerTermsCondition";
import PdfOnlineTermsCondtion from "../children/PdfOnlineTermsCondtion";
import ScrapImageDetails from "../children/ScrapImageDetails";
import AuctionLogo from "../children/AuctionLogo";
import HeaderPrototype from "../prototype/HeaderPrototype";

const PdfStructure = ({ catelogueInformation, imageData }) => {

  return (
    <Document>
      <Page style={styles.body} size="A4" wrap>
        <View wrap={false}>
          <AuctionLogo />
        </View>
        <View wrap={false}>
          <PdfProfile catelogueInformation={catelogueInformation} />
        </View>
        <View wrap={false}>
          <PdfAuctionDetails catelogueInformation={catelogueInformation} />
        </View>
        {/* <View wrap={false}>
          <PdfMemberships catelogueInformation={catelogueInformation} />
        </View> */}
        <View wrap={false}>
          <PdfContactDetail catelogueInformation={catelogueInformation} />
        </View>
        <View wrap={false}>
          <PdfContactOfficial catelogueInformation={catelogueInformation} />
        </View>
        <View wrap={true} style={styles.pagebreak} break>
          <PdfAuctionProperties catelogueInformation={catelogueInformation} />
        </View>
        {imageData.length !== 0 &&
          <View wrap={true} style={styles.pagebreak} break>
            <HeaderPrototype
              lable={"Image of lots"}
              childrens={
                <ScrapImageDetails imageData={imageData} lotImages={catelogueInformation?.lotsImages} imageName={catelogueInformation?.imageName} />
              }
            />
          </View>
        }
        <View wrap={true} style={styles.pagebreak} break>
          <PdfSellerTermsCondition catelogueInformation={catelogueInformation} />
        </View>
        <View wrap={true} style={styles.pagebreak} break>
          <PdfOnlineTermsCondtion catelogueInformation={catelogueInformation} />
        </View>

        <Text
          style={styles.AuctionId}
          render={() => `Auction ID: ${catelogueInformation?.auctionInformation?.[0]?.value}`}
          fixed
        />
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

Font.register({
  family: "circular",
  src: "https://cerclex-public-static-content.s3.ap-south-1.amazonaws.com/CircularStd-Book.otf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
    paddingBottom: 65,
    paddingHorizontal: 25,
    fontFamily: "circular",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 10,
    bottom: 20,
    left: 0,
    right: 25,
    textAlign: "right",
    color: "grey"
  },
  AuctionId: {
    position: "absolute",
    fontSize: 10,
    bottom: 20,
    left: 25,
    right: 0,
    textAlign: "end",
    color: "grey"
  },
  pagebreak: {
    // breakInside: "avoid",
    break: 'before'
  }
});

export default PdfStructure;
