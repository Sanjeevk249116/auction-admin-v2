import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import {
  downloadCateloguePdf,
  getCatalogueViewPdf,
} from "../../../../../../redux/action/catelogue";

const CatalogueViewPdf = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [viewPdf, setViewPdf] = useState(null);
  const [error, setError] = useState(null);
  const { CateloguePdfUrl, catelogueViewPdfLoading, PdfLoading } = useSelector(
    (state) => state.catelogueViewPdf
  );

  // const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    dispatch(getCatalogueViewPdf(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (CateloguePdfUrl) {
      setViewPdf(CateloguePdfUrl);
      setError(null);
    }
  }, [CateloguePdfUrl]);

  if (catelogueViewPdfLoading) {
    return <div>Loading PDF...</div>;
  }

  if (error) {
    return <div>Error loading PDF: {error}</div>;
  }

  return (
    <div className="flex column mt-1">
      <div className="valign-wrapper space-between">
        <span className="valign-wrapper gap-1">
          <span
            className="material-icons-outlined pointer"
            onClick={() => navigate(-1)}
          >
            arrow_back
          </span>
          <h4>View Catalogue</h4>
        </span>
        {CateloguePdfUrl && <button
          className={`button-style pointer cercle-purple white-text font-weight-600 font-18px font-cercular-bold`}
          style={{
            padding: "5px 30px",
          }}
          onClick={() => {
            dispatch(downloadCateloguePdf(id));
          }}
          disabled={PdfLoading}
        >
          {PdfLoading ? "Downloading ...." : "Download"}
        </button>}
      </div>
      <div className="flex justify-center pin-top">
        {viewPdf ? (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <div className="pin-top" style={{ width: "950px",height:"100%" }}>
              <Viewer
                fileUrl={viewPdf}
                plugins={[]}
                onError={(e) => setError(e.message)}
              />
              {/* <div
                className="grey lighten-3 select-label"
                style={{
                  top: "1.6px",
                  zIndex: 999,
                  height: "36px",
                  width: "120px",
                  right: "2%",
                }}
              ></div> */}
            </div>
          </Worker>
        ) : (
          <div>No PDF to display</div>
        )}
      </div>
    </div>
  );
};

export default CatalogueViewPdf;
