import React, { createElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SingleCoordinatorHeader from "../children/SingleCoordinatorHeader";
import CoordinatorButton from "../../utils/CoordinatorButton";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCoordinator } from "../../../redux/action/cordinator";
import SpinnersLoading from "../../commanPage/loader/SpinnersLoading";
import { coordinatorAuction } from "../../../helper/auctionTable";

function SingleCoordinatore() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { singleCoordinatorDetails, cordinatorLoading } = useSelector(
    (state) => state.cordinator
  );
  const [coordinatorBtn, setCoordinatorBtn] = useState(1);

  useEffect(() => {
    dispatch(getSingleCoordinator(id))
  }, [dispatch, id])

  if (cordinatorLoading) {
    return <SpinnersLoading />;
  }

  return (
    <div className="mt-1 flex column gap-10px">
      <span className="valign-wrapper gap-1">
        <span
          className="material-icons-outlined pointer"
          onClick={() => navigate(-1)}
        >
          arrow_back
        </span>
        <h4>Single Coordinator</h4>
      </span>
      <SingleCoordinatorHeader singleCoordinatorDetails={singleCoordinatorDetails} />
      <div className="mt-1">
        <CoordinatorButton
          buttonPosition={coordinatorBtn}
          setButtonPosition={setCoordinatorBtn}
        />
        {coordinatorAuction[coordinatorBtn] &&
          createElement(coordinatorAuction[coordinatorBtn], { singleCoordinatorDetails })}
      </div>
    </div>
  );
}

export default SingleCoordinatore;
