import React from "react";
import { RouterProvider } from "react-router-dom";
import { UnAuthenticateRoute } from "./components/UnAuthenticateRoute";

function UnAuthenticatedAdmin() {
  return <RouterProvider router={UnAuthenticateRoute} />;
}

export default UnAuthenticatedAdmin;
