import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  capitalizeFirstLetter,
  formatFileSize,
  handleDateSetUp,
} from "../../../../../helper/helpers";
import { Dropdown } from "react-materialize";
import { useMediaQuery } from "react-responsive";
import {
  slideDown,
  slideUp,
} from "../../../../commanPage/table/AnimationTable";
import CatalogueHistoryRecord from "../children/CatalogueHistoryRecord";

function CatalogueTableRow({
  item,
  viewModelForNotApprovel,
  viewDetailsFunctionality,
  expandedRow,
  setExpandedRow,
  singleAuctionData
}) {
  const { id } = useParams();
  const rowRef = useRef(null);
  const navigate = useNavigate();
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });

  const toggleRow = (itemId, rowRef) => {
    if (expandedRow === itemId) {
      slideUp(rowRef.current, {
        onComplete: () => setExpandedRow(null),
      });
    } else {
      setExpandedRow(itemId);
      slideDown(rowRef.current);
    }
  };

  return (
    <>
      <tr key={item?._id}>
        <td style={{ width: !isTablet ? "220px" : "auto" }}>
          <span className="NoOfline" style={{ WebkitLineClamp: 1 }}>
            {item?.fileName}
          </span>
        </td>
        <td>{formatFileSize(item?.fileSize)}</td>
        <td>
          <span
            className="pointer valign-wrapper justify-center font-18px gap-5px"
            data-tooltip-id="tooltip-downlaodList"
            onClick={() =>
              navigate(`/single-auction/downloadBy/${id}/${item?._id}`)
            }
          >
            <span className="text-decoration-underLine">{item?.downloadedBy?.length}</span>
            <span className="material-symbols-outlined font-20px">
              visibility
            </span>
          </span>
        </td>
        <td>
          <span
            className="pointer valign-wrapper justify-center font-18px gap-5px"
            data-tooltip-id="tooltip-viewList"
            onClick={() =>
              navigate(`/single-auction/viewBy/${id}/${item?._id}`)
            }
          >
            <span className="text-decoration-underLine">{item?.viewedBy?.length || 0}</span>
            <span className="material-symbols-outlined font-20px">
              visibility
            </span>
          </span>
        </td>
        <td>
          <span
            className="pointer valign-wrapper justify-center font-18px gap-5px"
            data-tooltip-id="tooltip-acceptedList"
            onClick={() =>
              navigate(`/single-auction/acceptedBy/${id}/${item?._id}`)
            }
          >
            <span className="text-decoration-underLine">{item?.tradersConfirmed?.length || 0}</span>
            <span className="material-symbols-outlined font-20px">
              visibility
            </span>
          </span>
        </td>
        <td>
          <span
            className="pointer valign-wrapper justify-center font-18px gap-5px"
            data-tooltip-id="tooltip-rejectedList"
            onClick={() =>
              navigate(`/single-auction/rejectedBy/${id}/${item?._id}`)
            }
          >
            <span className="text-decoration-underLine">{item?.tradersRejected?.length || 0}</span>
            <span className="material-symbols-outlined font-20px">
              visibility
            </span>
          </span>
        </td>
        <td>{handleDateSetUp(item?.createdAt)}</td>

        <td>
          <span
            className={
              item?.industryApproval?.status === "rejected"
                ? "red-text"
                : item?.industryApproval?.status === "approval"
                  ? "green-text"
                  : "orange-text"
            }
          >
            {item?.industryApproval?.status === "approval"
              ? capitalizeFirstLetter(item?.industryApproval?.status)
              : "Not Approved"}
          </span>
        </td>
        <td style={{ width: "200px" }}>
          <span className="valign-wrapper justify-center gap-1">
            <span
              className="material-icons cercle-purple-text pointer"
              onClick={() => navigate(`/catalogue-view/${item?._id}`)}
            >
              visibility
            </span>
            <span
              className="material-icons cercle-purple-text pointer"
              onClick={() => toggleRow(item?._id, rowRef)}
            >
              history
            </span>
            {singleAuctionData?.status !== "completed" && 
            <Dropdown
              id={`dropdown-${item._id}`}
              options={{ constrainWidth: false, alignment: "right" }}
              trigger={
                <span className="material-icons-outlined pointer">
                  more_vert
                </span>
              }
            >
              <div
                className="valign-wrapper column white justify-center"
                style={{ width: "150px" }}
              >
                <button
                  className="pointer font-16px full-width onHover"
                  style={{ padding: "10px 0" }}
                  onClick={() => viewDetailsFunctionality(item)}
                >
                  Approve
                </button>
                <p
                  className="full-width grey lighten-2"
                  style={{ height: "1px" }}
                ></p>
                <button
                  className="pointer font-16px full-width onHover"
                  style={{ padding: "10px 0" }}
                  onClick={() => viewModelForNotApprovel(item)}
                >
                  Not Approved
                </button>
              </div>
            </Dropdown>}
          </span>
        </td>
      </tr>
      <tr
        ref={rowRef}
        style={{ display: expandedRow === item?._id ? "table-row" : "none" }}
      >
        <td colSpan={9}>
          {item?.commands?.length !== 0 && (
            <h5 className="font-16px" style={{ padding: "7px" }}>
              History Record
            </h5>
          )}
          <CatalogueHistoryRecord
            rejectCommands={[...item?.commands]?.reverse()}
          />
        </td>
      </tr>
    </>
  );
}

export default CatalogueTableRow;
