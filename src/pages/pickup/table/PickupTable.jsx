import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Modal } from "react-materialize";
import {
  capitalizeFirstLetter,
  handleDateSetUp,
  NoItemsLeftInTable,
  notifySuccess,
} from "../../../helper/helpers";
import allPickup from "../../../jsonData/allPickup.json";
import SpecificDate from "../children/SpecificDate";
import PickupRerenderButton from "../components/PickupRerenderButton";
import Paginations from "../../commanPage/paginationUi/Paginations";

function PickupTable() {
  const totalNumberRow = 30;
  const [pickupId, setPickupId] = useState(false);
  const [modalType, setModalType] = useState(null);
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageVisited, setMaxPageVisited] = useState(1);

  const loadings = false;
  const handleActionClick = (id, type) => {
    setPickupId(id);
    setModalType(type);
  };

  const handleRequestAction = (action) => {
    notifySuccess("Successfully Submitted");
    setPickupId("");
    setModalType(null);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "yellow-text text-darken-1";
      case "cancelled":
      case "reject":
        return "red-text";
      case "accepted":
        return "purple-text";
      default:
        return "green-text";
    }
  };

  return (
    <div>
      {loadings ? (
        <div className="valign-wrapper justify-center cover white"></div>
      ) : (
        <div className="table-container-style mt-1">
          <table
            className={`responsive-table centered ${
              isTablet ? "auction_table table-style" : "custom-table-style"
            } `}
          >
            <thead>
              <tr>
                <th>Auction Id</th>
                <th>Seller</th>
                <th>Buyer</th>
                <th>Scrap Type</th>
                <th>Quantity</th>
                <th>Pickup Time</th>
                <th>Pickup Date</th>
                <th>Assistant</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allPickup
                ?.slice()
                ?.reverse()
                ?.map((item) => (
                  <tr key={item?._id}>
                    <td>{item?.auction?.auctionId}</td>
                    <td>{item?.seller?.organizationName}</td>
                    <td>{"Cerclex"}</td>
                    <td>{item?.scrapDetails?.type}</td>
                    <td>
                      {item?.scrapDetails?.quantity}/{item?.scrapDetails?.unit}
                    </td>
                    <td>
                      {item?.pickupTime?.type === "specificTime"
                        ? item?.pickupTime?.startingTime
                        : `${item?.pickupTime?.timeRange?.startTime} - ${item?.pickupTime?.timeRange?.endTime}`}
                    </td>
                    <td style={{ width: "150px" }}>
                      <span className="NoOfline" style={{ WebkitLineClamp: 1 }}>
                        {item?.pickupDate?.type === "deadline" ? (
                          handleDateSetUp(item?.pickupDate?.deadLine)
                        ) : (
                          <SpecificDate
                            specificDates={item?.pickupDate?.specificDates}
                            toolValue={`tooltip-${item?._id}/date`}
                          />
                        )}
                      </span>
                    </td>
                    <td style={{ width: !isTablet && "100px" }}>
                      {item?.loadingAssistance ? "Yes" : "No"}
                    </td>
                    <td style={{ width: !isTablet && "200px" }}>
                      <p
                        className="NoOfline pointer"
                        style={{ WebkitLineClamp: 1 }}
                        data-tooltip-id={`tooltip-${item?._id}/location`}
                      >
                        {item?.pickupLocation?.address}
                      </p>
                    </td>
                    <td>
                      <span className={getStatusClass(item?.status)}>
                        {capitalizeFirstLetter(item?.status)}
                      </span>
                    </td>
                    <td style={{ width: "230px" }}>
                      <PickupRerenderButton
                        item={item}
                        handleActionClick={handleActionClick}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {allPickup?.length === 0 && <NoItemsLeftInTable />}
        </div>
      )}
      <Paginations
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalNumberRow={totalNumberRow}
        totalData={allPickup?.length}
        maxPageVisited={maxPageVisited}
        setMaxPageVisited={setMaxPageVisited}
      />

      <Modal
        actions={[]}
        id="actionModal"
        open={!!modalType}
        options={{
          onCloseEnd: () => setModalType(null),
        }}
      >
        <h3 className="normal-size margin-0px">
          Confirm to{" "}
          {modalType === "reject"
            ? "Reject"
            : modalType === "accept"
            ? "Accept"
            : "Completed"}{" "}
          Pickup
        </h3>
        <p className="font-16px">
          Could you please confirm if you would like to{" "}
          {modalType === "reject"
            ? "reject"
            : modalType === "accept"
            ? "accept"
            : "completed"}{" "}
          the scheduled pickup? Your confirmation is required for processing.
        </p>
        <div className="flex justify-end gap-1 mt-1">
          <button
            className="green btn-small"
            onClick={() => handleRequestAction(modalType)}
          >
            Yes
          </button>
          <button
            className="red btn-small modal-close"
            onClick={() => setModalType(null)}
          >
            No
          </button>
        </div>
      </Modal>
      {allPickup?.map((item) => (
        <React.Fragment key={item?._id}>
          <ReactTooltip
            id={`tooltip-${item?._id}/location`}
            place="top"
            content={
              <p style={{ width: "200px" }}>{item?.pickupLocation?.address}</p>
            }
          />
          <ReactTooltip
            id={`tooltip-${item?._id}/date`}
            place="top"
            content={
              <div
                className="valign-wrapper justify-center column"
                style={{ width: "130px" }}
              >
                {item?.pickupDate?.specificDates?.map((date, index) => (
                  <p key={index}>Date: {handleDateSetUp(date)}</p>
                ))}
              </div>
            }
          />
        </React.Fragment>
      ))}
    </div>
  );
}

export default PickupTable;
