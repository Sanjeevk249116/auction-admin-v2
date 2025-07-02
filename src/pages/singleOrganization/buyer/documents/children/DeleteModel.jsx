import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteDocument } from '../../../../../redux/action/document';
import { ClipLoader } from 'react-spinners';

function DeleteModel({ fileData, setIsDeleteDocument }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading } = useSelector((pre) => pre.allDocuments);

    const handleDeleteFile = () => {
        dispatch(deleteDocument(id, fileData?.fileId)).then(() => {
            setIsDeleteDocument(false);
        });

    }


    return (
        <div>
            <h5 className="normal-size">Confirm to Delete Document</h5>
            <p className="semi-bold">
                Are you sure to Delete <b className='red-text'>{fileData?.fileName}</b>
            </p>
            <div className="flex justify-end gap-1">
                <button className="green btn-small " onClick={handleDeleteFile}>
                {loading ? <ClipLoader color="red" size={20} /> : "Yes"}
                </button>

                <button
                    className="red btn-small"
                    onClick={() => setIsDeleteDocument(false)}
                >
                    No
                </button>
            </div>
        </div>
    )
}

export default DeleteModel
