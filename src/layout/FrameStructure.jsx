import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../frame/Header";
import Aside from "../frame/Aside";
function FrameStructure({ children, userInfo }) {
  const [openAside, setOpenAside] = useState(false);

  return (
    <div className="frame">
      <Header
        setOpenAside={setOpenAside}
        openAside={openAside}
        userInfo={userInfo}
      />
      <div className="overlay open-aside">
        <Aside openAside={openAside} setOpenAside={setOpenAside} />
        <section className={openAside ? "section open-aside" : "section"}>
          <Outlet /> {/* This will render the matched child route */}
        </section>
      </div>
    </div>
  );
}

export default FrameStructure;
