import React from 'react'

function ReasonOfLotRejection({ reasonOfRejectionLots, setReasonOfRejectionLots }) {

    return (
        <div className='full-width slide-in' style={{ width: "100%",marginTop:"-2rem" }}>
            <h5>Reason for Lots Rejection</h5>
            <textarea
                className="border-radius-12"
                rows="5"
                name="reason"
                value={reasonOfRejectionLots}
                style={{
                    border: "10px solid transparent",
                    outline: "2px solid transparent",
                    minHeight: "100px",
                    backgroundColor: "#f2f4fd",
                }}
                onChange={(e) => setReasonOfRejectionLots(e.target.value)}
            />
        </div>
    )
}

export default ReasonOfLotRejection
