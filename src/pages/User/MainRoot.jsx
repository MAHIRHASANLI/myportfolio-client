import React from "react";
import Navbar from "../../component/Navbar";
import Home from "./Home";
import About from "./About";
import Services from "./Services";
import Project from "./Project";
import Contact from "./Contact";
import FooterUser from "../../component/Footer";
import BackToTopButton from "../../shared/backToTopButton/BackToTopButton";
const MainRoot = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Home />
      <About />
      <Services />
      <Project />
      <Contact />
      <FooterUser />
      <BackToTopButton />
    </React.Fragment>
  );
};

export default MainRoot;
