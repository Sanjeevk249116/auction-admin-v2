import React  from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "react-responsive";
import { notifySuccess } from "../../../helper/helpers";
const PasswordChange = () => {
  const isMobile = useMediaQuery({ query: "(max-width:500px)" });
  return (
    <div className="white cover p-1 mt-1">
      <b className="flex justify-center mb-1 font-18px">Change Account Password</b>

      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }}
        validationSchema={Yup.object().shape({
          oldPassword: Yup.string().required("Old Password is required"),

          newPassword: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("New Password is required"),
          confirmNewPassword: Yup.string()
            .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
            .required("Confirm New Password is required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          notifySuccess("Password Updated Successfully");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div
              className="valign-wrapper column mt-2 gap-1"
              style={{
                width: isMobile ? "100%" : "500px",
                margin: "auto",
                padding: isMobile ? "10px" : "0px",
              }}
            >
              <Field
                className="input-tag-style"
                type="text"
                name="oldPassword"
                placeholder="Enter Old Password"
              />
              <ErrorMessage
                name="oldPassword"
                component="div"
                className="error-message red-text "
              />

              <Field
                className="input-tag-style"
                type="text"
                name="newPassword"
                placeholder="New Password"
              />
              <ErrorMessage
                name="newPassword"
                component="div"
                className="error-message red-text"
              />

              <Field
                className="input-tag-style"
                type="password"
                name="confirmNewPassword"
                placeholder="Confirm New Password"
              />
              <ErrorMessage
                name="confirmNewPassword"
                component="div"
                className="error-message red-text"
              />

              <button
                className="p-1 border-1px cercle-purple white-text border-radius-12 title pointer"
                type="submit"
              >
                Confirm
              </button>
            </div>
          </Form>
        )}
      </Formik>
 
    </div>
  );
};

export default PasswordChange;
