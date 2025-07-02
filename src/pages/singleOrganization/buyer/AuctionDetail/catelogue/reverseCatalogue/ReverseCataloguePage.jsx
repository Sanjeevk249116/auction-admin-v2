import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { globalContext } from "../../../../../../context/ContextProvider";
import { catalogueReadEditData, getCatalogueInformation } from "../../../../../../redux/action/catelogue";
import { getSingleAuction } from "../../../../../../redux/action/auction";
import ReverseCatalogueViewAndEdit from "./ReverseViewAndEdit/ReverseCatalogueViewAndEdit";
import ConFirmReverseCatalogue from "./confirmReverseCatalogue/ConFirmReverseCatalogue";

function ReverseCataloguePage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [editReverseCatelogue, setEditReverseCatelogue] = useState(true);
    const { reverseCatalogueInformation, setCheckCatalogueSameData } =
        useContext(globalContext);

    useEffect(() => {
        setCheckCatalogueSameData((pre) => !pre);
    }, [id, setCheckCatalogueSameData]);

    useEffect(() => {
        dispatch(getSingleAuction(id));
        dispatch(catalogueReadEditData(id));
        dispatch(getCatalogueInformation(id));
    }, [dispatch, id]);


    return (
        <div>
            {editReverseCatelogue ? (
                <ReverseCatalogueViewAndEdit
                    setEditReverseCatelogue={setEditReverseCatelogue}
                />
            ) : (
                <ConFirmReverseCatalogue
                    setEditReverseCatelogue={setEditReverseCatelogue}
                    reverseCatalogueInformation={reverseCatalogueInformation}
                />
            )}
        </div>
    );
}

export default ReverseCataloguePage;
