import React, { useEffect } from "react";
import AuctionReportConfirmation from "../table/AuctionReportConfirmation";

function AcceptedLots({ acceptedOffers, offers }) {
  const [appectedOffersData, setAcceptedOffersData] = React.useState([]);
  useEffect(() => {
    const acceptedLots = offers?.filter((id) =>
      acceptedOffers?.includes(id._id)
    );
    setAcceptedOffersData(acceptedLots);
  }, [acceptedOffers, offers]);

  return (
    <div className="flex column gap-10px cercle-purple-text">
      <h4 className="margin-0px flex justify-center">Accepted lots</h4>
      <AuctionReportConfirmation
        offers={appectedOffersData}
        scrollLength={acceptedOffers?.length === offers?.length ? 8 : 3}
      />
    </div>
  );
}

export default AcceptedLots;
