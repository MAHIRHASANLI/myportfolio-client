import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../shared/adminSidebar";

const AdminRoot = () => {
  return (
    <>
      <AdminSidebar />
      <Outlet />
    </>
  );
};

export default AdminRoot;
