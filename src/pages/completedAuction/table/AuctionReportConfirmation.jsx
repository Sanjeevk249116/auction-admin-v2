import React from 'react'
import { useMediaQuery } from 'react-responsive';
import { NoItemsLeftInTable, roundToThreeDecimal } from '../../../helper/helpers';

function AuctionReportConfirmation({ offers, scrollLength }) {
    const isTablet = useMediaQuery({ query: "(max-width: 990px)" });

    return (
        <div className="table-container-style custom-scrollbar" style={{
            height: offers.length > scrollLength && "200px",
            overflowY: "auto",
            paddingRight: offers.length > 3 && "2px",
        }}>
            <table
                className={`responsive-table centered ${isTablet ? "auction_table table-style" : "custom-table-style"
                    }`}
            >
                <thead>
                    <tr>
                        {/* <th>H1-Bidder</th> */}
                        <th>Product Type</th>
                        <th>Quantity / UOM</th>
                        <th>Starting price</th>
                        <th>h1-Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {offers?.map((item) => (
                        <tr key={item?._id}>
                            {/* <td>{item?.bids?.[0]?.organizationName || "N/A"}</td> */}
                            <td>{item?.scrapDetails?.type}</td>
                            <td>
                                {item?.scrapDetails?.quantity}/
                                {item?.scrapDetails?.unit}
                            </td>
                            <td>{item?.startingPrice}</td>
                            <td>{roundToThreeDecimal(item?.highestBid) || "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {offers?.bids?.length === 0 && <NoItemsLeftInTable />}
        </div>
    )
}

export default AuctionReportConfirmation
