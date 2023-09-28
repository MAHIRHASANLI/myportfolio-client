import React from "react";
import style from "./index.module.css";

const Button = ({ children }) => {
  return (
    <button type="submit" className={style.button}>
      {children}
    </button>
  );
};

export default Button;
