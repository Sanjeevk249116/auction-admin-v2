import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { adminRouter } from "./components/AdminRouter";
import { useDispatch, useSelector } from "react-redux";
import { getAdminDetails, getUserProfile } from "../redux/action/auth";
import SpinnersLoading from "../pages/commanPage/loader/SpinnersLoading";

function AuthenticatedAdmin() {
  const dispatch = useDispatch();
  const { profileLoading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getAdminDetails());
  }, [dispatch]);

  if (profileLoading) {
    return <SpinnersLoading />;
  }

  return <RouterProvider router={adminRouter} />;
}

export default AuthenticatedAdmin;
