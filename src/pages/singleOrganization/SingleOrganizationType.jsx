import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SpinnersLoading from "../commanPage/loader/SpinnersLoading";
import { getSingleAccount } from "../../redux/action/singleAccount";
import SellerDetails from "./seller/SellerDetails";
import TraderDetails from "./buyer/TraderDetails";
import { getCordinatore } from "../../redux/action/cordinator";

function SingleOrganizationType() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { singleAccountdata, singleAccountLoading } = useSelector(
    (state) => state.singleAccount
  );

  useEffect(() => {
    dispatch(getSingleAccount(id));
    dispatch(getCordinatore());
  }, [dispatch, id]);

  if (singleAccountLoading) {
    return <SpinnersLoading />;
  }

  return (
    <div className="mt-1">
      {singleAccountdata?.role?.name === "industry" ? (
        <SellerDetails singleAccountdata={singleAccountdata} />
      ) : (
        <TraderDetails singleAccountdata={singleAccountdata} />
      )}
    </div>
  );
}

export default SingleOrganizationType;
