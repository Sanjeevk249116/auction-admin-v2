import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  capitalizeFirstLetter,
  convertTo12HourFormat,
  formatRole,
  handleDateSetUp,
  NoItemsLeftInTable,
} from "../../../helper/helpers";
import Paginations from "../../commanPage/paginationUi/Paginations";
import { Dropdown, Modal } from "react-materialize";
import InActiveModel from "../component/InActiveModel";
import ActivateModel from "../component/ActivateModel";
import { useDispatch, useSelector } from "react-redux";
import { getAdminList } from "../../../redux/action/admin";
import TableLoader from "../../commanPage/loader/TableLoader";

function AdminListTable({ searchData }) {
  const totalNumberRow = 100;
  const dispatch = useDispatch();
  const { adminList, adminLoading } = useSelector((state) => state.admin);
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageVisited, setMaxPageVisited] = useState(1);

  const [inactiveOpenModel, setInactiveOpenModal] = useState(false);
  const [activeOpenModel, setActiveOpenModal] = useState(false);
  const [clickUser, setClickUser] = useState({});

  useEffect(() => {
    dispatch(getAdminList());
  }, [dispatch]);

  if (adminLoading) {
    return (
      <div className="valign-wrapper justify-center cover white mt-1">
        <TableLoader
          headerData={[
            "S.No",
            "Name",
            "Email",
            "Phone",
            "Created At",
            "Status",
            "Action",
          ]}
        />
      </div>
    );
  }

  return (
    <>
      <div className={`${!isTablet && "table-container-style"} mt-1`}>
        {adminList?.length <= 0 && searchData !== "" ? (
          <NoItemsLeftInTable />
        ) : (
          <table
            className={`responsive-table centered ${
              isTablet ? "auction_table table-style" : "custom-table-style"
            } `}
          >
            <thead className="grey lighten-4 ">
              <tr className="centered">
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Login Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {adminList?.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item?.name}</td>
                  <td style={{ width: !isTablet && "300px" }}>{item?.email}</td>
                  <td>{item?.phoneNumber}</td>
                  <td>{formatRole(item?.role?.name)}</td>
                  <td>{handleDateSetUp(item?.createdAt)}</td>
                  <td>
                    {`${handleDateSetUp(
                      item?.loginDetails?.loginTime
                    )}, ${convertTo12HourFormat(
                      item?.loginDetails?.loginTime
                    )}`}
                  </td>
                  <td>
                    <span
                      className={`${
                        item?.status === "active" ? "green-text" : "orange-text"
                      }`}
                    >
                      {capitalizeFirstLetter(item?.status)}
                    </span>
                  </td>
                  <td>
                    <Dropdown
                      id={`${item?.phoneNumber}`}
                      options={{
                        alignment: "left",
                        coverTrigger: false,
                        constrainWidth: false,
                      }}
                      trigger={
                        <span className="material-icons-outlined pointer">
                          more_vert
                        </span>
                      }
                    >
                      <div className="valign-wrapper column white">
                        <button
                          className={`pointer font-16px full-width ${
                            item?.status !== "active" && "onHover"
                          }`}
                          style={{ padding: "10px 20px" }}
                          disabled={item?.status === "active"}
                          onClick={() => {
                            setClickUser(item);
                            setActiveOpenModal(true);
                          }}
                        >
                          Activate Account
                        </button>

                        <p
                          className="full-width grey"
                          style={{ height: "1px" }}
                        ></p>
                        <button
                          className={`pointer font-16px full-width ${
                            (item?.role?.name !== "super_admin" &&
                            item?.status === "active")
                              ? "onHover"
                              : ""
                          }`}
                          style={{ padding: "10px 20px" }}
                          disabled={
                            item?.status !== "active" ||
                            item?.role?.name === "super_admin"
                          }
                          onClick={() => {
                            setInactiveOpenModal(true);
                            setClickUser(item);
                          }}
                        >
                          Deactivate Account
                        </button>
                      </div>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {adminList?.length === 0 && searchData === "" && <NoItemsLeftInTable />}
      </div>

      {adminList?.length !== 0 && (
        <Paginations
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalNumberRow={totalNumberRow}
          totalData={adminList?.length}
          maxPageVisited={maxPageVisited}
          setMaxPageVisited={setMaxPageVisited}
        />
      )}

      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        className="modelAccount"
        id="modalView-pcbConfirmation"
        open={inactiveOpenModel}
        options={{
          onCloseEnd: () => setInactiveOpenModal(false),
        }}
      >
        <InActiveModel
          setInactiveOpenModal={setInactiveOpenModal}
          clickUser={clickUser}
        />
      </Modal>
      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        className="modelAccount"
        id="modalView-pcbConfirmation"
        open={activeOpenModel}
        options={{
          onCloseEnd: () => setActiveOpenModal(false),
        }}
      >
        <ActivateModel
          setActiveOpenModal={setActiveOpenModal}
          clickUser={clickUser}
        />
      </Modal>
    </>
  );
}

export default AdminListTable;
