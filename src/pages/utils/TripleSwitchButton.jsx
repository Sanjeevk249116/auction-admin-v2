import React, { useState } from 'react'

function TripleSwitchButton() {
    const [state, setState] = useState("neutral");

    const toggleSwitch = () => {
      setState((prevState) => 
        prevState === "neutral" ? "active" : prevState === "active" ? "inactive" : "neutral"
      );
    };
  
    return (
      <div className="switch-container" onClick={toggleSwitch}>
        <div className={`switch-button ${state}`}>
          {state === "neutral" && <div className="circles neutral" ></div>}
          {state === "active" && <div className="circles active">✔</div>}
          {state === "inactive" && <div className="circles inactive">✖</div>}
        </div>
      </div>
    );
  };

export default TripleSwitchButton
