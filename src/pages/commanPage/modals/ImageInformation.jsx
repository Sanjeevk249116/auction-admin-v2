import React, { useEffect } from "react";
import { formatFileSize } from "../../../helper/helpers";

const ImageInformation = ({
  imageFileList,
  imageId,
  handleRemoveImages,
  showUploadImages,
  setImageId,
  setIsModalOpen,
}) => {
  const renderMainImage = (fileData) => {
    if (!fileData) return null;

    const imageUrl = URL.createObjectURL(fileData);
    return (
      <img
        src={imageUrl}
        alt="Selected"
        style={{ objectFit: "cover", maxHeight: "360px", minHeight: "360px" }}
      />
    );
  };

  const handleImageRemoval = () => {
    const currentIndex = imageFileList.findIndex(
      (item) => item.lastModified === imageId
    );
    handleRemoveImages(imageId);

    if (currentIndex < imageFileList.length - 1) {
      setImageId(imageFileList[currentIndex + 1].lastModified);
    } else if (currentIndex > 0) {
      setImageId(imageFileList[currentIndex - 1].lastModified);
    } else {
      setImageId(null);
    }
  };

  useEffect(() => {
    if (imageFileList?.length === 0) {
      setIsModalOpen(false);
    }
  }, [imageFileList, imageId, setIsModalOpen]);

  return (
    <div>
      <div
        style={{
          border: "1px dashed #B1BFD0",
          borderRadius: "30px",
          padding: "10px",
        }}
      >
        {imageFileList?.map((item, index) =>
          item?.lastModified === imageId ? (
            <div key={index} className="valign-wrapper gap-1 ml-2">
              {renderMainImage(item)}
              <div className="font-25px black-text">
                <p>File name: {item?.name}</p>
                <p>
                  File size:{" "}
                  <span className="red-text">{formatFileSize(item?.size)}</span>
                </p>
              </div>
            </div>
          ) : null
        )}
        <span
          className="material-icons-outlined select-label circle pointer red-text"
          style={{
            top: "40px",
            right: "40px",
            background: "#f2f4fd",
            padding: "5px",
          }}
          onClick={() => handleImageRemoval()}
        >
          delete
        </span>
      </div>
      <div className="valign-wrapper flex-wrap gap-2 mt-2">
        {imageFileList?.map((item, index) => (
          <div className="valign-wrapper gap-3 pointer pin-top" key={index}>
            <div className={`flex font-16px font-weight-500`}>
              {showUploadImages(item, 100, 90)}
            </div>
            <span
              className="material-icons-outlined select-label circle"
              style={{
                top: "-10px",
                right: "-5px",
                background: "#f2f4fd",
                padding: "1px",
              }}
              onClick={() => {
                handleImageRemoval();
                handleRemoveImages(item?.lastModified);
              }}
            >
              close
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className={`button-style white-text cercle-purple mt-3 pointer modal-close`}
          style={{ padding: "8px 25px" }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

// ImageInformation.propTypes = {
//   imageFileList: PropTypes.array.isRequired,
//   imageId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   handleRemoveImages: PropTypes.func.isRequired,
//   showUploadImages: PropTypes.func.isRequired,
//   setImageId: PropTypes.func.isRequired,
//   setIsModalOpen: PropTypes.func.isRequired,
// };

export default ImageInformation;
