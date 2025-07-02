import React, { useContext } from "react";
import { globalContext } from "../../../../../../../context/ContextProvider";
import { useMediaQuery } from "react-responsive";

function CommanHeader({
  label,
  onUpdate,
  checkedBoxToggle,
  editValue,
  hoverByMouse,
  itemOpens,
}) {
  const isTablet = useMediaQuery({ query: "(max-width: 750px)" });
  const { selectcheckboxItem, setSelectcheckboxItem } =
    useContext(globalContext);

  const onToggle = () => {
    setSelectcheckboxItem((pre) => ({
      ...pre,
      [checkedBoxToggle]: !pre[checkedBoxToggle],
    }));
  };



  return (
    <div className="valign-wrapper space-between full-width">
      <span className="valign-wrapper gap-1">
        <span
          className="material-icons-outlined cercle-purple-text pointer font-25px"
          onClick={(e) => {
            onToggle();
          }}
          onMouseEnter={() => hoverByMouse(true)}
          onMouseLeave={() => hoverByMouse(false)}
        >
          {selectcheckboxItem[checkedBoxToggle]
            ? "check_box"
            : "check_box_outline_blank"}
        </span>
        <h6 className={`${isTablet ? "font-14px" : "font-16px"} cercle-purple-text`}>{label?.toUpperCase()}</h6>
      </span>
      <span className={`valign-wrapper ${isTablet ? "gap-10px" : "gap-2"}`}>
        <button
          className={`button-style pointer white-text font-weight-600 ${isTablet?"font-14px":"font-16px"} font-cercular-bold`}
          style={{
            padding: "5px 10px",
            width: isTablet ? "70px" : "100px",
            backgroundColor: "#6f2da8",
          }}
          onClick={(e) => {
            onUpdate();
          }}
          onMouseEnter={() => hoverByMouse(true)}
          onMouseLeave={() => hoverByMouse(false)}
        >
          {!editValue ? "Edit" : "Update"}
        </button>
        <span className="material-icons-outlined">
          {itemOpens ? "keyboard_arrow_up" : "keyboard_arrow_down"}
        </span>
      </span>
    </div>
  );
}

export default CommanHeader;
