import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import Location from '../../commanPage/location/Location';
import { notifyError } from '../../../helper/helpers';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { inviteNewSellerForAuction } from '../../../redux/action/seller';
import { useNavigate } from 'react-router-dom';

function InviteSellerInputField() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { sellerListLoading } = useSelector(
        (state) => state.sellerList
    );
    const isMobile = useMediaQuery({ query: "(max-width: 1000px)" });
    const [inviteNewSeller, setInviteNewSeller] = useState({
        organizationName: "",
        location: {},
        GSTIN: "",
        email: "",
        name: "",
        phoneNumber: ""
    });
    const [values, setValues] = useState({
        location: {
            longitude: "",
            latitude: "",
            address: "",
        },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInviteNewSeller((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    const validationForInviteSeller = () => {
        if (!inviteNewSeller.organizationName || !inviteNewSeller.email || !inviteNewSeller.GSTIN || !inviteNewSeller.name || !inviteNewSeller.phoneNumber || !values.location.address) {
            return true
        }
        return false
    }


    const onSubmitInviteSeller = (e) => {
        e.preventDefault();

        if (validationForInviteSeller()) {
            return notifyError('Please fill all the fields')
        }
        dispatch(inviteNewSellerForAuction(inviteNewSeller, navigate,setInviteNewSeller))
    }

    useEffect(() => {
        setInviteNewSeller((prev) => ({
            ...prev,
            location: values.location
        }))
    }, [values])


    return (
        <div className='' style={{ width: isMobile ? "90%" : '70%', margin: "auto" }}>
            <form className='flex column gap-10px' onSubmit={onSubmitInviteSeller}>
                <span className="flex column">
                    <label className="font-16px black-text">
                        Organization Name <span className="red-text">*</span>
                    </label>
                    <input
                        type="text"
                        name="organizationName"
                        value={inviteNewSeller.organizationName}
                        placeholder="Enter Organization Name"
                        className={`input-tag-style `}
                        required={true}
                        onChange={handleInputChange}
                    />
                </span>
                <span className="flex column">
                    <label className="font-16px black-text">
                        Email <span className="red-text">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={inviteNewSeller.email}
                        placeholder="Enter Email Id"
                        className={`input-tag-style `}
                        required={true}
                        onChange={handleInputChange}
                    />
                </span>
                <span className="flex column">
                    <label className="font-16px black-text">
                        GST Number <span className="red-text">*</span>
                    </label>
                    <input
                        type="text"
                        name="GSTIN"
                        value={inviteNewSeller.GSTIN}
                        placeholder="Enter GST Number"
                        className={`input-tag-style `}
                        required={true}
                        onChange={handleInputChange}
                    />
                </span>
                <span>
                    <Location values={values} setValues={setValues} />
                </span>
                <span className="flex column">
                    <label className="font-16px black-text">
                        Name <span className="red-text">*</span>
                    </label>
                    <input
                        type="text"
                        value={inviteNewSeller.name}
                        name='name'
                        placeholder="Enter Your Name"
                        className={`input-tag-style `}
                        required={true}
                        onChange={handleInputChange}
                    />
                </span>
                <span className="flex column">
                    <label className="font-16px black-text">
                        Phone Number <span className="red-text">*</span>
                    </label>
                    <input
                        type="number"
                        name="phoneNumber"
                        value={inviteNewSeller.phoneNumber}
                        placeholder="Enter Phone Number"
                        className={`input-tag-style `}
                        required={true}
                        onChange={handleInputChange}
                    />
                </span>
                <div className={`mt-2 flex justify-center`}>
                    <button
                        className={`button-style pointer font-20px ${validationForInviteSeller() ? "grey lighten-2" : "white-text cercle-purple"}`}
                        style={{
                            padding: "8px 40px",
                        }}
                        type="submit"
                        disabled={validationForInviteSeller() === true}

                    >
                        {sellerListLoading ? <ClipLoader color="#fff" size={20} /> : 'Add'}

                    </button>
                </div>
            </form>
        </div>
    )
}

export default InviteSellerInputField
