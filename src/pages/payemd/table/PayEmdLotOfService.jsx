import React, { useState } from "react";
import TableLoader from "../../commanPage/loader/TableLoader";
import { useMediaQuery } from "react-responsive";
import { NoItemsLeftInTable } from "../../../helper/helpers";
import { DatePicker } from "react-materialize";
import { useNavigate, useParams } from "react-router-dom";
import { adminPayEMD } from "../../../redux/action/auction";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";

function PayEmdLotOfService({ offers, singleAuctionLoading }) {
  const navigate = useNavigate();
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const [selectedOffer, setSelectedOffer] = useState([]);
  const [traderEmail, setTraderEmail] = useState("");
  const [date, setDate] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleDateChange = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setDate(formattedDate);
  };

  const handleEachOfferSelection = (id) => {
    if (selectedOffer.some((obj) => obj.offer === id)) {
      setSelectedOffer((oldData) =>
        oldData.filter((singleOffer) => singleOffer.offer !== id)
      );
    } else {
      setSelectedOffer((oldData) => [
        ...oldData,
        {
          EMDAmount: 0,
          offer: id,
        },
      ]);
    }
  };

  const validateFields = () => {
    if (!traderEmail || !date || selectedOffer.length === 0) {
      return true;
    }
    for (let i = 0; i < selectedOffer.length; i++) {
      if (selectedOffer[i].EMDAmount <= 0) {
        return true;
      }
    }
  };

  function handleChangeAmountPaid(offerId, amount) {
    setSelectedOffer((prevOffers) => {
      return prevOffers.map((singleOffer) =>
        singleOffer.offer === offerId
          ? { ...singleOffer, EMDAmount: amount }
          : singleOffer
      );
    });
  }

  const handleShowLogo = (date) => {
    const value = document.querySelector(`#${date}`);
    value.click();
  };

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      offers: selectedOffer,
      traderEmail: traderEmail,
      date: date,
    };

    dispatch(adminPayEMD(id, data, setSubmitLoading, navigate));
  }

  if (singleAuctionLoading) {
    return (
      <div className="valign-wrapper justify-center cover white">
        <TableLoader
          headerData={[
            "Lots Id",
            "Service Title",
            "Quantity / UOM",
            "EMD Amount (Rs.)",
            "Amount Paid",
          ]}
        />
      </div>
    );
  }

  return (
    <div className={`${!isTablet && "table-container-style"}full-width`}>
      <h6>Selected Lots: {selectedOffer.length}</h6>
      <form onSubmit={handleSubmit}>
        <table
          className={`responsive-table centered ${
            isTablet ? "auction_table table-style" : "custom-table-style"
          } `}
        >
          <thead>
            <tr>
              <th></th>
              <th>Lots Id.</th>
              <th>Service Title</th>
              <th>Event Fee</th>
              <th>Category</th>
              <th>EMD Amount (Rs.)</th>
              <th>Amount Paid</th>
            </tr>
          </thead>
          <tbody>
            {offers?.map((items) => (
              <tr key={items?._id}>
                <td>
                  {" "}
                  <span
                    className="material-symbols-outlined pointer"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEachOfferSelection(items?._id)}
                  >
                    {selectedOffer.some((obj) => obj.offer === items._id)
                      ? "check_box"
                      : "check_box_outline_blank"}
                  </span>
                </td>
                <td>{items?.offerNumber}</td>
                <td>{items?.serviceDetails?.title}</td>
                <td>{items?.eventFee || 0}</td>
                <td>
                  {items?.serviceDetails?.category}
                </td>
                <td>{items?.EMDAmount}</td>
                <td className="flex align-center justify-center ">
                  <input
                    type="number"
                    placeholder="Amount Paid"
                    className="input-table"
                    value={
                      selectedOffer.find((obj) => obj.offer === items._id)
                        ?.EMDAmount || ""
                    }
                    disabled={
                      !selectedOffer.some((obj) => obj.offer === items._id)
                    }
                    onChange={(e) => {
                      handleChangeAmountPaid(items._id, e.target.value);
                    }}
                    key={items._id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className={`mt-2 gap-2 ${isTablet && "mr-1"}`}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "repeat(1,1fr)"
              : isTablet
              ? "repeat(2,1fr)"
              : "repeat(3,1fr)",
          }}
        >
          <span>
            <p>
              Email <span className=" red-text">*</span>
            </p>
            <input
              type="email"
              name="emailId"
              placeholder="Enter email"
              value={traderEmail}
              onChange={(e) => setTraderEmail(e.target.value)}
              className="input-tag-style input-width"
            />
          </span>

          <span className={`flex column pin-top `}>
            <p className="black-text">
              Pay emd Date <span className="red-text">*</span>
            </p>
            <DatePicker
              id="payEmdDate"
              role="input"
              name="payEmdDate"
              value={date}
              onChange={(date) => {
                handleDateChange(date);
                document.body.style.overflow = "auto";
              }}
              type={!isTablet && `date`}
              className="input-width input-tag-style margin-0px"
              required
            />
            <span
              className="material-icons-outlined logo-Date-time pointer"
              onClick={() => handleShowLogo("payEmdDate")}
            >
              calendar_month
            </span>
          </span>
        </div>
        <div className={`mt-1 flex justify-center`}>
          <button
            className={`button-style pointer font-20px ${
              validateFields() ? "grey lighten-2" : "cercle-purple white-text"
            }`}
            style={{
              padding: "8px 35px",
              width: "150px",
            }}
            type="submit"
            disabled={validateFields()}
          >
            {submitLoading ? <ClipLoader color="#fff" size={20} /> : "Submit"}
          </button>
        </div>
      </form>
      {offers?.length === 0 && <NoItemsLeftInTable />}
    </div>
  );
}

export default PayEmdLotOfService;
