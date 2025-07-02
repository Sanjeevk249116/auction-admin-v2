import React, { useRef, useState } from "react";
import {
  NoItemsLeftInTable,
  notifyError,
} from "../../../../../../../../helper/helpers";
import HeaderFrame from "../../../editAndView/prototype/HeaderFrame";
import CommanHeader from "../../../editAndView/components/CommanHeader";
import ViewLotsImage from "../../../editAndView/children/ViewLotsImage";
import ReverseAuctionProductTable from "../table/ReverseAuctionProductTable";

function ReverseProductList({
  itemOpens,
  id,
  reverseCatalogueInformation,
  setReverseCatalogueInformation,
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

    const alredyStoreImage = reverseCatalogueInformation?.lotsImages?.filter(
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
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (validTypes.includes(file.type)) {
        const maxSize = 2 * 1024 * 1024;
        if (file.size > maxSize) {
          setImageName("");
          return notifyError(
            "Image upload failed: Image size should not exceed 2MB."
          );
        }

        setReverseCatalogueInformation((prevData) => ({
          ...prevData,
          lotsImages: [...prevData?.lotsImages, file],
          imageName: [...prevData?.imageName, imageName],
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
          <ReverseAuctionProductTable
            editValue={updateItems}
            setCatelogueInformation={setReverseCatalogueInformation}
            catelogueInformation={reverseCatalogueInformation}
            handleDivClick={handleDivClick}
          />

          <div className="mt-1 valign-wrapper space-between">
            <h5 className="font-18px">Material images</h5>

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
              catelogueInformation={reverseCatalogueInformation}
              setCatelogueInformation={setReverseCatalogueInformation}
              confirmCatelogue={updateItems}
            />
            {reverseCatalogueInformation?.lotsImages?.length === 0 && (
              <NoItemsLeftInTable height={"150px"} />
            )}
          </div>
        </div>
      }
    />
  );
}

export default ReverseProductList;
