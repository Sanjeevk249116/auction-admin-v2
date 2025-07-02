import React, { useState } from "react";
import ContactInfoItem from "../children/ContactInfoItem";
import { useMediaQuery } from "react-responsive";
import { truncateText } from "../../../helper/helpers";
import { Dropdown, Modal } from "react-materialize";
import { useDispatch } from "react-redux";
import { deleteCordinator } from "../../../redux/action/cordinator";
import EditCordinatorData from "../children/EditCordinatorData";
import { useNavigate } from "react-router-dom";

function RerenderContactInfo({ item, isCollapsible = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);

  const handleDeleteCordinator = () => {
    setIsModalDelete(true);
  };
  const handleEditCordinator = () => {
    setIsModalEdit(true);
  };

  const closeModal = () => {
    setIsModalDelete(false);
    setIsModalEdit(false);
  };
  
  return (
    <>
      <ContactInfoItem
        icon="call"
        text={item?.phoneNumber}
        show={isMobile || !isCollapsible}
      />
      <ContactInfoItem icon="email" text={item.email} />
      <ContactInfoItem
        icon="language"
        className={"text-uperCase"}
        text={truncateText(
          item.languages?.map((lang, index) => (
            <React.Fragment key={lang}>
              {lang}
              {index < item.languages.length - 1 && ", "}
            </React.Fragment>
          )),
          16
        )}
      />
      <ContactInfoItem
        icon="location_on"
        text={`${item?.address?.street}`}
      />
      <Dropdown
        id={`${item?.phoneNumber}`}
        options={{
          // alignment: "left",
          constrainWidth: false,
          // coverTrigger: false,
        }}
        trigger={
          <span className="material-icons-outlined pointer">more_vert</span>
        }
      >
        <div
          className="valign-wrapper column white"
          style={{ width: "170px" }}
        >
          <button
            className="pointer font-16px full-width onHover"
            style={{ padding: "10px 0px" }}
            onClick={() => navigate(`/single-coordinatore/${item._id}`)}
          >
            View Details
          </button>

          <p className="full-width grey" style={{ height: "1px" }}></p>
          <button
            className="pointer font-16px full-width onHover"
            style={{ padding: "10px 0px" }}
            onClick={handleEditCordinator}
          >
            Edit coordinator
          </button>
          <p className="full-width grey" style={{ height: "1px" }}></p>
          <button
            className="pointer font-16px full-width onHover"
            style={{ padding: "10px 0px" }}
            onClick={handleDeleteCordinator}
          >
            Delete coordinator
          </button>
        </div>
      </Dropdown>

      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        className="modelAccount"
        id="modalView-details"
        open={isModalDelete}
        options={{
          onCloseEnd: closeModal,
        }}
      >
        <h4 className="normal-size">
          Confirm to Delete {item?.name} as cordinator.
        </h4>
        <p>
          <strong>This action cannot be undone.</strong> Please confirm that you
          want to proceed.
        </p>
        <div className="flex justify-end gap-1 mt-1">
          <button
            className="green btn-small"
            onClick={() =>
              dispatch(deleteCordinator(item?._id, setIsModalDelete))
            }
          >
            Yes
          </button>
          <button
            className="red btn-small modal-close"
            onClick={() => setIsModalDelete(false)}
          >
            No
          </button>
        </div>
      </Modal>
      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        className="modelAccount"
        id="modalView-details"
        open={isModalEdit}
        options={{
          onCloseEnd: closeModal,
        }}
      >
        <EditCordinatorData item={item} setIsModalOpen={setIsModalEdit} />
      </Modal>
    </>
  );
}

export default RerenderContactInfo;
