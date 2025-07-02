import React, { useEffect } from "react";
import DocumentsTable from "./tables/DocumentsTable";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllDocumentsData } from "../../../../redux/action/document";

const DocumnentsCollection = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { documentData, loading } = useSelector((pre) => pre.allDocuments);

  useEffect(() => {
    dispatch(getAllDocumentsData(id));
  }, [dispatch, id]);

  return (
    <div className="mt-1 flex column gap-1">
      <div className="valign-wrapper space-between">
        <h4>Document</h4>
      </div>

      <DocumentsTable
        documentValue={documentData[0]?.files || documentData}
        loading={loading}
      />
    </div>
  );
};

export default DocumnentsCollection;
