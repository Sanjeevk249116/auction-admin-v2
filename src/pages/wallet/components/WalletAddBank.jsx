import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { animateScroll } from "react-scroll";
import { useMediaQuery } from "react-responsive";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

function WalletAddBank({ addBankDataFetching, loading }) {
  const isTablet = useMediaQuery({ query: "(max-width: 700px)" });
  useEffect(() => {
    const pasteBox = document.getElementById("no-paste");
    pasteBox.onpaste = (e) => {
      e.preventDefault();
      return false;
    };
  }, []);

  useEffect(() => {
    animateScroll.scrollToTop({ smooth: true });
  }, []);

  return (
    <div className="mt-1">
      <div className="valign-wrapper space-between">
        <h3 className="margin-0px">Add Bank Account</h3>
        <span className="material-icons-outlined pointer modal-close">
          close
        </span>
      </div>

      <div
        className={` flex justify-center mt-1`}
        style={{ padding: "1rem 1rem 1rem 0rem" }}
      >
        <Formik
          initialValues={{
            accountNo: "",
            re_accountNo: "",
            bankName: "",
            IFCSCode: "",
            bankBranch: "",
            holderName: "",
          }}
          validationSchema={Yup.object().shape({
            accountNo: Yup.string()
              .min(9, "Account Number must be at least 9 Number")
              .max(19, "Account Number must be less than 19 number")
              .required("Account Number is required")
              .matches(/^\S*$/, "Account cannot contain spaces"),
            re_accountNo: Yup.string()
              .oneOf(
                [Yup.ref("accountNo"), null],
                "Account Number  should be same."
              )
              .required("Confirm Account Number is required"),
            IFCSCode: Yup.string()
              .required("IFSC Code is required")
              .matches(/^\S*$/, "IFSC Code cannot contain spaces"),
            bankName: Yup.string()
              .required("Bank Name is required")
              .matches(/^\S.*$/, "Bank Name cannot contain spaces"),
            bankBranch: Yup.string()
              .required("Branch Name is required")
              .matches(/^\S.*$/, "Branch Name cannot contain spaces"),
            holderName: Yup.string()
              .required("Account Holder Name is required")
              .matches(/^\S.*$/, "Account Holder Name cannot contain spaces"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            const { re_accountNo, ...newValues } = values;
            addBankDataFetching(newValues);
          }}
        >
          {({ setFieldValue, isSubmitting, errors, touched }) => (
            <Form>
              <div className="valign-wrapper column gap-1 p-1">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isTablet
                      ? "repeat(1,1fr)"
                      : "repeat(2,1fr)",
                    columnGap: "40px",
                  }}
                >
                  <span>
                    <label className="font-16px black-text">
                      Account Number <span className="red-text">*</span>
                    </label>
                    <Field
                      className="input-tag-style"
                      type="number"
                      name="accountNo"
                      style={{ height: "2.5rem", marginBottom: "15px" }}
                    />
                    <ErrorMessage
                      name="accountNo"
                      component="div"
                      className="error-message red-text marginTop--15px mb-1"
                      style={{ marginBottom: "15px", fontSize: "12px" }}
                    />
                  </span>
                  <span>
                    <label className="font-16px black-text">
                      Re-Enter Account Number
                      <span className="red-text">*</span>
                    </label>
                    <Field
                      className="input-tag-style"
                      type="number"
                      id="no-paste"
                      name="re_accountNo"
                      style={{ height: "2.5rem", marginBottom: "15px" }}
                    />
                    <ErrorMessage
                      name="re_accountNo"
                      component="div"
                      className="error-message red-text marginTop--15px mb-1"
                      style={{ marginBottom: "15px", fontSize: "12px" }}
                    />
                  </span>
                  <span>
                    <label className="font-16px black-text">
                      IFSC code <span className="red-text">*</span>
                    </label>
                    <Field
                      className="input-tag-style"
                      type="text"
                      name="IFCSCode"
                      style={{ height: "2.5rem", marginBottom: "15px" }}
                    />
                    <ErrorMessage
                      name="IFCSCode"
                      component="div"
                      className="error-message red-text marginTop--15px mb-1"
                      style={{ marginBottom: "15px", fontSize: "12px" }}
                    />
                  </span>
                  <span>
                    <label className="font-16px black-text">
                      Bank Name <span className="red-text">*</span>
                    </label>
                    <Field
                      className="input-tag-style"
                      type="text"
                      name="bankName"
                      style={{ height: "2.5rem", marginBottom: "15px" }}
                    />
                    <ErrorMessage
                      name="bankName"
                      component="div"
                      className="error-message red-text marginTop--15px mb-1"
                      style={{ marginBottom: "15px", fontSize: "12px" }}
                    />
                  </span>
                  <span>
                    <label className="font-16px black-text">
                      Branch Name <span className="red-text">*</span>
                    </label>
                    <Field
                      className="input-tag-style"
                      type="text"
                      name="bankBranch"
                      style={{ height: "2.5rem", marginBottom: "15px" }}
                    />
                    <ErrorMessage
                      name="bankBranch"
                      component="div"
                      className="error-message red-text marginTop--15px mb-1"
                      style={{ marginBottom: "15px", fontSize: "12px" }}
                    />
                  </span>
                  <span>
                    <label className="font-16px black-text">
                      Account Holders Name <span className="red-text">*</span>
                    </label>
                    <Field
                      className="input-tag-style"
                      type="text"
                      name="holderName"
                      style={{ height: "2.5rem", marginBottom: "15px" }}
                    />
                    <ErrorMessage
                      name="holderName"
                      component="div"
                      className="error-message red-text marginTop--15px mb-1"
                      style={{ marginBottom: "15px", fontSize: "12px" }}
                    />
                  </span>
                </div>
                <button
                  type="submit"
                  className={`button-style white-text cercle-purple mt-1 pointer`}
                  style={{ padding: "12px 45px" }}
                >
                  {loading ? <ClipLoader color="red" size={20} /> : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default WalletAddBank;
