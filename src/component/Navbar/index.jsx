import React, { useState } from "react";

import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Header from "./Header";
import NavMobile from "./NavMobile";
import { useGetMyAboutDataQuery } from "../../store/apis/myAboutApi";
import { Skeleton } from "@mui/material";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isError, isFetching } = useGetMyAboutDataQuery();
  let content;
  if (isFetching)
    content = (
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{ width: "200px", height: "50px" }}
      />
    );
  else if (isError) content = <div>Error!</div>;
  else
    content = data.map((item, i) => (
      <div className="hero-fullName" key={item._id}>
        <img src={item.image} alt="" />
        Mahir&nbsp;<span style={{ color: "#7843E9" }}>Hasanli</span>
      </div>
    ));
  return (
    <header className="header" style={{ zIndex: "99" }}>
      <nav className="navHeaders" style={{ zIndex: "99" }}>
        {content}

        {/* ////Navbar/// */}

        <Header isFetching={isFetching} />

        {/* ///NavMobile//// */}

        <NavMobile isOpen={isOpen} />

        {/* ////isOpenMenu//// */}

        <div
          className="openMenu"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isFetching ? (
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ width: "50px", height: "50px" }}
            />
          ) : (
            <>{isOpen ? <CloseIcon /> : <MenuIcon />}</>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
