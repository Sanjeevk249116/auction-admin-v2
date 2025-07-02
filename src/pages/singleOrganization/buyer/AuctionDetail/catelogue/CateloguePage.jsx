import React, { useContext, useEffect, useState } from "react";
import CatalogueViewAndEdit from "./editAndView/CatalogueViewAndEdit";
import ConfirmCatelogue from "./confirmCatelogue/ConfirmCatelogue";
import { globalContext } from "../../../../../context/ContextProvider";
import { catalogueReadEditData, getCatalogueInformation } from "../../../../../redux/action/catelogue";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSingleAuction } from "../../../../../redux/action/auction";

function CateloguePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [editCatelogue, setEditCatelogue] = useState(true);
  const { catelogueInformation, setCheckCatalogueSameData } = useContext(globalContext);


  useEffect(() => {
    setCheckCatalogueSameData((pre) => !pre)
  }, [id, setCheckCatalogueSameData])

  useEffect(() => {
    dispatch(getSingleAuction(id));
    dispatch(catalogueReadEditData(id));
    dispatch(getCatalogueInformation(id));
  }, [dispatch, id]);

  return (
    <div>
      {editCatelogue ? (
        <CatalogueViewAndEdit setEditCatelogue={setEditCatelogue} />
      ) : (
        <ConfirmCatelogue
          setEditCatelogue={setEditCatelogue}
          catelogueInformation={catelogueInformation}
        />
      )}
    </div>
  );
}

export default CateloguePage;
