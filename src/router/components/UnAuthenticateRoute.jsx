import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../../pages/auth/LoginPage";
import PageNotFound from "../../pages/commanPage/PageNotFound";

export const UnAuthenticateRoute = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    children: [],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
