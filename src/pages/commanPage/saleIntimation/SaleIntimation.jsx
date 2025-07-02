import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { downloadSaleIntimationPdf, getSaleIntimationViewPdf } from '../../../redux/action/saleIntimation';

function SaleIntimation() {
    const dispatch = useDispatch();
    const { fileId } = useParams();
    const navigate = useNavigate();
    const [viewPdf, setViewPdf] = useState(null);
    const [error, setError] = useState(null);
    const { saleIntimationPdfUrl, saleIntimationLoading, PdfLoading } = useSelector(
        (state) => state.saleIntimation
    );

    // const defaultLayoutPluginInstance = defaultLayoutPlugin();

    useEffect(() => {
        dispatch(getSaleIntimationViewPdf(fileId));
    }, [dispatch, fileId]);



    useEffect(() => {
        if (saleIntimationPdfUrl) {
            setViewPdf(saleIntimationPdfUrl);
            setError(null);
        }
    }, [saleIntimationPdfUrl]);

    if (saleIntimationLoading) {
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
                    <h5>View Sale Intimation</h5>
                </span>
                {saleIntimationPdfUrl && <button
                    className={`button-style pointer cercle-purple white-text font-weight-600 font-18px font-cercular-bold`}
                    style={{
                        padding: "5px 30px",
                    }}
                    onClick={() => {
                        dispatch(downloadSaleIntimationPdf(fileId));
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
                        </div>
                    </Worker>
                ) : (
                    <div>No PDF to display</div>
                )}
            </div>
        </div>
    );
}

export default SaleIntimation
