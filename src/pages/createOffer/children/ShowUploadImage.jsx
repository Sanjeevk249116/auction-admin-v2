import React from 'react'

function ShowUploadImage({ fileData, widths, heights }) {
    if (fileData) {
        const imageUrl = URL?.createObjectURL(fileData);
        return (
            <div
                className="valign-wrapper gap-1 ml-2"
            >
                <span>{fileData?.name}</span>
                <img
                    src={imageUrl}
                    alt="imageurl"
                    width={`${widths}px`}
                    style={{ objectFit: "cover", maxHeight: `${heights}px` }}
                />
            </div>
        );
    }
}

export default ShowUploadImage
