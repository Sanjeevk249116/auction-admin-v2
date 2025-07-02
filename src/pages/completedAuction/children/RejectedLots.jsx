import React, { useEffect } from 'react'
import AuctionReportConfirmation from '../table/AuctionReportConfirmation';

function RejectedLots({ rejectedOffers, offers }) {
    const [appectedOffersData, setAcceptedOffersData] = React.useState([]);
    useEffect(() => {
        const acceptedLots = offers?.filter(
            (id) => rejectedOffers?.includes(id._id)
        );
        setAcceptedOffersData(acceptedLots);
    }, [rejectedOffers, offers])


    return (
        <div className='flex column gap-10px cercle-purple-text'>
            <h4 className='margin-0px flex justify-center'>Rejected lots</h4>
            <AuctionReportConfirmation offers={appectedOffersData} scrollLength={rejectedOffers?.length === offers?.length ? 8:3}/>
        </div>
    )
}

export default RejectedLots
