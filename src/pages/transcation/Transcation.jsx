import React, { createElement, useEffect, useState } from "react";
import TransactionButton from "../utils/TransactionButton";
import DatePicker from "react-datepicker";
import { transactionRecordTable } from "../../helper/auctionTable";
import SearchInput from "../auctionList/children/SearchInput";

function Transcation() {
  const [searchData, setSearchData] = useState("");
  const [transcationButton, setTranscationButton] = useState(1);
  const todayDate = new Date();
  var yesterdayDate = todayDate.setDate(todayDate.getDate() - 1);

  const [startDate, setStartDate] = useState(yesterdayDate);
  const [endDate, setEndDate] = useState(new Date());

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleShowLogo = (name) => {
    const value = document.querySelector(`#${name}`);
    value.click();
  };

  useEffect(() => {
    setSearchData("");
  }, [transcationButton]);

  return (
    <div className="mt-1">
      <h4>Transaction Record</h4>

      <div className="mt-1 valign-wrapper space-between flex-wrap">
        <TransactionButton
          buttonPosition={transcationButton}
          setButtonPosition={setTranscationButton}
        />
        <span className="valign-wrapper gap-1 flex-wrap">
          <SearchInput searchData={searchData} setSearchData={setSearchData} searchWidth="350px" />

          <div className="input-field-style" style={{ height: "40px" }}>
            <DatePicker
              id="date-picker"
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              className="marginBottom-0px width-110 highPriorityView"
              dateFormat="dd/MM/yyyy"
            />
            <span
              className="material-symbols-outlined pointer"
              onClick={() => handleShowLogo("date-picker")}
            >
              calendar_month
            </span>
          </div>
        </span>
      </div>

      {/* {transcationButton === 1 && (
          <WithdrawRequest withdrawals={[]}
            setSearchData={setSearchData}
            searchData={searchData}
          />
        )}
        {transcationButton === 2 && <TranscationHistory recentTransaction={[]} setSearchData={setSearchData}
          searchData={searchData} />}
        {transcationButton === 3 && <RefundHistory refundHistory={[]} setSearchData={setSearchData}
          searchData={searchData} />} */}

      {transactionRecordTable[transcationButton] &&
        createElement(transactionRecordTable[transcationButton], {
          searchData: searchData,
        })}
    </div>
  );
}

export default Transcation;
