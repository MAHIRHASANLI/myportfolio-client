import React from "react";
import style from "./index.module.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./style.css";

// import required modules
import { Navigation } from "swiper/modules";
import { useGetProjectDataQuery } from "../../../store/apis/myProject";
import { Skeleton } from "@mui/material";

const Project = () => {
  const { data, isError, isFetching, isLoading } = useGetProjectDataQuery();
  let content;
  let totalData = [1, 2, 3];
  if (isFetching)
    content = totalData.map((item, i) => (
      <Skeleton
        key={i}
        variant="rectangular"
        animation="wave"
        sx={{ width: "100%", height: "100px" }}
      />
    ));
  else if (isError) content = <div>Error!</div>;
  else {
    content = data.map((item) => (
      <SwiperSlide
        style={{ borderRadius: "15px", background: "transparent" }}
        key={item._id}
      >
        <div className={style.row}>
          <img src={item.image} alt={item.name} />
          <div className={style.row_item}>
            <span>
              <h5>{item.name}</h5>
              <p>{item.title}</p>
            </span>
            <a
              href={item.webkitURL}
              target="_blank"
              rel="noopener noreferrer"
              title="click me"
            >
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </div>
      </SwiperSlide>
    ));
  }
  return (
    <section id="project">
      <div className={style.container}>
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ width: "200px", height: "50px" }}
          />
        ) : (
          <h2>My Project</h2>
        )}

        <div style={{ paddingTop: "40px" }}>
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={"auto"}
            navigation={true}
            spaceBetween={20}
            autoplay={{
              delay: 4000,
              loop: true,
            }}
            className="mySwiper"
          >
            {content}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Project;
