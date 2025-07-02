import React from "react";
import { useMediaQuery } from "react-responsive";

function ContactPersonTable({ catelogueInformation }) {
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });


  return (
    <div className="table-container-style">
      <table
        className={`responsive-table centered catelogTable ${
          isTablet ? "auction_table table-style" : "custom-table-style"
        } `}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {catelogueInformation?.contactOfficialData?.map((item,index) => (
            <tr key={item.id}>
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>{item.mobileNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactPersonTable;
