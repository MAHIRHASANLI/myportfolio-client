import { Link } from "react-scroll";
import React from "react";

const NavMobile = ({ isOpen }) => {
  return (
    <div className="navMobile" style={{ right: isOpen ? "0px" : "-100%" }}>
      <Link activeClass="active link" smooth spy to="home">
        Home
      </Link>

      <Link activeClass="active link" smooth spy to="skills">
        About
      </Link>

      <Link activeClass="active link" smooth spy to="services">
        Services
      </Link>

      <Link activeClass="active link" smooth spy to="project">
        Project
      </Link>

      <Link activeClass="active link" smooth spy to="contact">
        Contact
      </Link>
    </div>
  );
};

export default NavMobile;
