import React, { useEffect, useMemo, useState } from "react";
import ProfileEditing from "../children/ProfileEditing";
import { capitalizeFirstLetter } from "../../../helper/helpers";

function ProfileSection({ profile }) {
  const [editProfileData, setEditProfileData] = useState([]);

  const InitialProfileData = useMemo(
    () => [
      {
        profileName: capitalizeFirstLetter(profile?.name || ""),
        iconsName: "person_outline",
        type: "text",
        name: "Name",
      },
      {
        profileName: profile?.email || "",
        iconsName: "email",
        type: "email",
        name: "Email",
      },
      {
        profileName: "Cerclex",
        iconsName: "corporate_fare",
        type: "text",
        name: "Organization Name",
      },
    ],
    [profile]
  );

  useEffect(() => {
    setEditProfileData([...InitialProfileData]);
  }, [InitialProfileData]);

  return (
    <div className={`cover white p-2 mt-1 flex column gap-1`}>
      <h5 className="mb-1">Your Account Information</h5>

      <div>
        {editProfileData?.map((items, index) => (
          <ProfileEditing
            profileName={items.profileName}
            iconsName={items.iconsName}
            name={items.name}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default ProfileSection;
