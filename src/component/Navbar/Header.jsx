import { Skeleton } from "@mui/material";
import React from "react";
import { Link } from "react-scroll";

const Header = ({ isFetching }) => {
  return (
    <div className="navLink">
      <Link activeClass="active link" className="links" smooth spy to="home">
        {isFetching ? (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ width: "60px", height: "50px" }}
          />
        ) : (
          "Home"
        )}
      </Link>

      <Link activeClass="active link" className="links" smooth spy to="skills">
        {isFetching ? (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ width: "60px", height: "50px" }}
          />
        ) : (
          "About"
        )}
      </Link>

      <Link
        activeClass="active link"
        className="links"
        smooth
        spy
        to="services"
      >
        {isFetching ? (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ width: "70px", height: "50px" }}
          />
        ) : (
          "Services"
        )}
      </Link>

      <Link activeClass="active link" className="links" smooth spy to="project">
        {isFetching ? (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ width: "70px", height: "50px" }}
          />
        ) : (
          "Project"
        )}
      </Link>

      <Link activeClass="active link" className="links" smooth spy to="contact">
        {isFetching ? (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ width: "70px", height: "50px" }}
          />
        ) : (
          "Contact"
        )}
      </Link>
    </div>
  );
};

export default Header;
