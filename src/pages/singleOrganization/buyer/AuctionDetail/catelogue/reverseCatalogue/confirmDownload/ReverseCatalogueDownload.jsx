import React, { useContext, useState } from "react";
import { PDFDownloadLink, PDFViewer, pdf } from "@react-pdf/renderer";
import imageCompression from "browser-image-compression";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

import {
  compressImage,
  notifyError,
} from "../../../../../../../helper/helpers";
import { useNavigate, useParams } from "react-router-dom";
import { globalContext } from "../../../../../../../context/ContextProvider";
import { addCataLogueData, uploadCateloguePdf } from "../../../../../../../redux/action/catelogue";
import ReversePdfStructure from "./components/ReversePdfStructure";

function ReverseCatalogueDownload({ reverseCatalogueInformation }) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loadingGenartingPdf, setLoadingGenartingPdf] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { singleAuctionLoading } = useSelector((state) => state.singleAuction);
  const {
    setSelectcheckboxItem,
    setCheckCatalogueSameData,
    setReverseCatalogueInformation,
  } = useContext(globalContext);

  // Function to compress all images before generating PDF
  const compressAllImages = async (lotsImages) => {
    if (!lotsImages || lotsImages.length === 0) return [];

    const compressedImages = await Promise.all(
      lotsImages.map((item) => compressImage(item))
    );
    return compressedImages;
  };

  const fieldNameMap = {
    industryName: "Seller Company Name",
    industryAddress: "Seller Company Address",
    industryTermsAndConditions: "Seller Terms and Conditions",
    termsAndConditionOfOnlineAuction: "Terms and Conditions of Online Auction",
    auctionInformation: "Auction Information",
    platformCompanyName: "Platform Company Name",
    platformRegisterAddress: "Platform Registered Address",
    platformBarnchAddress: "Platform Branch Address",
  };

  const changeCatalogueInformationStructure = async (data) => {
    const updatedData = data?.contactOfficialData?.map(
      ({ _id, ...rest }) => rest
    );

    const changeStructure = {
      industryName:
        reverseCatalogueInformation?.buyerDetails?.buyerName || "",
      industryAddress:
        reverseCatalogueInformation?.buyerDetails?.buyerAddress || "",
      industryTermsAndConditions:
        reverseCatalogueInformation?.termsAndCondition || "",
      termsAndConditionOfOnlineAuction:
        reverseCatalogueInformation?.generalTermsAndCondition || "",
      auctionInformation: reverseCatalogueInformation?.procurementOfHiring?.serviceInformation || "",
      cerclexContactDetails: updatedData || [],
      platformInformation: {
        companyName: reverseCatalogueInformation?.buyerDetails?.buyerName || "",
        registerAddress: reverseCatalogueInformation?.supportService?.registerAddress || "",
        barnchAddress: reverseCatalogueInformation?.supportService?.branchAddress || "",
      },
    };

    const flatFields = {
      industryName: changeStructure.industryName,
      industryAddress: changeStructure.industryAddress,
      industryTermsAndConditions: changeStructure.industryTermsAndConditions,
      termsAndConditionOfOnlineAuction:
        changeStructure.termsAndConditionOfOnlineAuction,
      auctionInformation: changeStructure.auctionInformation,
      platformCompanyName: changeStructure.platformInformation.companyName,
      platformRegisterAddress:
        changeStructure.platformInformation.registerAddress,
      platformBarnchAddress: changeStructure.platformInformation.barnchAddress,
    };

    for (const [key, value] of Object.entries(flatFields)) {
      if (!value || value.trim() === "") {
        notifyError(`${fieldNameMap[key]} should not be empty.`);
        return null;
      }
    }

    if (
      !Array.isArray(changeStructure.cerclexContactDetails) ||
      changeStructure.cerclexContactDetails.length === 0
    ) {
      notifyError(`Cerclex Contact Details" should not be empty.`);
      return null;
    }
    return changeStructure;
  };

  const handleUpload = async () => {
    if (isButtonDisabled) return;
    const updateStucture = await changeCatalogueInformationStructure(
      reverseCatalogueInformation
    );

    if (!updateStucture) return;
    setLoadingGenartingPdf(true);
    setIsButtonDisabled(true);
    const compressedImages = await compressAllImages(
      reverseCatalogueInformation?.lotsImages
    );
    try {
      const result = await dispatch(addCataLogueData(id, updateStucture));

      // Check if it succeeded
      if (result?.type?.includes("rejected")) {
        notifyError("Failed to save catalogue data. Upload aborted.");
        setLoadingGenartingPdf(false);
        setIsButtonDisabled(false);
        return;
      }

      const blob = await pdf(
        <ReversePdfStructure
          reverseCatalogueInformation={reverseCatalogueInformation}
          imageData={compressedImages}
        />
      ).toBlob();
      const formData = new FormData();
      formData.append(
        "file",
        blob,
        `${reverseCatalogueInformation?.auctionInformation?.[0]?.value}.pdf`
      );
      dispatch(
        uploadCateloguePdf(
          id,
          formData,
          navigate,
          setCheckCatalogueSameData,
          setSelectcheckboxItem,
          setReverseCatalogueInformation
        )
      ).then(() => {
        setLoadingGenartingPdf(false);
      });
    } catch (error) {
      setLoadingGenartingPdf(false);
      console.error("Error uploading PDF:", error);
    }
  };

  return (
    // <div style={{ width: "2000px" }}>
    //   <PDFDownloadLink
    //     document={<ReversePdfStructure reverseCatalogueInformation={reverseCatalogueInformation} imageData={reverseCatalogueInformation?.lotsImages} />}
    //     fileName="catalogue.pdf"
    //   >
    //     {({ loading }) => (loading ? "Loading document..." : "Download now!")}
    //   </PDFDownloadLink>
    //   <PDFViewer style={{ width: "2000px", height: "2000px" }}>
    //     <ReversePdfStructure reverseCatalogueInformation={reverseCatalogueInformation} imageData={reverseCatalogueInformation?.lotsImages} />
    //   </PDFViewer>
    // </div>
    <div>
      <button
        className={`button-style pointer font-20px select-wrapper cercle-purple white-text`}
        style={{ padding: "8px 30px" }}
        onClick={handleUpload}
        disabled={
          singleAuctionLoading || isButtonDisabled || loadingGenartingPdf
        }
      >
        {singleAuctionLoading || loadingGenartingPdf ? (
          <ClipLoader color="red" size={20} />
        ) : (
          "Submit"
        )}
      </button>
    </div>
  );
}

export default ReverseCatalogueDownload;
