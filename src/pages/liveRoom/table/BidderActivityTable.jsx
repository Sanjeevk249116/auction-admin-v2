import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import {
  getTimeDurationAndStatus,
  NoItemsLeftInTable,
} from "../../../helper/helpers";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bidderActivityInLiveRoom } from "../../../redux/action/liveRoom";
import TableLoader from "../../commanPage/loader/TableLoader";
import { getSocket } from "../../../helper/SingletonSocketService";

function BidderActivityTable() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const { biderActivity, liveRoomSingleAuctionLoading } = useSelector(
    (state) => state.liveAuction
  );

  useEffect(() => {
    const socket = getSocket();
    socket?.on("update-live-room-joining", (data) => {
      dispatch(bidderActivityInLiveRoom(id));
    });
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(bidderActivityInLiveRoom(id));
  }, [dispatch, id]);

  if (liveRoomSingleAuctionLoading) {
    return (
      <div className="valign-wrapper justify-center cover white mt-1">
        <TableLoader
          headerData={[
            "S.No",
            "Organization Name",
            "Email",
            "Phone Number",
            "Time Duration",
            "Status",
          ]}
        />
      </div>
    );
  }

  return (
    <div className={` mt-1 ${!isTablet && "table-container-style"}`}>
      <table
        className={`responsive-table centered ${
          isTablet
            ? "auction_table table-style"
            : "custom-table-style liveAuction-table"
        } `}
      >
        <thead>
          <tr>
            <th>S.No</th>
            <th>Organization Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Time Duration</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {biderActivity?.liveParticipants?.map((bidder, index) => {
            const { timeDuration, status } = getTimeDurationAndStatus(
              bidder.joinedAt,
              bidder.leftAt
            );

            return (
              <tr
                key={bidder._id}
                style={{ backgroundColor: status === "Active" && "#FBF1FF" }}
              >
                <td>{index + 1}</td>
                <td>{bidder?.organization?.organizationName}</td>
                <td>{bidder?.organization?.owner?.email}</td>
                <td>{bidder.organization?.owner?.phoneNumber}</td>
                <td>{timeDuration}</td>
                <td
                  className={`${
                    status === "Active" ? "green-text" : "red-text"
                  }`}
                >
                  {status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {biderActivity?.liveParticipants?.length === 0 && <NoItemsLeftInTable />}
    </div>
  );
}

export default BidderActivityTable;
