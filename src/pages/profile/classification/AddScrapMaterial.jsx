import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { updateMaterialClassification } from "../../../redux/action/materialClassification";
import { notifyError } from "../../../helper/helpers";
import { useMediaQuery } from "react-responsive";

function AddScrapMaterial() {
    const dispatch = useDispatch()
    const isLaptop = useMediaQuery({ query: "(max-width: 1100px)" });
    const isTablet = useMediaQuery({ query: "(max-width: 700px)" });
    const { materialClassificationData, loadingmaterial } = useSelector(state => state.materialClassification)
    const [materialScrap, setMaterialScrap] = React.useState([""]);

    const handleInputChange = (value, index) => {
        const updatedScrap = [...materialScrap];
        updatedScrap[index] = value;
        setMaterialScrap(updatedScrap);
    };

    const addNewInputField = () => {
        setMaterialScrap([...materialScrap, ""]);
    };

    const removeInputField = (index) => {
        if (materialScrap.length === 1) return setMaterialScrap([""]);
        const updatedScrap = materialScrap?.filter((_, i) => i !== index);
        setMaterialScrap(updatedScrap);
    };

    const checkSelectScrapItems = () => {
        const removeEmptyValue = materialScrap?.filter((item) => item !== "")
        if (removeEmptyValue.length === 0) return true

    }
    const findMatchingItems = async () => {
        const matchingItems = await materialScrap?.filter((scrapItem) =>
            materialClassificationData?.some(
                (item) => item?.materialClassification === scrapItem
            )
        );
        return matchingItems;
    };

    const addScrapMaterialClassification = async () => {
        const matchingItems = await findMatchingItems();
        if (matchingItems.length > 0) {
            return notifyError(`Scrap item is already added : ${matchingItems.join(", ")}`);
        }
        dispatch(updateMaterialClassification(materialScrap, setMaterialScrap))
    }

    return (
        <div className="grey lighten-3 p-1" style={{ borderRadius: "5px" }}>
            <div
                className="gap-2"
                style={{ display: "grid", gridTemplateColumns:isTablet?"repeat(1,1fr)":isLaptop?"repeat(2,1fr)": "repeat(3,1fr)" }}
            >
                {materialScrap.map((value, index) => (
                    <span key={index} className="valign-wrapper gap-10px ">
                        <p>{index + 1}</p>
                        <input
                            type="text"
                            className="input-tag-style"
                            value={value}
                            onChange={(e) => handleInputChange(e.target.value, index)}
                        />

                        {index === materialScrap.length - 1 ? (
                            <span
                                className="material-symbols-outlined pointer hover-purple"
                                onClick={addNewInputField}
                                style={{ cursor: "pointer" }}
                            >
                                add_box
                            </span>
                        ) : (<span
                            className="material-symbols-outlined pointer hover-red"
                            onClick={() => removeInputField(index)}
                            style={{ cursor: "pointer" }}
                        >
                            close
                        </span>)}
                    </span>
                ))}
            </div>
            <p className="flex justify-end mt-1">
                <button
                    className="button-style pointer font-weight-600 font-16px font-cercular-bold"
                    style={{
                        padding: "8px 20px",
                        backgroundColor: checkSelectScrapItems() ? "#e0e0e0" : "#6f2da8",
                        color: !checkSelectScrapItems() && "#e0e0e0",
                    }}
                    onClick={addScrapMaterialClassification}
                    disabled={checkSelectScrapItems()}
                >
                    {loadingmaterial ? <ClipLoader color="red" size={20} /> : "Submit"}
                </button>
            </p>
        </div>
    );
}

export default AddScrapMaterial;
