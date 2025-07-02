import React from 'react'
import { useNavigate } from 'react-router-dom'
import InviteSellerInputField from '../children/InviteSellerInputField'

function InviteNewSeller() {
    const navigate = useNavigate()
    return (
        <div className='mt-1'>
            <span className="valign-wrapper gap-1 mb-1">
                <span
                    className="material-icons-outlined pointer"
                    onClick={() => navigate(-1)}
                >
                    arrow_back
                </span>
                <h4>Add New Seller</h4>
            </span>
            <div className='cover white p-2 container flex column gap-2'>
                <h3 className='valign-wrapper justify-center'>Create New Seller</h3>
                <InviteSellerInputField />
            </div>
        </div>
    )
}

export default InviteNewSeller
