import React, { useEffect, useState } from "react";
import { Modal } from "react-materialize";
import Otpverification from "./Otpverification";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WithdrawalConfimationTable from "../tables/WithdrawalConfimationTable";
import { withdrawalRequestOTP } from "../../../redux/action/wallet";

function ConfirmationSelectedAccount() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openOtpModel, setOpenOtpModel] = useState(false);
    const { selectedAccount } = useSelector((state) => state.withdrawalRequest);
    const [confirmSelectedAccount, setConfirmSelectedAccount] = useState([]);



    useEffect(() => {
        if (selectedAccount.length === 0) navigate("/transaction");
        else setConfirmSelectedAccount(selectedAccount);
    }, [selectedAccount, navigate]);


    const ExtractIdOnly = confirmSelectedAccount?.map((item) => item?._id);

    const handleSubmitToProceed = () => {
        dispatch(withdrawalRequestOTP(ExtractIdOnly, setOpenOtpModel));
    }

    return (
        <div className="mt-1">
            <span className={`valign-wrapper gap-1`}>
                <span
                    className="material-icons-outlined pointer"
                    onClick={() => navigate(-1)}
                >
                    arrow_back
                </span>
                <h4>Confirm withdrawal request account</h4>
            </span>
            <WithdrawalConfimationTable
                confirmSelectedAccount={confirmSelectedAccount}
                setConfirmSelectedAccount={setConfirmSelectedAccount}
                selectedAccount={selectedAccount}
                handleSubmitToProceed={handleSubmitToProceed}
            />
            <Modal
                actions={[]}
                bottomSheet={false}
                fixedFooter={false}
                className="modelAccount"
                id="view-details"
                open={openOtpModel}
                options={{
                    onCloseEnd: () => {
                        setOpenOtpModel(false);
                    },
                }}
            >
                <Otpverification
                    setOpenOtpModel={setOpenOtpModel}
                    setConfirmSelectedAccount={setConfirmSelectedAccount}
                />
            </Modal>
        </div>
    );
}

export default ConfirmationSelectedAccount;
