import React from "react";
import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <title>Ana Səhifə - Mahir Hasanli</title>
        <meta name="description" content="Mahir Hasanli" />
        <meta
          name="keywords"
          content="React js, JavaScript, Portfolio, Mahir Hasanli, Mahir Hasani, Mahir, Hasanli, Hasani, mahirhasanli, mahirhasani"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Mahir :: Web Developer" />
        <meta
          property="og:description"
          content="I am a software engineer, developing web applications."
        />
        <meta property="og:url" content="https://mahirhasanli.vercel.app" />
        <meta name="email" content="hasanlimahir1@gmail.com" />
      </Helmet>
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
