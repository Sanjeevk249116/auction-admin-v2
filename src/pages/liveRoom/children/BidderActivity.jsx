import React from 'react'
import { useNavigate } from 'react-router-dom'
import BidderActivityTable from '../table/BidderActivityTable'


function BidderActivity() {
  const navigate = useNavigate()


  return (
    <div>
      <span className="valign-wrapper gap-1 mt-1">
        <span className={`material-icons pointer`} onClick={() => navigate(-1)}>
          west
        </span>
        <h4 className="margin-0px">Bidder track activity</h4>
      </span>
      <BidderActivityTable />
    </div>
  )
}

export default BidderActivity
