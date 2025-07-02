// File: src/utils/pdfUtils.js

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "react-toastify";

export const downloadPDF = (content, fileName) => {
  const toastId = toast.loading("Generating PDF, please wait...");

  html2canvas(content)
    .then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Define outer and inner padding (in mm)
      const outerPadding = 6;
      const innerPadding = 5;

      // Calculate available space for content
      const availableWidth = pdfWidth - 2 * outerPadding - 2 * innerPadding;
      const availableHeight = pdfHeight - 2 * outerPadding - 2 * innerPadding;

      const ratio = Math.min(
        availableWidth / imgWidth,
        availableHeight / imgHeight
      );

      // Calculate image dimensions
      const scaledImgWidth = imgWidth * ratio;
      const scaledImgHeight = imgHeight * ratio;

      // Add border
      pdf.setDrawColor("purple");
      pdf.setLineWidth(0.1);
      pdf.rect(
        outerPadding,
        outerPadding,
        pdfWidth - 2 * outerPadding,
        pdfHeight - 2 * outerPadding
      );

      // // Add heading
      // pdf.setFont("helvetica", "bold");
      // pdf.setTextColor(128, 0, 128); // Purple color
      // pdf.setFontSize(12);
      // pdf.text(
      //   "Completed Auction Bids",
      //   outerPadding + innerPadding,
      //   outerPadding + innerPadding + 10
      // );

      // Add image (aligned to top-left, considering both outer and inner padding, and heading)
      pdf.addImage(
        imgData,
        "PNG",
        outerPadding + innerPadding,
        outerPadding + innerPadding + 15, // Add extra space for heading
        scaledImgWidth,
        scaledImgHeight
      );

      pdf.save(fileName);

      toast.update(toastId, {
        render: "PDF downloaded successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    })
    .catch((error) => {
      console.error("Error generating PDF:", error);
      toast.update(toastId, {
        render: "Error generating PDF. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    });
};
