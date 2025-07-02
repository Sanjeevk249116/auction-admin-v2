// import React, { useState, useRef, useEffect } from "react";
// import { useMediaQuery } from "react-responsive";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import { toast } from "react-toastify";
// import { useNavigate, useParams } from "react-router-dom";
// import catelogue from "../../../../../../jsonData/catelogue.json";
// import singleAuctionData from "../../../../../../jsonData/SingleAuctionData.json";
// import CatelogeCompanyProfile from "./components/CatelogeCompanyProfile";
// import OfferList from "./components/CateLogOfferList";
// import CatelogueHelpline from "./components/CatelogueHelpline";

// function CatelogView() {
//   const { id } = useParams();
//   const isDastop = useMediaQuery({ query: "(max-width: 1550px)" });
//   const isLaptop = useMediaQuery({ query: "(max-width: 1230px)" });
//   const isMobile = useMediaQuery({ query: "(max-width: 450px)" });
//   const [imageList, setImageList] = useState(false);
//   const contentRef = useRef(null);
//   const navigate = useNavigate();

//   //   dowmload the file in pdf formate============>>>>>>>>>>
//   const downloadPDF = async () => {
//     const toastID = toast.loading("Please wait...");
//     const input = contentRef.current;
//     let pdf = new jsPDF("p", "mm", "a4");
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = pdf.internal.pageSize.getHeight();
//     const margin = 10;
//     const contentWidth = pdfWidth - 2 * margin;
//     let quality = 0.5; // Start with a lower quality to reduce file size
//     let pdfSize = 0;
//     const minSize = 2 * 1024 * 1024; // 2MB
//     const maxSize = 10 * 1024 * 1024; // 10MB

//     const generatePDFContent = async (currentQuality) => {
//       let yOffset = margin;
//       let pageCount = 0;

//       const addPageIfNeeded = (height) => {
//         if (pageCount === 0 || yOffset + height > pdfHeight - margin) {
//           if (pageCount > 0) {
//             pdf.addPage();
//           }
//           yOffset = margin;
//           pageCount++;
//           return true;
//         }
//         return false;
//       };

//       const sections = input.querySelectorAll(".pdf-section");
//       const sectionCanvases = await Promise.all(
//         Array.from(sections).map((section) =>
//           html2canvas(section, {
//             scale: 1.5,
//             useCORS: true,
//             logging: false,
//           })
//         )
//       );

//       for (let i = 0; i < sectionCanvases.length; i++) {
//         const canvas = sectionCanvases[i];
//         const aspectRatio = canvas.width / canvas.height;
//         let sectionHeight = contentWidth / aspectRatio;

//         while (sectionHeight > 0) {
//           const pageAdded = addPageIfNeeded(sectionHeight);
//           const heightOnThisPage = Math.min(
//             sectionHeight,
//             pdfHeight - yOffset - margin
//           );

//           const imgData = canvas.toDataURL("image/jpeg", currentQuality);
//           pdf.addImage(
//             imgData,
//             "JPEG",
//             margin,
//             yOffset,
//             contentWidth,
//             heightOnThisPage,
//             null,
//             "FAST"
//           );

//           yOffset += heightOnThisPage;
//           sectionHeight -= heightOnThisPage;

//           if (sectionHeight > 0 && !pageAdded) {
//             pdf.addPage();
//             yOffset = margin;
//           }
//         }

//         yOffset += 5; // Small gap between sections
//       }

//       const pdfOutput = pdf.output("arraybuffer");
//       return new Blob([pdfOutput]).size;
//     };

//     // Binary search for optimal quality
//     let low = 0.1;
//     let high = 1;
//     while (low <= high) {
//       quality = (low + high) / 2;
//       pdf = new jsPDF("p", "mm", "a4");
//       pdfSize = await generatePDFContent(quality);

//       if (pdfSize > maxSize) {
//         high = quality - 0.05;
//       } else if (pdfSize < minSize) {
//         low = quality + 0.05;
//       } else {
//         break;
//       }
//     }
//     pdf.save("catalogue-detail.pdf");
//     toast.update(toastID, {
//       render: `File downloaded successfully (${(pdfSize / 1024 / 1024).toFixed(
//         2
//       )}MB)`,
//       isLoading: false,
//       autoClose: 5000,
//       type: "success",
//     });
//   };

//   useEffect(() => {
//     const allUploadImages = catelogue?.offers?.filter(
//       (singleOffer) => singleOffer.images?.length !== 0
//     );
//     if (allUploadImages?.length > 0) {
//       setImageList(true);
//     }
//   }, []);

//   return (
//     <div
//       id="catalogue-detail"
//       ref={contentRef}
//       className={`pin-top ${
//         isDastop ? "" : "container"
//       } cover white text-center flex column `}
//       style={{
//         padding: isMobile ? "1rem" : isLaptop ? "2rem " : "2rem 7rem",
//         gap: "1.5rem",
//       }}
//     >
//       <div className="flex">
//         <span
//           className="material-icons-outlined pointer"
//           onClick={() => navigate(-1)}
//         >
//           arrow_back
//         </span>
//       </div>
//       <div className="pdf-section flex column" style={{ gap: "1.5rem" }}>
//         <CatelogeCompanyProfile catelogue={catelogue} />
//         <div className="p-1 cover " style={{ background: "#F8F8F8" }}>
//           <div>
//             <h5 className="mb-1">
//               Auction ID:{" "}
//               <span className="cercle-purple-text">
//                 {singleAuctionData?.auctionId}
//               </span>
//             </h5>
//             {/* <AuctionDetailsInCatelogue
//               singleAuctionData={singleAuctionData}
//               loading={loading}
//             /> */}
//           </div>
//         </div>
//       </div>

//       <div className={`pdf-section flex column`} style={{ gap: "1.5rem" }}>
//         <h4 className="cercle-purple-text margin-0px">Lot’s details</h4>
//         <OfferList catelogueList={catelogue} loadings={false} />
//       </div>

//       {/* {imageList && (
//         <div className="pdf-section flex column" style={{ gap: "1.5rem" }}>
//           <h4 className="cercle-purple-text margin-0px ">Corrigendum/photos</h4>

//           <div className="flex flex-wrap gap-1 justify-center ">
//             {catelogue?.offers?.map((singleOffer) =>
//               singleOffer.images.map((item, idx) => (
//                 <img
//                   src={`${getAuctionURL}/auction/read/image/${item}`}
//                   style={{
//                     borderRadius: "10px",
//                     width: "45%",
//                     height: "30vh",
//                     objectFit: "cover",
//                   }}
//                   alt="image1"
//                   key={idx}
//                 />
//               ))
//             )}
//           </div>
//         </div>
//       )} */}

//       <div className="pdf-section flex column" style={{ gap: "0.6rem" }}>
//         <h4 className="cercle-purple-text margin-0px ">
//           Contact officials ( Cerclex )
//         </h4>
//         <CatelogueHelpline />
//       </div>

//       <span
//         className="material-icons-outlined select-label pointer"
//         style={{ right: isMobile ? "20px" : "50px" }}
//         onClick={downloadPDF}
//       >
//         file_download
//       </span>
//     </div>
//   );
// }

// export default CatelogView;
