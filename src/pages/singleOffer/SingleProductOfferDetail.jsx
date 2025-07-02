import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuctionSchedule from "../commanPage/AuctionInfo/AuctionSchedule";
import EmdPaidTables from "./table/EmdPaidTables";
import { useDispatch, useSelector } from "react-redux";
import { getSingleAuction } from "../../redux/action/auction";
import { detailsOfSingleOffer } from "../../redux/action/offers";
import { Dropdown, Modal } from "react-materialize";
import DeleteLotConfimation from "./components/DeleteLotConfimation";
import ProductScrapDetail from "./children/ProductScrapDetail";
function SingleProductOfferDetail() {
  const { id, offerId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleAuctionData } = useSelector((state) => state.singleAuction);
  const [isDeletelotModelOpen, setIsDeletelotModelOpen] = useState(false);
  const { singleOfferData, offerDetailLoading } = useSelector(
    (state) => state.singleOfferDetails
  );

  useEffect(() => {
    dispatch(getSingleAuction(id));
    dispatch(detailsOfSingleOffer(offerId));
  }, [dispatch, id, offerId]);

  return (
    <div className="mt-1">
      <div className="valign-wrapper space-between">
        <span className={`valign-wrapper gap-1`}>
          <span
            className="material-icons-outlined pointer"
            onClick={() => navigate(-1)}
          >
            arrow_back
          </span>
          <h4>Lots Details</h4>
        </span>
        {singleAuctionData?.status !== "ongoing" && (
          <Dropdown
            id={`dropdown-${singleAuctionData?._id}`}
            options={{ constrainWidth: false, alignment: "right" }}
            trigger={
              <span className="material-icons-outlined pointer">more_vert</span>
            }
          >
            <div
              className="valign-wrapper column white justify-center"
              style={{ width: "150px" }}
            >
              <button
                className="pointer font-16px full-width onHover"
                style={{ padding: "10px 0" }}
                onClick={() =>
                  navigate(
                    `/reverse-product-auction/edit-lots-detail/${singleAuctionData?._id}/${offerId}`
                  )
                }
              >
                Update Lot
              </button>
              <p
                className="full-width grey lighten-2"
                style={{ height: "1px" }}
              ></p>
              <button
                className="pointer font-16px full-width onHover"
                style={{ padding: "10px 0" }}
                onClick={() => setIsDeletelotModelOpen(true)}
              >
                Delete Lot
              </button>
            </div>
          </Dropdown>
        )}
      </div>

      <AuctionSchedule singleAuctionData={singleAuctionData} />
      <div className="full-width mt-2">
        <ProductScrapDetail
          singleOfferData={singleOfferData}
          offerDetailLoading={offerDetailLoading}
        />

        <h4 className="font-cercular-bold flex justify-center cercle-purple-text">
          EMD Paid Members
        </h4>
        <EmdPaidTables
          paidEmdDetails={singleOfferData?.depositedBy}
          offerDetailLoading={offerDetailLoading}
        />
      </div>
      <Modal
        actions={[]}
        open={isDeletelotModelOpen}
        options={{
          onCloseEnd: () => setIsDeletelotModelOpen(false),
        }}
        className="modelAccount"
      >
        <DeleteLotConfimation
          singleOfferData={singleOfferData}
          setIsDeletelotModelOpen={setIsDeletelotModelOpen}
           auctionType={"reverseAuctionProduct"}
        />
      </Modal>
    </div>
  );
}

export default SingleProductOfferDetail;
