import React from "react";

function ProfileEditing({
  profileName,
  iconsName,
  name,


}) {
 

  return (
    <div className={`mb-1 valign-wrapper gap-1 `}>
      <span
        className="material-icons cercle-purple-text"
        style={{ fontSize: "25px" }}
      >
        {iconsName}
      </span>
     
        <p className="title">{name}: {profileName}</p>
    
    </div>
  );
}

export default ProfileEditing;
