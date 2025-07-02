import React from "react";
import { DatePicker } from "react-materialize";
import { useMediaQuery } from "react-responsive";

function AddEmdDetails({ payemdDetails, setPayemdDetails }) {
    const isTablet = useMediaQuery({ query: "(max-width: 600px)" });

    const handleDateChange = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        setPayemdDetails({ ...payemdDetails , payEmdDate: formattedDate });
    }

    return (
        <div
            className="mr-2 gap-2"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}
        >
            <span>
                <p>
                    Email <span className=" red-text">*</span>
                </p>
                <input
                    type="email"
                    name="emailId"
                    value={payemdDetails.emailId}
                    onChange={(e) =>
                        setPayemdDetails({ ...payemdDetails, emailId: e.target.value })
                    }
                    className="input-tag-style input-width"
                />
            </span>
            <span>
                <p>
                    Total Emd Amount <span className="red-text">*</span>
                </p>
                <input
                    type="number"
                    value={payemdDetails.totalEmdAmount}
                    onChange={(e) =>
                        setPayemdDetails({
                            ...payemdDetails,
                            totalEmdAmount: e.target.value,
                        })
                    }
                    name="totalEmdAmount"
                    className="input-tag-style input-width"
                />
            </span>
            <span className={`flex column pin-top `}>
                <p className="black-text">
                    Pay emd Date <span className="red-text">*</span>
                </p>
                <DatePicker
                    role="input"
                    name="payEmdDate"
                    value={payemdDetails.payEmdDate}
                    onChange={(date) => {
                        handleDateChange(date)
                        document.body.style.overflow = "auto";
                    }}
                    type={!isTablet && `date`}
                    className="input-width input-tag-style margin-0px"
                    required
                />
                <span className="material-icons-outlined logo-Date-time pointer">
                    calendar_month
                </span>
            </span>
        </div>
    );
}

export default AddEmdDetails;
