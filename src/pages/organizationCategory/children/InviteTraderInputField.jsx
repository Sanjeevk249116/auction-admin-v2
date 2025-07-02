import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { notifyError } from '../../../helper/helpers';
import Location from '../../commanPage/location/Location';
import { inviteNewTraderInAdmin } from '../../../redux/action/trader';

function InviteTraderInputField() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
const { traderInviteLoaiding} = useSelector(
    (state) => state.tradersList
  );

    const isMobile = useMediaQuery({ query: "(max-width: 1000px)" });
    const [inviteNewTrader, setInviteNewTrader] = useState({
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
        setInviteNewTrader((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const validationForInviteTrader = () => {
        if (!inviteNewTrader.organizationName || !inviteNewTrader.email || !inviteNewTrader.GSTIN || !inviteNewTrader.name || !inviteNewTrader.phoneNumber || !values.location.address) {
            return true
        }
        return false
    }


    const onSubmitInviteTrader = (e) => {
        e.preventDefault();

        if (validationForInviteTrader()) {
            return notifyError('Please fill all the fields')
        }
        dispatch(inviteNewTraderInAdmin(inviteNewTrader, navigate,setInviteNewTrader))
    }

    useEffect(() => {
        setInviteNewTrader((prev) => ({
            ...prev,
            location: values.location
        }))
    }, [values])


    return (
        <div className='' style={{ width: isMobile ? "90%" : '70%', margin: "auto" }}>
            <form className='flex column gap-10px' onSubmit={onSubmitInviteTrader}>
                <span className="flex column">
                    <label className="font-16px black-text">
                        Organization Name <span className="red-text">*</span>
                    </label>
                    <input
                        type="text"
                        name="organizationName"
                        value={inviteNewTrader.organizationName}
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
                        value={inviteNewTrader.email}
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
                        value={inviteNewTrader.GSTIN}
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
                        value={inviteNewTrader.name}
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
                        value={inviteNewTrader.phoneNumber}
                        placeholder="Enter Phone Number"
                        className={`input-tag-style `}
                        required={true}
                        onChange={handleInputChange}
                    />
                </span>
                <div className={`mt-2 flex justify-center`}>
                    <button
                        className={`button-style pointer font-20px ${validationForInviteTrader() ? "grey lighten-2" : "white-text cercle-purple"}`}
                        style={{
                            padding: "8px 40px",
                        }}
                        type="submit"
                        disabled={validationForInviteTrader() === true}

                    >
                        {traderInviteLoaiding ? <ClipLoader color="#fff" size={20} /> : 'Add'}

                    </button>
                </div>
            </form>
        </div>
    )
}

export default InviteTraderInputField
