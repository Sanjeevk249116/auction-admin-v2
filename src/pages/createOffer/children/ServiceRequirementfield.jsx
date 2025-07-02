import React, { useEffect, useState } from "react";
import { notifyError } from "../../../helper/helpers";

function ServiceRequirementfield({ createOffer, setCreateOffer }) {
    const [requirementData, SetRequirementData] = useState("");
    const [addRequirement, setAddRequirement] = useState([
    ]);

    const handleRequirementChange = (e) => {
        if (typeof requirementData !== "string" || requirementData.trim() === "") {
            notifyError("Please enter a requirement before adding.");
            return;
        }
        setAddRequirement([
            ...addRequirement,
            {
                id: addRequirement.length + 1,
                requirment: requirementData,
                status: true,
            },
        ]);
        SetRequirementData("");
    };

    const handleToggleStatus = (id) => {
        setAddRequirement((prevRequirements) =>
            prevRequirements.map((item) =>
                item.id === id ? { ...item, status: !item.status } : item
            )
        );
    };

    useEffect(() => {
        const existingRequirements = addRequirement?.filter(item => item?.status === true)?.map(item => item?.requirment)
        setCreateOffer((prev) => ({
            ...prev,
            requirements: existingRequirements,
        }));
    }, [addRequirement, setCreateOffer]);

    return (
        <div>
            <div className={`valign-wrapper gap-3`}>
                <span className="full-width">
                    <label className="black-text font-16px">
                        Add Requirement <span className="red-text">*</span>
                    </label>
                    <input
                        className="input-tag-style grey lighten-4 margin-0px"
                        type="text"
                        value={requirementData}
                        onChange={(e) => SetRequirementData(e.target.value)}
                        placeholder="Add Requirement"
                    />
                </span>
                <span
                    className={`button-style white-text cercle-purple pointer`}
                    style={{ padding: "13px 40px", marginTop: "1rem" }}
                    onClick={handleRequirementChange}
                >
                    Add
                </span>
            </div>
            {addRequirement?.map((item, index) => (
                <p key={item.id} className="valign-wrapper gap-10px">
                    <span
                        className="material-icons-outlined cercle-purple-text pointer"
                        onClick={() => handleToggleStatus(item?.id)}
                    >
                        {item?.status ? "check_box" : "check_box_outline_blank"}
                    </span>
                    {item?.requirment}
                </p>
            ))}
        </div>
    );
}

export default ServiceRequirementfield;
