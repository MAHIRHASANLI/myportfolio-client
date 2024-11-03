import * as React from "react";
import Grid from "@mui/material/Grid";
import style from "./index.module.css";
import { useState } from "react";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import Skills from "./Skills";
import PhotoModal from "./PhotoModal";
import { useGetMyAboutDataQuery } from "../../../store/apis/myAboutApi";
import { Skeleton } from "@mui/material";

const About = () => {
  const [file, setFile] = useState(null);
  const { data, isError, isFetching } = useGetMyAboutDataQuery();
  let content;
  let totalData = [1, 2];
  if (isFetching)
    content = totalData.map((item, i) => (
      <Grid key={i} item xs={12} sm={6} md={6} lg={6}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ width: "40vw", height: "50vh" }}
        />
      </Grid>
    ));
  else if (isError) content = <div>Error!</div>;
  else
    content = data.map((item, i) => {
      return (
        <Grid key={item._id} container spacing={3}>
          <Grid item xs={12} sm={6} md={5} lg={5}>
            <div className={style.lightbox_img}>
              <img src={item.image} alt={item.name} title="Mahir Hasanli" />
              <span onClick={() => setFile(item)}>
                <TouchAppIcon style={{ fontSize: "50px" }} />
              </span>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={7} lg={7}>
            <div className={style.col_7}>
              <h3 className={style.col_h3}>{item.name}</h3>
              <p className={style.col_p}>{item.profession}</p>
              {/* SkillsEducation */}
              <Skills />
            </div>
          </Grid>
        </Grid>
      );
    });

  return (
    <section id="skills" className={style.scilss}>
      <div className={style.container}>
        <Grid container>{content} </Grid>
        {/* PhotoModal */}
        <PhotoModal file={file} setFile={setFile} />
      </div>
    </section>
  );
};

export default About;
