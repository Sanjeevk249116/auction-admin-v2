import React from 'react'
import AddScrapMaterial from '../classification/AddScrapMaterial'
import ExistingScrap from '../classification/ExistingScrap'

function MaterialClassification() {
    return (
        <div
            className="p-2 cover flex column gap-1 mt-1" style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }} >
            <h4 className="margin-0px">Update Classifications</h4>
            <AddScrapMaterial />
            <ExistingScrap />

        </div>
    )
}

export default MaterialClassification
