import * as React from "react";
import style from "./index.module.css";
import { useGetHeroDataQuery } from "../../store/apis/homeHeroApi";
import { Grid, Skeleton } from "@mui/material";
import { useGetContactDAtaQuery } from "../../store/apis/myContactApi";

const FooterUser = () => {
  const { data, isError, isFetching } = useGetHeroDataQuery();
  const contactData = useGetContactDAtaQuery();

  const newData = new Date();
  let content;
  if (isFetching)
    content = (
      <Skeleton variant="rectangular" sx={{ width: "100%", height: "150px" }} />
    );
  else if (isError) content = <div>Error!</div>;
  else
    content = data.map((item) => (
      <Grid key={item._id} container spacing={2}>
        <Grid item xs={12} sm={10} md={6} lg={6}>
          <h1 className={style.fullName}>
            <span>{item.name}</span>&nbsp;
            <span id="color">{item.surname}</span>
          </h1>
          <div>
            <p className={style.profession}>{item.profession}</p>
          </div>
        </Grid>
        <Grid item xs={12} sm={10} md={6} lg={6}>
          <div className={style.footer_rightItem}>
            <h1>SOCIAL</h1>
            {contactData.data &&
              contactData.data.map((item) => (
                <div key={item._id}>
                  <a href={item.facebook} target="_blank" title="facebook">
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                  <a href={item.linkedn} target="_blank" title="linkedin">
                    <i
                      style={{ marginLeft: "20px" }}
                      className="fa-brands fa-linkedin-in"
                    ></i>
                  </a>
                  <a href={item.github} target="_blank" title="github">
                    <i
                      style={{ marginLeft: "20px" }}
                      className="fa-brands fa-github"
                    ></i>
                  </a>
                  <a href={item.instagram} target="_blank" title="instagram">
                    <i
                      style={{ marginLeft: "20px" }}
                      className="fa-brands fa-instagram"
                    ></i>
                  </a>
                </div>
              ))}
          </div>
        </Grid>
      </Grid>
    ));
  return (
    <div className={style.footer}>
      <div style={{ width: "80%", margin: "auto" }}>
        <div className={style.footer_top}>{content}</div>
        <div className={style.footer_bottom}>
          © Copyright {newData.getFullYear()}. Made by{" "}
          <a href="">Mahir Hasanli</a>
        </div>
      </div>
    </div>
  );
};

export default FooterUser;
