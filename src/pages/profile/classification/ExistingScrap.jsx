import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMaterialClassification, getMaterialClassification } from "../../../redux/action/materialClassification";
import { Modal } from "react-materialize";

function ExistingScrap() {
    const dispatch = useDispatch()
    const [deleteScrap, setDeleteScrap] = useState(false);
    const [modalOpen, setModalOpen] = useState(false)
    const [scrapItem, setScrapItem] = useState("")
    const { materialClassificationData } = useSelector(state => state.materialClassification)

    const handleRemoveScrap = () => {
        dispatch(deleteMaterialClassification(scrapItem._id, setModalOpen, setScrapItem))
    }

    const closeModalConfirm = () => {
        setModalOpen(false);
        setScrapItem("")
    };

    useEffect(() => {
        dispatch(getMaterialClassification())
    }, [dispatch])


    return (
        <div className="mt-1 flex column gap-1">
            <div className="valign-wrapper gap-1">
                <h4>Classifications</h4>
                <button
                    className={`button-style pointer cercle-purple-text font-weight-600 font-18px font-cercular-bold`}
                    style={{
                        padding: "3px 15px",
                        border: "1px solid #6f2da8",
                    }}
                    onClick={() => setDeleteScrap(!deleteScrap)}>Edit
                </button>
            </div>
            <div className="valign-wrapper flex-wrap mt-1" style={{ gap: "1.5rem" }}>
                {materialClassificationData.map((item) => (
                    <span
                        className={`valign-wrapper justify-center gap-1`}
                        key={item?._id}
                        style={{
                            border: "1px solid #e7e7e7",
                            padding: "8px 20px",
                            borderRadius: "22px",
                        }}
                    >
                        <p className="font-16px cercle-purple-text">{item?.materialClassification}</p>
                        {deleteScrap && (
                            <span className="material-icons-outlined pointer font-20px hover-red" onClick={() => { setModalOpen(true); setScrapItem(item) }}>
                                close
                            </span>
                        )}
                    </span>
                ))}
            </div>
            {materialClassificationData?.length === 0 && <p className="font-16px">No classification found</p>}
            <Modal
                actions={[]}
                bottomSheet={false}
                fixedFooter={false}
                className="modelAccount"
                id="view-details"
                open={modalOpen}
                options={{
                    onCloseEnd: closeModalConfirm,
                }}
            >
                <div>
                    <h5 className="normal-size">Confirm to delete </h5>
                    <p className="semi-bold">
                        Are you sure to delete <b>{scrapItem?.materialClassification}</b>
                    </p>
                    <div className="flex justify-end gap-1">
                        <button className="green btn-small " onClick={handleRemoveScrap}>
                            Yes
                        </button>

                        <button
                            className="red btn-small"
                            onClick={() => setModalOpen(false)}
                        >
                            No
                        </button>
                    </div>
                </div>

            </Modal>
        </div>
    );
}

export default ExistingScrap;
