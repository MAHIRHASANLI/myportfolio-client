import * as React from "react";
import style from "./index.module.css";
import Grid from "@mui/material/Grid";
import { useGetServicesDataQuery } from "../../../store/apis/myServicesApi";
import { Skeleton } from "@mui/material";

const Services = () => {
  const { data, isError, isFetching, isLoading } = useGetServicesDataQuery();
  let content;
  let totalData = [1, 2, 3];
  if (isFetching)
    content = totalData.map((item, i) => (
      <Grid key={i} item xs={12} sm={6} md={4} lg={4}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ width: "300px", height: "200px" }}
        />
      </Grid>
    ));
  else if (isError) content = <div>Error!</div>;
  else {
    content = data.map((item) => {
      return (
        <Grid key={item._id} item xs={12} sm={6} md={4} lg={4}>
          <div className={style.row}>
            <i style={{ fontSize: "44px" }} className={item.icons}></i>
            <h3>
              <span id="color_333">{item.services}</span>
            </h3>
            <p>
              <span id="color_333">
                {" "}
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro
                odit doloribus saepe blanditiis aperiam amet.
              </span>
            </p>
            <p className={style.afterBtn}>
              <i href="" id="color_333" className={style.arrow_icon}>
                Learn more &nbsp;
                <i className="fa-solid fa-arrow-right"></i>
              </i>
            </p>
          </div>
        </Grid>
      );
    });
  }
  return (
    <section id="services">
      <div className={style.container}>
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ width: "200px", height: "50px" }}
          />
        ) : (
          <h2>My Services</h2>
        )}
        <div style={{ paddingTop: "40px" }}>
          <Grid container spacing={7}>
            {content}
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default Services;
