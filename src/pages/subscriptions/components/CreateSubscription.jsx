import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewSubscriptionPlan,
  updateSubscription,
} from "../../../redux/action/subscription";
import { ClipLoader } from "react-spinners";

function CreateSubscription({ editSubscription, setmodel = () => { }, canEdit = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [singleFeature, setSingleFeature] = useState("");
  const { subscriptionLoading } = useSelector(
    (state) => state.susbcription
  );
  const isLaptop = useMediaQuery({ query: "(max-width: 1100px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 730px)" });
  const [storeFeature, setStoreFeature] = useState([]);
  const [createSubscription, setCreateSubscription] = useState(
    {
      name: "",
      price: null,
      numberOfYears: null,
      savingsPercentage: null,
      features: [],
    }
  );

  const handleChanges = (e) => {
    const { name, value } = e.target;

    const numericFields = ["price", "numberOfYears", "savingsPercentage"];
    const processedValue = numericFields.includes(name)
      ? value === ""
        ? null
        : Number(value)
      : value;

    setCreateSubscription((pre) => ({
      ...pre,
      [name]: processedValue,
    }));
  };

  const checkFieldValidation = () => {
    if (
      createSubscription.name === "" ||
      createSubscription.price === null ||
      createSubscription.numberOfYears === null ||
      createSubscription.savingsPercentage === null ||
      createSubscription?.features?.length === 0
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleToggleStatus = (id) => {
    const updateFetaureStore = storeFeature?.map((item) =>
      item.id === id ? { ...item, status: !item.status } : item
    );
    setStoreFeature(updateFetaureStore);
    const selectedFeatures = updateFetaureStore
      ?.filter((offer) => offer?.status)
      ?.map((offer) => offer.features);

    setCreateSubscription((prev) => ({
      ...prev,
      features: selectedFeatures,
    }));
  };

  const handleAddFeature = () => {
    if (singleFeature.trim() === "") return;

    setStoreFeature((prev) =>
      Array.isArray(prev)
        ? [
          ...prev,
          { id: prev.length + 1, features: singleFeature, status: true },
        ]
        : [{ id: 1, features: singleFeature, status: true }]
    );

    setCreateSubscription((prev) => ({
      ...prev,
      features: [...prev.features, singleFeature],
    }));
    setSingleFeature("");
  };

  const handleSubmitForm = () => {
    if (editSubscription) {
      dispatch(updateSubscription(editSubscription._id, createSubscription, setmodel));
    } else {

      dispatch(createNewSubscriptionPlan(createSubscription, navigate));
    }
  };

  useEffect(() => {
    const updateEditSubcription = editSubscription?.features?.map(
      (item, index) => ({ id: index + 1, features: item, status: true })
    );
    setStoreFeature(updateEditSubcription);
  }, [editSubscription?.features]);

  useEffect(() => {
    if (canEdit) {
      setCreateSubscription({
        name: editSubscription?.name,
        price: editSubscription?.price,
        numberOfYears: editSubscription?.numberOfYears,
        savingsPercentage: 0,
        features: editSubscription?.features,
      })
    }
  }, [editSubscription, canEdit])

  return (
    <div className={`${!canEdit && "mt-1"}`}>
      <span className={`valign-wrapper gap-1 ${!canEdit && "mb-1"}`}>
        <span
          className="material-icons-outlined pointer"
          onClick={() => { if (canEdit) setmodel(false); else navigate(-1) }}
        >
          arrow_back
        </span>
        {!canEdit && <h4>Create Subscription</h4>}
      </span>
      <div
        className={`${editSubscription ? "p-1" : "container white cover p-2"}`}
      >
        <h4 className="flex justify-center cercle-purple-text">
          {canEdit ? "Edit Subscription" : "Create Subscription"}
        </h4>
        <form onSubmit={handleSubmit}>
          <div
            className="mt-1"
            style={{
              display: "grid",
              gridTemplateColumns: isLaptop ? "repeat(1,1fr)" : "repeat(2,1fr)",
              rowGap: "20px",
              columnGap: "30px",
            }}
          >
            <span>
              <p>
                Subscription name <span className="red-text">*</span>
              </p>
              <input
                type="text"
                name="name"
                value={createSubscription.name}
                onChange={handleChanges}
                className="input-tag-style input-width"
              />
            </span>
            <span>
              <p>
                Price <span className="red-text">*</span>
              </p>
              <input
                type="number"
                name="price"
                value={createSubscription.price}
                onChange={handleChanges}
                className="input-tag-style input-width"
              />
            </span>

            {/* <Switch
                isOn={createSubscription.recommended}
                handleToggle={() =>
                  setCreateSubscription((prevState) => ({
                    ...prevState,
                    recommended: !prevState.recommended,
                  }))
                }
                textName={" Recommended:"}
              /> */}

            <span>
              <p>
                Number of year <span className="red-text">*</span>
              </p>
              <input
                type="number"
                name="numberOfYears"
                value={createSubscription.numberOfYears}
                onChange={handleChanges}
                className="input-tag-style input-width"
              />
            </span>


            <span>
              <p>
                Saving Discount % <span className="red-text">*</span>
              </p>
              <input
                type="number"
                name="savingsPercentage"
                onChange={handleChanges}
                value={createSubscription.savingsPercentage}
                className="input-tag-style input-width"
              />
            </span>
            {/* <span className="pin-top">
                <p>
                  Current Price<span className="red-text">*</span>
                </p>
                <input
                  disabled={true}
                  type="number"
                  value={createSubscription.afterDiscountPrice}
                  className="input-tag-style input-width"
                />
                <span
                  className="select-label small-text red-text"
                  style={{ top: "70px" }}
                >
                  calculated from price & discount
                </span>
              </span> */}
          </div>

          <div className="mt-1 flex column" style={{ gap: "10px" }}>
            {storeFeature?.map((item, index) => (
              <div key={item.id} className="valign-wrapper space-between">
                <p className="valign-wrapper gap-1">
                  <span
                    className="material-icons-outlined cercle-purple-text pointer"
                    onClick={() => handleToggleStatus(item?.id)}
                  >
                    {item?.status ? "check_box" : "check_box_outline_blank"}
                  </span>
                  {item?.features}
                </p>
              </div>
            ))}
          </div>

          <div
            className={`mt-2 valign-wrapper  ${isMobile ? "column" : "gap-4"}`}
          >
            <span style={{ width: isMobile ? "90%" : "700px" }}>
              <label className="black-text font-16px">
                Add features <span className="red-text">*</span>
              </label>
              <input
                className="input-tag-style grey lighten-4 margin-0px"
                type="text"
                value={singleFeature}
                placeholder="Add more Response"
                onChange={(e) => setSingleFeature(e.target.value)}
              />
            </span>
            <button
              className={`button-style cover pointer`}
              style={{ padding: "13px 40px", marginTop:!isMobile&& "1.5rem" }}
              onClick={() => handleAddFeature()}
            >
              Add
            </button>
          </div>
          <div className="valign-wrapper justify-center gap-2 mt-2">
            <button
              className={`button-style pointer font-20px select-wrapper ${checkFieldValidation()
                ? "grey lighten-2"
                : "cercle-purple white-text"
                }`}
              style={{ padding: "8px 30px" }}
              disabled={checkFieldValidation()}
              onClick={handleSubmitForm}
            >
              {subscriptionLoading ? (
                <ClipLoader color="#fff" size={20} />
              ) : (
                "Submit"
              )}

            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSubscription;
