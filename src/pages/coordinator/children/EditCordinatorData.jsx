/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { formatPhoneNumber } from "../../../helper/helpers";
import Location from "../../commanPage/location/Location";
import { editCordinator } from "../../../redux/action/cordinator";

const EditCordinatorData = ({ item, setIsModalOpen }) => {
  const { cordinatorLoading } = useSelector((state) => state.cordinator);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    location: {
      address: item?.address?.street,
      state: item?.address?.state,
      city: item?.address?.city,
      country: item?.address?.country,
    },
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phoneNumber: Yup.string()
      .matches(
        /^(\d{2})([\s-]?\d{5}[\s-]?\d{5})$/,
        "Phone number must be in a valid format, e.g.,919876543210' or '91 98765-43210"
      )
      .required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    address: Yup.object({
      street: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      country: Yup.string().required("Country is required"),
    }),
    position: Yup.string().required("Postion is required"),
    languages: Yup.string().required("Languages is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: item?.name,
      phoneNumber: item?.phoneNumber,
      languages: item?.languages[0],
      email: item?.email,
      address: {
        street: item?.address?.street,
        state: item?.address?.state,
        city: item?.address?.city,
        country: item?.address?.country,
      },
      position: item?.position,
    },

    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(
        editCordinator(item?._id, values, setIsModalOpen, () => {
          resetForm();
          setValues({
            location: {
              address: "",
              state: "",
              city: "",
              country: "",
            },
          });
        })
      );
    },
  });

  const handlePhoneChange = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    formik.setFieldValue("phoneNumber", formattedPhoneNumber);
  };

  useEffect(() => {
    formik.setFieldValue("address", {
      street: values?.location?.address,
      city: values?.location?.city,
      state: values?.location?.state,
      country: values?.location?.country,
    });
  }, [values]);

  return (
    <div className="p-1">
      <h4 className="flex justify-center cercle-purple-text">
        Edit coordinator
      </h4>
      <form onSubmit={formik.handleSubmit}>
        <div
          className="mt-1"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            rowGap: "20px",
            columnGap: "30px",
          }}
        >
          <span>
            <p>
              Name <span className="red-text">*</span>
            </p>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="input-tag-style input-width"
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="formicError">{formik.errors.name}</p>
            ) : null}
          </span>
          <span className="flex column mr-1">
            <Location values={values} setValues={setValues} />
            {formik.touched.address && formik.errors.address ? (
              <p className="formicError">
                {Object.values(formik.errors.address)[0]}
              </p>
            ) : null}
          </span>
          <span>
            <p>
              Phone <span className="red-text">*</span>
            </p>
            <input
              type="text"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={handlePhoneChange}
              className="input-tag-style input-width"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <p className="formicError">{formik.errors.phoneNumber}</p>
            ) : null}
          </span>
          <span>
            <p>
              Email <span className="red-text">*</span>
            </p>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="input-tag-style input-width"
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="formicError">{formik.errors.email}</p>
            ) : null}
          </span>
          <span>
            <p>
              Languages <span className="red-text">*</span>
            </p>
            <input
              type="text"
              name="languages"
              value={formik.values.languages}
              onChange={formik.handleChange}
              className="input-tag-style input-width"
            />
            {formik.touched.languages && formik.errors.languages ? (
              <p className="formicError">{formik.errors.languages}</p>
            ) : null}
          </span>
          <span>
            <p>
              Position <span className="red-text">*</span>
            </p>
            <input
              type="text"
              name="position"
              value={formik.values.position}
              onChange={formik.handleChange}
              className="input-tag-style input-width"
            />
            {formik.touched.position && formik.errors.position ? (
              <p className="formicError">{formik.errors.position}</p>
            ) : null}
          </span>
        </div>
        <div className="valign-wrapper justify-center gap-2 mt-1">
          <button
            type="submit"
            className={`button-style pointer font-20px select-wrapper cercle-purple white-text`}
            style={{ padding: "8px 30px" }}
          >
            {cordinatorLoading ? (
              <ClipLoader color="#fff" size={20} />
            ) : (
              " Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCordinatorData;
