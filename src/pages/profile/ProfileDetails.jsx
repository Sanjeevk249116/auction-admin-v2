import React from "react";
import ProfileHeader from "./components/ProfileHeader";
import ProfileSection from "./components/ProfileSection";
import { useMediaQuery } from "react-responsive";
import { Tab, Tabs } from "react-materialize";
import { useSelector } from "react-redux";
import MaterialClassification from "./components/MaterialClassification";

function ProfileDetails() {
  const isLaptop = useMediaQuery({ query: "(max-width:1500px)" });
  const { profile } = useSelector((state) => state.profile);


  return (
    <div className={`${isLaptop ? "" : "container"}`}>
      <ProfileHeader
        loadings={false}
        profile={profile}
      />

      <Tabs>
        <Tab title="General">
          <ProfileSection
            loadings={false}
            profile={profile}
          />
        </Tab>
        <Tab title="Classification">
          <MaterialClassification />
          {/* <ScrapClassification /> */}
        </Tab>

        {/* <Tab title="Change Password">
          <PasswordChange />
        </Tab>

        <Tab title="Notification Settings">
          <NotificationPage />
        </Tab> */}
      </Tabs>
    </div>
  );
}

export default ProfileDetails;
