import React, { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Modal } from "react-materialize";
import {
  convertTo12HourFormat,
  convertTo24HourFormat,
  notifyError,
} from "../../../helper/helpers";
import InputFieldForLots from "../children/InputFieldForLots";
import TimePickerForLots from "../children/TimePickerForLots";
import ImageInformation from "../../commanPage/modals/ImageInformation";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createReverseServiceOffer } from "../../../redux/action/auction";
import { ClipLoader } from "react-spinners";
import ReverseLotTaxes from "../children/ReverseLotTaxes";
import ServiceLotDetails from "../children/ServiceLotDetails";
import ServiceRequirementfield from "../children/ServiceRequirementfield";

const ReverseLotServiceForm = ({ singleAuctionData }) => {
  const fileInputRef = useRef(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery({ query: "(max-width: 1500px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 790px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFileList, setImageFileList] = useState([]);
  const [imageId, setImageId] = useState(0);
  const [keyValue, setKeyValue] = useState(0);
  const { createAuctionLoading } = useSelector((state) => state.auction);
  const [createOffer, setCreateOffer] = useState({
    EMDAmount: null,
    minimumBidDecrease: null,
    description: "",
    location: "",
    offerStartTime: "",
    offerEndTime: "",
    ItTCSTaxes: "1",
    GSTTaxes: "18",
    eventFee: null,
    title: "",
    quantity: null,
    category: "",
    subCategory: "",
    requirements: [],
    unit: "MT"
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCreateOffer((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    event.target.value = null;
    if (imageFileList?.length > 4) {
      return notifyError("You can only select up to 5 images.");
    }

    const alredyStoreImage = imageFileList?.filter((item) => {
      return item.lastModified === file?.lastModified;
    });

    if (alredyStoreImage?.length > 0) {
      return notifyError(
        "Image upload failed: This image is already uploaded."
      );
    }

    if (file) {
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/svg",
        "image/webp",
      ];
      if (validTypes.includes(file.type)) {
        setImageFileList((prevData) => [...prevData, file]);
      } else {
        notifyError(
          "Unsupported file format. Only JPG, JPEG, PNG, SVG, and WEBP files are allowed."
        );
      }
    }
  };

  const validateFieldsforDisabled = (fields) => {
    if (!fields?.minimumBidDecrease) {
      return false;
    }
    if (
      !Array.isArray(fields?.requirements) ||
      fields.requirements.length === 0
    ) {
      return false;
    }
    for (let key in fields) {
      if (key === "file" || key === "minimumBidDecrease") continue;
      const value = fields[key];
      if (typeof value === "string" && value?.trim() === "") {
        return false;
      }
    }
    return true;
  };

  const validateFields = (fields) => {
    if (
      `${fields?.offerStartTime}:00` <
      convertTo24HourFormat(
        convertTo12HourFormat(
          singleAuctionData?.auctionSchedule?.startingTime
        )
      ) ||
      fields?.offerEndTime >
      convertTo24HourFormat(
        convertTo12HourFormat(singleAuctionData?.auctionSchedule?.endingTime)
      )
    ) {
      notifyError(
        `Lot time must be within the range of ${convertTo12HourFormat(
          singleAuctionData?.auctionSchedule?.startingTime
        )} and ${convertTo12HourFormat(
          singleAuctionData?.auctionSchedule?.endingTime
        )}.`
      );

      return false;
    }

    for (let key in fields) {
      if (key === "EMDAmount" && fields[key] <= 100) {
        notifyError("Emd Amount must be greater than 100");
        return false;
      }
      if (key !== "checked" && key !== "minimumBidDecrease" && typeof fields[key] === "string" && !fields[key]?.trim()) {
        notifyError(`The field '${key}' is empty.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields(createOffer)) {
      dispatch(
        createReverseServiceOffer(
          id,
          createOffer,
          imageFileList,
          setKeyValue,
          setImageFileList,
          setCreateOffer
        )
      );
    }
  };

  const showUploadImages = (fileData, widths, heights) => {
    if (fileData) {
      const imageUrl = URL?.createObjectURL(fileData);
      return (
        <div
          className="valign-wrapper gap-1 ml-2"
          onClick={() => viewDetailsFunctionality(fileData?.lastModified)}
        >
          <img
            src={imageUrl}
            alt="imageurl"
            width={`${widths}px`}
            style={{ objectFit: "cover", maxHeight: `${heights}px` }}
          />
          {/* <span>{fileData?.name}</span> */}
        </div>
      );
    }
  };

  const handleRemoveImages = (lastModified) => {
    const remainningImage = imageFileList?.filter((item) => {
      return item?.lastModified !== lastModified;
    });
    setImageFileList(remainningImage);
  };

  const openWithUploadImages = () => {
    const value = document.querySelector(`#file-input`);
    value.click();
  };

  const viewDetailsFunctionality = (id) => {
    setImageId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={`cover white ${isMobile ? "p-1" : isDesktop ? "p-2" : "container p-2"
        }`}
      key={keyValue}
    >
      <h3 className="flex justify-center cercle-purple-text mb-1 mt-2">
        Create service Lots
      </h3>
      <form onSubmit={handleSubmit}>
        <div
          className={`flex column ${isMobile ? "p-1" : isTablet ? "p-2" : "padding-45"
            }`}
          style={{ gap: "1.5rem" }}
        >
          <div
            className={`${isMobile ? "gap-1" : "gap-2"}`}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(1,1fr)" : "repeat(3,1fr)",
              gap: "20px",
            }}
          >
            <span style={{ marginRight: "1.5rem" }}>
              <InputFieldForLots
                label={"EMD Amount"}
                name={"EMDAmount"}
                type={"number"}
                placeholder={"Enter Emd Amount"}
                value={createOffer.EMDAmount}
                setCreateOffer={setCreateOffer}
              />
            </span>
            <span style={{ marginRight: "1.5rem" }}>
              <InputFieldForLots
                label={"Event Fee"}
                name={"eventFee"}
                type={"number"}
                placeholder={"Enter Event Fee"}
                value={createOffer.eventFee}
                setCreateOffer={setCreateOffer}
              />
            </span>
            <InputFieldForLots
              label={"Maximum Decrement"}
              name={"minimumBidDecrease"}
              type={"number"}
              placeholder={"Enter Maximum Decrement"}
              value={createOffer.minimumBidDecrease}
              setCreateOffer={setCreateOffer}
            />
          </div>

          <div
            className={`${isMobile ? "gap-1" : "gap-2"}`}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(1,1fr)" : "repeat(3,1fr)",
              gap: "20px",
            }}
          >
            <TimePickerForLots
              label={"Lot Start time"}
              name={"offerStartTime"}
              editValue={createOffer}
              setCreateOffer={setCreateOffer}
              intervalValue={keyValue}
            />

            <TimePickerForLots
              label={"Lot End time"}
              name={"offerEndTime"}
              editValue={createOffer}
              setCreateOffer={setCreateOffer}
              intervalValue={keyValue}
            />
            <InputFieldForLots
              label={"Location"}
              name={"location"}
              type={"text"}
              placeholder={"Enter Location"}
              value={createOffer.location}
              setCreateOffer={setCreateOffer}
            />
          </div>
          <ServiceLotDetails
            setCreateOffer={setCreateOffer}
            createOffer={createOffer}
          />
          <ReverseLotTaxes
            setCreateOffer={setCreateOffer}
            createOffer={createOffer}
          />
          <div style={{ display: "grid", gridTemplateColumns: "0.3fr 1fr", gap: "30px" }}>
            <span>
              <label className="font-16px black-text">
                Unit of measurement <span className="red-text">*</span>
              </label>
              <select
                className="browser-default"
                name="unit"
                value={createOffer.unit}
                onChange={handleInputChange}
                style={{
                  padding: "14px",
                }}
              >
                <option value="MT">MT</option>
                <option value="KG">KG</option>
                <option value="pieces">pieces</option>
                <option value="lot">lot</option>
                <option value="NOS">Nos</option>
              </select></span>

            <ServiceRequirementfield
              setCreateOffer={setCreateOffer}
              createOffer={createOffer}
            />
          </div>
          <span className="flex column">
            <span className="font-18px black-text">
              Description <span className="red-text">*</span>
            </span>
            <textarea
              className="border-radius-12 textArea-width"
              style={{
                border: "10px solid transparent",
                outline: "2px solid transparent",
                height: "100px",
                backgroundColor: "#F3F7FA",
              }}
              value={createOffer.description}
              name="description"
              onChange={handleInputChange}
            />
          </span>

          <div className="valign-wrapper flex-wrap gap-2">
            {imageFileList?.map((item, index) => (
              <div
                className="valign-wrapper gap-3 pointer pin-top"
                key={item?.lastModified}
              >
                <div className={`flex font-16px font-weight-500`}>
                  {showUploadImages(item, 198, 170)}
                </div>
                <span
                  className="material-icons-outlined select-label circle"
                  style={{
                    top: "-10px",
                    right: "-5px",
                    background: "#f2f4fd",
                    padding: "1px",
                  }}
                  onClick={() => handleRemoveImages(item?.lastModified)}
                >
                  close
                </span>
              </div>
            ))}
          </div>

          <div className="pin-top pointer">
            <div
              className={`flex  justify-center
               pointer font-18px `}
              style={{
                border: "1px dashed #B1BFD0",
                borderRadius: "30px",
                padding: "10px",
              }}
              onClick={handleDivClick}
            >
              <b className={`${isMobile && "font-14px"}`}>
                {" "}
                Upload Corrigendum/photos
              </b>
            </div>
            <span
              className="material-icons-outlined select-label"
              style={{ top: "15px", right: "20px" }}
              onClick={() => openWithUploadImages()}
            >
              file_upload
            </span>
          </div>
          <input
            type="file"
            id="file-input"
            name="chequeFile"
            onChange={handleFileUpload}
            style={{ display: "none" }}
            ref={fileInputRef}
          />

          <div className="valign-wrapper justify-center gap-2 mt-1">
            <button
              className={`button-style pointer font-20px select-wrapper ${validateFieldsforDisabled(createOffer)
                ? "cercle-purple white-text"
                : "grey lighten-2 grey-text"
                }`}
              style={{ padding: "8px 30px" }}
              disabled={!validateFieldsforDisabled(createOffer)}
            >
              {createAuctionLoading ? (
                <ClipLoader color="red" size={20} />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </form>
      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        className="modelAccount"
        id="modalView-details"
        open={isModalOpen}
        options={{
          onCloseEnd: closeModal,
        }}
      >
        <ImageInformation
          imageFileList={imageFileList}
          handleRemoveImages={handleRemoveImages}
          imageId={imageId}
          setImageId={setImageId}
          showUploadImages={showUploadImages}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal>
    </div>
  );
};

export default ReverseLotServiceForm;
