import React, { useMemo } from 'react'
import { capitalizeEveryFirstLetter, convertTo12HourFormat, handleDateSetUp } from '../../../helper/helpers';

function WithdrawalDetail({ WithdrawalDetails }) {
    const details = useMemo(() => {
        const baseDetails = [
            {
                label: "Organisation Name",
                value: `${WithdrawalDetails?.organization?.organizationName} `,
            },
            {
                label: "Bank Name",
                value: `${WithdrawalDetails?.bankAccountDetails?.bankName} `,
            },
            {
                label: "Account No",
                value: `${WithdrawalDetails?.bankAccountDetails?.accountNo} `,
            },
            {
                label: "Amount",
                value: `${WithdrawalDetails?.amount} `,
            },
            {
                label: "Date",
                value: `${handleDateSetUp(WithdrawalDetails?.updatedAt)} ${convertTo12HourFormat(WithdrawalDetails?.updatedAt)} `,
            },
            {
                label: "Status",
                value: `${capitalizeEveryFirstLetter(WithdrawalDetails?.status)} `,
            },

        ];

        return baseDetails;
    }, [WithdrawalDetails]);
    return (
        <div className={`cover white text-center auctionStyle`} style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {details?.map((detail, index) => (
                <span key={detail?.label}>
                    <label className="cercle-purple-text font-18px">
                        {detail.label}
                    </label>
                    <p className={`mb-1 black-text `}>{detail.value}</p>
                </span>
            ))}
        </div>
    )
}

export default WithdrawalDetail
