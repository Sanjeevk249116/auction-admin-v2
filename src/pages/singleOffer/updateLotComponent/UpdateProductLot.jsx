import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AuctionSchedule from '../../commanPage/AuctionInfo/AuctionSchedule'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleAuction } from '../../../redux/action/auction'
import { detailsOfSingleOffer } from '../../../redux/action/offers'
import UpdateProductLotForm from './component/UpdateProductLotForm'

function UpdateProductLot() {
    const dispatch = useDispatch()
    const { auctionId, offerId } = useParams()
    const navigate = useNavigate()

    const { singleAuctionData, singleAuctionLoading } = useSelector(
        (state) => state.singleAuction
    );

    const { singleOfferData, offerDetailLoading } = useSelector(
        (state) => state.singleOfferDetails
    );

    useEffect(() => {
        dispatch(getSingleAuction(auctionId));
        dispatch(detailsOfSingleOffer(offerId));
    }, [dispatch, auctionId, offerId]);

    return (
        <div className='mt-1'>
            <div className="valign-wrapper space-between">
                <span className={`valign-wrapper gap-1`}>
                    <span
                        className="material-icons-outlined pointer"
                        onClick={() => navigate(-1)}
                    >
                        arrow_back
                    </span>
                    <h4>Update Lots Details</h4>
                </span>
            </div>
            <div className="full-width flex column gap-1">
                <AuctionSchedule singleAuctionData={singleAuctionData} loading={singleAuctionLoading} />
                <UpdateProductLotForm singleAuctionData={singleAuctionData} loading={offerDetailLoading} singleOfferData={singleOfferData}/>
            </div>
        </div>
    )
}

export default UpdateProductLot
