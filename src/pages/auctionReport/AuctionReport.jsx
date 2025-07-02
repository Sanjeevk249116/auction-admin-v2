import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { downloadAuctionReportPdf, getAuctionReportPdf } from "../../redux/action/auctionReport";


const AuctionReport = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [viewPdf, setViewPdf] = useState(null);
    const [error, setError] = useState(null);
    const { reportPdfUrl, reportViewPdfLoading, PdfLoading } = useSelector(
        (state) => state.getAuctionReportViewPdf
    );

    // const defaultLayoutPluginInstance = defaultLayoutPlugin();

    useEffect(() => {
        dispatch(getAuctionReportPdf(id));
    }, [dispatch, id]);



    useEffect(() => {
        if (reportPdfUrl) {
            setViewPdf(reportPdfUrl);
            setError(null);
        }
    }, [reportPdfUrl]);

    if (reportViewPdfLoading) {
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
                    <h5>View Auction Report</h5>
                </span>
                {reportPdfUrl && <button
                    className={`button-style pointer cercle-purple white-text font-weight-600 font-18px font-cercular-bold`}
                    style={{
                        padding: "5px 30px",
                    }}
                    onClick={() => {
                        dispatch(downloadAuctionReportPdf(id));
                    }}
                    disabled={PdfLoading}
                >
                    {PdfLoading ? "Downloading ...." : "Download"}
                </button>}
            </div>
            <div className="flex justify-center pin-top">
                {viewPdf ? (
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <div className="pin-top" style={{ width: "950px" }}>
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

export default AuctionReport;
