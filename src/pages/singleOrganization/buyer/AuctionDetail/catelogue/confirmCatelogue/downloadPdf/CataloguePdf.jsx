import React, { useContext, useState } from "react";
import { PDFDownloadLink, PDFViewer, pdf } from "@react-pdf/renderer";
import imageCompression from "browser-image-compression";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import {
  addCataLogueData,
  uploadCateloguePdf,
} from "../../../../../../../redux/action/catelogue";
import { useNavigate, useParams } from "react-router-dom";
import PdfStructure from "./components/PdfStructure";
import { globalContext } from "../../../../../../../context/ContextProvider";
import {
  compressImage,
  notifyError,
} from "../../../../../../../helper/helpers";

function CataloguePdf({ catelogueInformation }) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loadingGenartingPdf, setLoadingGenartingPdf] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { singleAuctionLoading } = useSelector((state) => state.singleAuction);
  const {
    setSelectcheckboxItem,
    setCatelogueInformation,
    setCheckCatalogueSameData,
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
        catelogueInformation?.sellerInformation?.companyName || "",
      industryAddress:
        catelogueInformation?.sellerInformation?.companyAddress || "",
      industryTermsAndConditions:
        catelogueInformation?.sellerTermsAndCondition || "",
      termsAndConditionOfOnlineAuction:
        catelogueInformation?.onlineAuctionCondition || "",
      auctionInformation: catelogueInformation?.auctionSupportServices || "",
      cerclexContactDetails: updatedData || [],
      platformInformation: {
        companyName: catelogueInformation?.companyDetails || "",
        registerAddress: catelogueInformation?.registerOffice || "",
        barnchAddress: catelogueInformation?.branchOffice || "",
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
      catelogueInformation
    );

    if (!updateStucture) return;
    setLoadingGenartingPdf(true);
    setIsButtonDisabled(true);
    const compressedImages = await compressAllImages(
      catelogueInformation?.lotsImages
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
        <PdfStructure
          catelogueInformation={catelogueInformation}
          imageData={compressedImages}
        />
      ).toBlob();
      const formData = new FormData();
      formData.append(
        "file",
        blob,
        `${catelogueInformation?.auctionInformation?.[0]?.value}.pdf`
      );
      dispatch(
        uploadCateloguePdf(
          id,
          formData,
          navigate,
          setCheckCatalogueSameData,
          setSelectcheckboxItem,
          setCatelogueInformation
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
    //     document={<PdfStructure catelogueInformation={catelogueInformation} imageData={catelogueInformation?.lotsImages} />}
    //     fileName="catalogue.pdf"
    //   >
    //     {({ loading }) => (loading ? "Loading document..." : "Download now!")}
    //   </PDFDownloadLink>
    //   <PDFViewer style={{ width: "2000px", height: "2000px" }}>
    //     <PdfStructure catelogueInformation={catelogueInformation} imageData={catelogueInformation?.lotsImages} />
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

export default CataloguePdf;
