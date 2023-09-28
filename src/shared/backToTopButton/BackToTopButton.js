import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import style from "./index.module.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";


const BackToTopButton = () => {
  const [backToTopBtn, setBackToTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 700) {
        setBackToTopBtn(true);
      } else {
        setBackToTopBtn(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      {backToTopBtn && (
        <button
          onClick={scrollUp}
          className={style.scroll_button}
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
        >
          <ArrowUpwardIcon />
        </button>
      )}
    </div>
  );
};

export default BackToTopButton;
