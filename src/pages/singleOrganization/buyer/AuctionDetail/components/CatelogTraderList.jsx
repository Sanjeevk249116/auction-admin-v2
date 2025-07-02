import React from "react";
import { Tab, Tabs } from "react-materialize";
import { useNavigate } from "react-router-dom";

function CatelogTraderList() {
  const navigate = useNavigate();
  return (
    <div className="mt-1 flex column gap-1">
      <span className="valign-wrapper gap-1">
        <span
          className="material-icons-outlined pointer"
          onClick={() => navigate(-1)}
        >
          arrow_back
        </span>
        <h4>Catelogue Trader List</h4>
      </span>
      <Tabs>
        <Tab title="Accepted Catelogue"></Tab>

        <Tab title="Pending Catelogue"></Tab>

        <Tab title="Rejected Catelogue"></Tab>
      </Tabs>
    </div>
  );
}

export default CatelogTraderList;
