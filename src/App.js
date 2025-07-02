import React from "react";
import AuthenticatedAdmin from "./router/AuthenticatedAdmin";
import UnAuthenticatedAdmin from "./router/UnAuthenticatedAdmin";
const isToken = localStorage.getItem("admin_dashboard");


function App() {

  React.useEffect(() => {
    const cleanupScroll = () => {
      document.body.style.overflow = "auto";
    };
    document.addEventListener("click", cleanupScroll);
    return () => {
      document.removeEventListener("click", cleanupScroll);
    };
  }, []);
  
  // Check if the user is authenticated
  return isToken ? <AuthenticatedAdmin /> : <UnAuthenticatedAdmin />;
}

export default App;
