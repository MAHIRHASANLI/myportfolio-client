import style from "./index.module.css";
import { Link } from "react-scroll";
import Button from "../../../shared/button/Button";
import React from "react";
import SocialLink from "../../../shared/backToTopButton/SocialLink";
import { useGetHeroDataQuery } from "../../../store/apis/homeHeroApi";
import { Skeleton } from "@mui/material";
import { FillingBottle } from "react-cssfx-loading";

const Home = () => {
  const { data, isError, isFetching } = useGetHeroDataQuery();
  let content;
  if (isFetching)
    content = (
      <>
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ width: "100%", height: "100vh" }}
        />
        <div className={style.loadingFillingBottle}>
          <FillingBottle color="#7843E9" />
        </div>
      </>
    );
  else if (isError) content = <div>Error!</div>;
  else
    content = data.map((item) => {
      return (
        <section
          id="home"
          key={item._id}
          style={{
            background: `linear-gradient(to right,rgba(245, 245, 245, 0.8), rgba(245, 245, 245, 0.8)),url(${item.image})`,
          }}
        >
          <div className={style.container}>
            <h1 className={style.name}>
              <span>Hello, I'm&nbsp;{item.name}</span>&nbsp;
              <span id="color">{item.surname}</span>
            </h1>
            <p className={style.profession}>{item.profession}</p>
            <Link activeClass="active" smooth spy to="contact">
              <Button>Contact me</Button>
            </Link>
          </div>
          <SocialLink />
        </section>
      );
    });

  return <React.Fragment>{content}</React.Fragment>;
};

export default Home;
