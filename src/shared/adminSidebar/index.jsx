import React, { useState } from "react";
import style from "./index.module.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import InfoIcon from "@mui/icons-material/Info";
import TaskIcon from "@mui/icons-material/Task";
import HomeIcon from "@mui/icons-material/Home";
import BuildIcon from "@mui/icons-material/Build";
import { NavLink } from "react-router-dom";
const AdminSidebar = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  return (
    <div className={style.sidebar}>
      <div className={style.sidebarItem}>
        {isOpenSidebar && (
          <div className={style.sidebarLeftItem}>
            <NavLink to="/admin">
              <HomeIcon />
              Dashboard
            </NavLink>
            <NavLink to="/admin/hero">
              <AccountTreeIcon />
              Hero
            </NavLink>
            <NavLink to="/admin/about">
              <InfoIcon />
              About
            </NavLink>
            <NavLink to="/admin/project">
              <TaskIcon />
              Project
            </NavLink>
            <NavLink to="/admin/services">
              <DesignServicesIcon />
              Services
            </NavLink>
            <NavLink to="/admin/contact">
              <ConnectWithoutContactIcon />
              Contact
            </NavLink>
          </div>
        )}
        <div className={style.sidebarRightItem}>
          <HomeIcon />
          <AccountTreeIcon />
          <InfoIcon />
          <TaskIcon />
          <DesignServicesIcon />
          <BuildIcon />
        </div>
      </div>
      <div
        className={style.isOpenSidebar}
        onClick={() => setIsOpenSidebar(!isOpenSidebar)}
      >
        {isOpenSidebar ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
      </div>
    </div>
  );
};

export default AdminSidebar;
