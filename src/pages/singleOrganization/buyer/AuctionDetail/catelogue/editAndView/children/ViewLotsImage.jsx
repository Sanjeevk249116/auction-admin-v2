import React from "react";
import { showUploadImages } from "../../../../../../../helper/helpers";

function ViewLotsImage({
  catelogueInformation,
  setCatelogueInformation,
  confirmCatelogue = false,
}) {
    
  const handleRemoveImages = (lastModified, idx) => {
    const remainningImage = catelogueInformation?.lotsImages?.filter((item) => {
      return item?.lastModified !== lastModified;
    });
    const removeScrapName = catelogueInformation?.imageName?.filter(
      (item, index) => index !== idx
    );
    setCatelogueInformation((prevData) => ({
      ...prevData,
      lotsImages: remainningImage,
      imageName: removeScrapName,
    }));
  };

  return (
    <div
      className={`${catelogueInformation?.lotsImages?.length > 0 && "mt-2"}`}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(398px, 1fr))",
        gap: "2rem",
      }}
    >
      {catelogueInformation?.lotsImages?.map((item, index) => (
        <div
          className={`valign-wrapper justify-center ${
            confirmCatelogue ? "gap-3" : "gap-1"
          } pointer pin-top`}
          key={item?.lastModified}
        >
          <div className={`flex font-16px font-weight-500`}>
            {showUploadImages(
              item,
              398,
              470,
              catelogueInformation?.imageName?.[index]
            )}
          </div>
          {confirmCatelogue && (
            <span
              className="material-icons-outlined select-label circle"
              style={{
                top: "0px",
                right: "0px",
                background: "#f2f4fd",
                padding: "1px",
              }}
              onClick={() => handleRemoveImages(item?.lastModified, index)}
            >
              close
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default ViewLotsImage;
