import {
    Document,
    Page,
    Text,
    StyleSheet,
    Font,
    View,
} from "@react-pdf/renderer";
import AuctionLogo from "../../../confirmCatelogue/downloadPdf/children/AuctionLogo";
import ReversePdfProfile from "../children/ReversePdfProfile";
import SupportService from "../children/SupportService";
import OnlineReverseAuction from "../children/OnlineReverseAuction";
import PdfAuctionDetails from "../../../confirmCatelogue/downloadPdf/children/PdfAuctionDetails";
import ContactDetailHearder from "../children/ContactDetailHearder";
import ServiceLotHeader from "../children/ServiceLotHeader";
import TermsAndConditionHeader from "../children/TermsAndConditionHeader";
import GeneralTermAndCondition from "../children/GeneralTermAndCondition";
import HeaderPrototype from "../../../confirmCatelogue/downloadPdf/prototype/HeaderPrototype";
import ScrapImageDetails from "../../../confirmCatelogue/downloadPdf/children/ScrapImageDetails";
import ProductLotHeader from "../children/ProductLotHeader";

const ReversePdfStructure = ({ reverseCatalogueInformation, imageData }) => {
    return (
        <Document>
            <Page style={styles.body} size="A4" wrap>
                <View wrap={false}>
                    <AuctionLogo />
                </View>
                <View wrap={false}>
                    <ReversePdfProfile
                        reverseCatalogueInformation={reverseCatalogueInformation}
                    />
                </View>
                <View wrap={false}>
                    <SupportService
                        reverseCatalogueInformation={reverseCatalogueInformation}
                    />
                </View>
                <View wrap={false}>
                    <OnlineReverseAuction
                        reverseCatalogueInformation={reverseCatalogueInformation}
                    />
                </View>
                <View wrap={false}>
                    <PdfAuctionDetails
                        catelogueInformation={reverseCatalogueInformation}
                    />
                    <Text style={styles.generalDetails}>
                        The General Terms & Conditions annexed herewith shall be read
                        together and are complementary to each other.
                    </Text>
                </View>
                <View wrap={true} style={styles.pagebreak} break>
                    <ContactDetailHearder
                        reverseCatalogueInformation={reverseCatalogueInformation}
                    />
                </View>
                {reverseCatalogueInformation?.auctionTypeStyle ===
                    "reverseAuctionService" ? (
                    <View wrap={true} style={styles.pagebreak} break>
                        <ServiceLotHeader
                            reverseCatalogueInformation={reverseCatalogueInformation}
                        />
                    </View>
                ) : (
                    <>
                        <View wrap={true} style={styles.pagebreak} break>
                            <ProductLotHeader
                                reverseCatalogueInformation={reverseCatalogueInformation}
                            />
                        </View>
                        {imageData.length !== 0 && (
                            <View wrap={true} style={styles.pagebreak} break>

                                <HeaderPrototype
                                    lable={"Image of lots"}
                                    childrens={
                                        <ScrapImageDetails
                                            imageData={imageData}
                                            lotImages={reverseCatalogueInformation?.lotsImages}
                                            imageName={reverseCatalogueInformation?.imageName}
                                        />
                                    }
                                />
                            </View>
                        )}
                    </>
                )}
                <View wrap={true} style={styles.pagebreak} break>
                    <TermsAndConditionHeader
                        reverseCatalogueInformation={reverseCatalogueInformation}
                    />
                </View>
                <View wrap={true} style={styles.pagebreak} break>
                    <GeneralTermAndCondition
                        reverseCatalogueInformation={reverseCatalogueInformation}
                    />
                </View>

                <Text
                    style={styles.AuctionId}
                    render={() =>
                        `Auction ID: ${reverseCatalogueInformation?.auctionInformation?.[0]?.value}`
                    }
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
        color: "grey",
    },
    AuctionId: {
        position: "absolute",
        fontSize: 10,
        bottom: 20,
        left: 25,
        right: 0,
        textAlign: "end",
        color: "grey",
    },
    generalDetails: {
        fontSize: 11,
        marginTop: -5,
    },
    pagebreak: {
        // breakInside: "avoid",
        break: "before",
    },
});

export default ReversePdfStructure;
