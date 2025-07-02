import React, { useRef, useState } from "react";
import CommanHeader from "./CommanHeader";
import HeaderFrame from "../prototype/HeaderFrame";
import AuctionPropertyTable from "../table/AuctionPropertyTable";
import {
  NoItemsLeftInTable,
  notifyError,
} from "../../../../../../../helper/helpers";
import ViewLotsImage from "../children/ViewLotsImage";

function AuctionProperty({
  itemOpens,
  id,
  setCatelogueInformation,
  catelogueInformation,
}) {
  const fileInputRef = useRef(null);
  const [mouseOnSwitch, setMouseOnSwitch] = useState(false);
  const [updateItems, setUpdateItems] = useState(true);
  const [imageName, setImageName] = useState("");

  const handleUpdate = () => {
    setUpdateItems((prev) => !prev);
  };

  const handleDivClick = (name) => {
    fileInputRef.current.click();
    setImageName(name);
  };

  const handleFileUpload = (event) => {
    const file = event?.target?.files[0];
    event.target.value = null;

    const alredyStoreImage = catelogueInformation?.lotsImages?.filter(
      (item) => {
        return item.lastModified === file?.lastModified;
      }
    );

    if (alredyStoreImage?.length > 0) {
      setImageName("");
      return notifyError(
        "Image upload failed: This image is already uploaded."
      );
    }

    if (file) {
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
      ];
      if (validTypes.includes(file.type)) {
        const maxSize = 2 * 1024 * 1024;
        if (file.size > maxSize) {
          setImageName("");
          return notifyError("Image upload failed: Image size should not exceed 2MB.");
        }

        setCatelogueInformation((prevData) => ({
          ...prevData,
          lotsImages: [...prevData?.lotsImages, file],
          imageName: [...prevData?.imageName, imageName]
        }));
      } else {
        notifyError(
          "Unsupported file format. Only JPG, JPEG and PNG files are allowed."
        );
      }
    }
    setImageName("");
  };

  return (
    <HeaderFrame
      id={id}
      mouseOnSwitch={mouseOnSwitch}
      itemOpens={itemOpens}
      childrenFirst={
        <CommanHeader
          hoverByMouse={setMouseOnSwitch}
          label="DETAILS OF AUCTION PROPERTY"
          checkedBoxToggle={"propertyCheckbox"}
          onUpdate={() => handleUpdate()}
          editValue={updateItems}
          itemOpens={itemOpens}
        />
      }
      childrenSecond={
        <div>
          <h6 className="font-18px">Details of Auction Property </h6>
          <AuctionPropertyTable
            editValue={updateItems}
            setCatelogueInformation={setCatelogueInformation}
            catelogueInformation={catelogueInformation}
            handleDivClick={handleDivClick}
          />

          <div className="mt-1 valign-wrapper space-between">
            <h5 className="font-18px">Material images</h5>
            {/* <button
              className="valign-wrapper justify-center gap-10px"
              style={{
                padding: "7px 10px",
                border: "1px solid purple",
                borderRadius: "8px",
              }}
            >
              <span className="material-symbols-outlined font-18px">add</span>
              <span>Upload Scrap image</span>
            </button> */}
            <input
              type="file"
              id="file-input"
              name="chequeFile"
              onChange={handleFileUpload}
              style={{ display: "none" }}
              ref={fileInputRef}
            />
          </div>
          <div>
            <ViewLotsImage
              catelogueInformation={catelogueInformation}
              setCatelogueInformation={setCatelogueInformation}
              confirmCatelogue={updateItems}
            />
            {catelogueInformation?.lotsImages?.length === 0 && (
              <NoItemsLeftInTable height={"150px"} />
            )}
          </div>
        </div>
      }
    />
  );
}

export default AuctionProperty;
