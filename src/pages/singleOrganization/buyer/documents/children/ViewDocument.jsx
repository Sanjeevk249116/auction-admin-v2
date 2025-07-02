import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Worker, Viewer } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { getViewDocument } from "../../../../../redux/action/document";
import { useMediaQuery } from "react-responsive";

const ViewDocument = ({ id, fileId, setIsViewDocument }) => {
  const dispatch = useDispatch();
  const [width, setWidth] = useState(400);
  const [viewPdf, setViewPdf] = useState(null);
  const [error, setError] = useState(null);
  const isTablet = useMediaQuery({ query: "(max-width: 650px)" });
  const { viewDocument, viewDocumentLoading, fileType } = useSelector(
    (pre) => pre.allDocuments
  );

  const increaseSize = () => {
    setWidth((prev) => prev + 30);
  };

  const decreaseSize = () => {
    setWidth((prev) => (prev > 400 ? prev - 30 : prev));
  };

  useEffect(() => {
    dispatch(getViewDocument(id, fileId));
  }, [dispatch, id, fileId]);

  useEffect(() => {
    if (viewDocument) {
      setViewPdf(viewDocument);
      setError(null);
    }
  }, [viewDocument]);

  if (viewDocumentLoading) {
    return <div>Loading File...</div>;
  }

  if (error) {
    return <div>Error loading File: {error}</div>;
  }

  return (
    <div className="flex column">
      <span className={`valign-wrapper ${isTablet ? "justify-end" : "space-between"}`}>
        {!isTablet && <div className="flex justify-center gap-1 mb-1 ">
          <button onClick={increaseSize} className="cover font-30px cercle-purple white-text pointer" style={{ padding: "0px 8px" }}>+</button>
          <button onClick={decreaseSize} className="cover font-30px cercle-purple white-text purple-bg pointer" style={{ padding: "0px 10px" }}>-</button>
        </div>}
        <span
          className="material-icons-outlined pointer"
          onClick={() => setIsViewDocument(false)}
        >
          close
        </span>

      </span>

      <div className="flex justify-center pin-top">
        {viewPdf ? (
          fileType === "application/pdf" ? (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <div
                style={{
                  height: "100vh",
                  width: "100vw",
                }}
              >
                <Viewer fileUrl={viewPdf} />
              </div>
            </Worker>
          ) : fileType.startsWith("image/") ? (
            <img
              src={viewPdf}
              alt="Document Preview"
              style={{
                width: isTablet ? "100%" : `${width}px`,
                height: "auto",
                transition: "width 0.3s ease",
              }}
            />
          ) : (
            <div>Unsupported file type: {fileType}</div>
          )
        ) : (
          <div>No document to display</div>
        )}
      </div>
    </div>
  );
};


export default ViewDocument;
