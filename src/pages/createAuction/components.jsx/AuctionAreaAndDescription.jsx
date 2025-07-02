import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import Location from '../../commanPage/location/Location';

function AuctionAreaAndDescription({ auctionDetails, setAuctionDetails, description = true }) {
    const isTablet = useMediaQuery({ query: "(max-width: 600px)" });
    const [values, setValues] = useState({
        location: {
            address: "",
            city: "",
            state: "",
            country: "",
            zipCode: ""
        },
    });

    const handleChanges = (value, keysName) => {
        setAuctionDetails((prevDetails) => ({
            ...prevDetails,
            [keysName]: value,
        }));
    }

    useEffect(() => {
        setAuctionDetails((prevDetails) => ({
            ...prevDetails,
            location: {
                address: values.location.address,
                city: values.location.city || values.location.address,
                state: values.location.state,
                country: values.location.country,
                zipCode: values.location.zipCode || "641021",
            },
        }));
    }, [values, setAuctionDetails])

    return (
        <div className='flex column gap-2'>

            <div className="flex column" style={{ gap: "10px", width: "102%" }}>
                <h5 className="font-20px">Auction mode and Region</h5>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: !isTablet && "1fr  1fr 1fr",
                        gap: "20px",
                        marginRight: "5px"
                    }}
                >
                    <span style={{ marginRight: "21px" }}>
                        <Location values={values} setValues={setValues} locationName={"Auction Location"} />
                    </span>
                    <span>
                        <label className="font-16px black-text">
                            Auction Mode <span className="red-text">*</span>
                        </label>
                        <select className="browser-default" style={styles.select} onChange={(e) => handleChanges(e.target.value, "auctionMode")}>
                            <option value="" disabled selected>Choose your Auction mode</option>
                            <option value="open auction" style={{ padding: "10px", }}>Open Auction</option>
                            <option value="closed auction">Closed Auction</option>
                        </select></span>
                    <span>
                        <label className="font-16px black-text">
                            Auction Region <span className="red-text">*</span>
                        </label>
                        <select className="browser-default" style={styles.select} onChange={(e) => handleChanges(e.target.value, "auctionRegion")}>
                            <option value="" disabled selected>Choose your Auction Region</option>
                            <option value="South India">South India</option>
                            <option value="North India">North India</option>
                            <option value="West India">West India</option>
                            <option value="Central India">Central India</option>
                            <option value="East India">East India</option>
                        </select>
                    </span>

                </div>
            </div>
            {description && <span className="flex column">
                <span className="font-18px black-text">Description <span className="red-text">*</span></span>
                <textarea
                    className="border-radius-12 textArea-width"
                    style={{
                        border: "10px solid transparent",
                        outline: "2px solid transparent",
                        height: "100px",
                        backgroundColor: "#F3F7FA",
                    }}
                    name="description"
                    value={auctionDetails?.description}
                    onChange={(e) => handleChanges(e.target.value, "description")}
                />
            </span>}
        </div>
    )
}

const styles = {
    select: {
        padding: "13px",
        backgroundColor: "#fafafa",
    },

};

export default AuctionAreaAndDescription
