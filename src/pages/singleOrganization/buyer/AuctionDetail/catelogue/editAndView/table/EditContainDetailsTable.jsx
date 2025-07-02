import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { NoItemsLeftInTable } from "../../../../../../../helper/helpers";

const EditContainDetailsTable = ({
  updateItems,
  catelogueInformation,
  setCatelogueInformation,
}) => {
  const isTablet = useMediaQuery({ query: "(max-width: 600px)" });
  const [tableData, setTableData] = useState(
    catelogueInformation?.contactOfficialData
  );

  const handleInputChange = (e, rowId, field) => {
    const { value } = e.target;
    const updatedTable = tableData?.map((row) =>
      row._id === rowId ? { ...row, [field]: value } : row
    );
    setTableData(updatedTable);
  };

  const deleteRow = (id) => {
    const deleteTableRow = tableData?.filter((item) => {
      return item._id !== id;
    });

    const updatedTable = deleteTableRow?.map((row, index) => {
      return { ...row, _id: index + 1 };
    });
    setTableData(updatedTable);
  };

  const addNewRow = () => {
    const newRow = {
      _id: tableData.length + 1,
      name: "",
      mobileNumber: "",
    };
    setTableData([...tableData, newRow]);
  };

  const filterEmptyTable = () => {
    const ValidTableRow = tableData?.filter((item) => {
      return item.name !== "" && item.mobileNumber !== "";
    });
    setTableData(ValidTableRow);
    setCatelogueInformation((pre) => ({
      ...pre,
      contactOfficialData: ValidTableRow,
    }));
  };

  useEffect(() => {
    filterEmptyTable();
  }, [updateItems]);

  useEffect(() => {
    setTableData(catelogueInformation?.contactOfficialData);
  }, [catelogueInformation?.contactOfficialData]);

  return (
    <div className="table-container-style mt-1">
      <table
        className={`${isTablet ? "responsive-table" : ""} centered ${
          isTablet ? "auction_table table-style" : "custom-table-style"
        } `}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Mobile</th>
            {updateItems && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {tableData?.map((row, index) => (
            <>
              {updateItems ? (
                <tr key={row._id}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      className={`input-tag-style width-edit`}
                      value={row.name}
                      onChange={(e) => handleInputChange(e, row._id, "name")}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className={`input-tag-style width-edit`}
                      value={row.mobileNumber}
                      onChange={(e) => handleInputChange(e, row._id, "mobileNumber")}
                    />
                  </td>
                  <td style={{ width: "100px" }}>
                    <span className="valign-wrapper gap-1 justify-center">
                      {index === tableData.length - 1 && (
                        <span
                          className="material-icons-outlined pointer"
                          onClick={addNewRow}
                        >
                          add_box
                        </span>
                      )}
                      <span
                        className="material-icons-outlined pointer"
                        onClick={() => deleteRow(row._id)}
                      >
                        delete
                      </span>
                    </span>
                  </td>
                </tr>
              ) : (
                <tr key={row.id}>
                  <td>{index + 1}</td>
                  <td>{row.name}</td>
                  <td>{row?.mobileNumber}</td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
      {tableData?.length === 0 && (
        <>
          {updateItems ? (
            <div
              className="valign-wrapper justify-center"
              style={{ height: "100px" }}
            >
              <button
                className="valign-wrapper justify-center gap-10px"
                style={{
                  padding: "8px 15px",
                  border: "1px solid purple",
                  borderRadius: "8px",
                }}
                onClick={addNewRow}
              >
                <span className="material-symbols-outlined font-18px">add</span>
                <span>Add new </span>
              </button>
            </div>
          ) : (
            <NoItemsLeftInTable height={"110px"} />
          )}
        </>
      )}
    </div>
  );
};

export default EditContainDetailsTable;
