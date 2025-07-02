import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { NoItemsLeftInTable } from "../../../../../helper/helpers";
import Pagination from "../../../../commanPage/paginationUi/Pagination";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBidderPermissionDetails } from "../../../../../redux/action/bidPermission";
import TableLoader from "../../../../commanPage/loader/TableLoader";



function BiddingPermission({searchData}) {
  const totalNumberRow = 50;
  const { id } = useParams();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const[bidPermissionData, setBidPermissionData] = useState([]);
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const { permissionBidder, permissionBidderLoading } = useSelector(
    (state) => state.bidderPermission
  );

  useEffect(() => {
    dispatch(getBidderPermissionDetails(id));
  }, [id, dispatch]);


  useEffect(()=>{
  setBidPermissionData(permissionBidder)
  },[permissionBidder])

  useEffect(() => {
    if (searchData) {
      const filteredData = permissionBidder?.filter((item) => {
        return (
          item?.trader?.organizationName
            ?.toLowerCase()
            .includes(searchData.toLowerCase()) ||
          item?.trader?.GSTIN?.toLowerCase().includes(searchData.toLowerCase()) ||
          item?.trader?.panCardNumber
            ?.toLowerCase()
            .includes(searchData.toLowerCase())
        );
      });
      setBidPermissionData(filteredData);
    } else {
      setBidPermissionData(permissionBidder);
    }
  },[searchData, permissionBidder]);

  if (permissionBidderLoading) {
    return (
      <div className="valign-wrapper justify-center cover white mt-1">
        <TableLoader
          headerData={[
            "Organization",
            "GST",
            "Pan Card",
            "Paid lots",
            "PCB Account",
          ]}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="table-container-style mt-1">
        <table
          className={`responsive-table centered ${
            isTablet ? "auction_table table-style" : "custom-table-style"
          }`}
        >
          <thead>
            <tr>
              <th>Organization</th>
              <th>GST</th>
              <th>Pan Card</th>
              <th>Paid lots</th>
              <th>PCB Account</th>
            </tr>
          </thead>
          <tbody>
            {bidPermissionData
              ?.slice(currentPage, currentPage + totalNumberRow)
              ?.map((item, index) => (
                <tr key={item?._id}>
                  <td>{item?.trader?.organizationName}</td>
                  <td>{item?.trader?.GSTIN}</td>
                  <td>{item?.trader?.panCardNumber||"..."}</td>

                  <td>{item?.offers?.length}</td>
                  <td>{item?.trader?.PCBVerified ? "Yes" : "No"}</td>

                  <td>
                    <span
                      style={{
                        color:
                          item?.status === "Active"
                            ? "green"
                            : item?.status === "Inactive"
                            ? "red"
                            : "orange",
                      }}
                    >
                      {item?.status}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {bidPermissionData?.length === 0 && <NoItemsLeftInTable />}
      </div>
      <Pagination
        Data={bidPermissionData}
        totalNumberRow={totalNumberRow}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default BiddingPermission;
