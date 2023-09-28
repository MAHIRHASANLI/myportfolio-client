import React, { useState } from "react";
import { useGetMessageDataQuery } from "../../../store/apis/meMessageApi";
import { Box, Grid, Skeleton } from "@mui/material";
import style from "./index.module.css";
import Data from "./Data";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/admin/login");
  }, [navigate]);
  const [filterData, setFilterData] = useState([]);
  const { data, isError, isFetching } = useGetMessageDataQuery();
  let content;

  if (isFetching)
    content = (
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: "0",
          left: "0",
        }}
      />
    );
  else if (isError) content = <Box>Error!</Box>;
  else content = data.map((item) => <Data key={item._id} item={item} />);

  const searchMessage = (e) => {
    if (e.target.value)
      setFilterData(
        data.filter((item) =>
          item.email
            .toLowerCase()
            .trim()
            .includes(e.target.value.toLowerCase().trim())
        )
      );
    else setFilterData([]);
  };

  return (
    <Box className={style.containerBox}>
      <Grid
        sx={{
          width: "85%",
        }}
        className={style.containerGrid}
        container
        spacing={6}
      >
        <input
          type="text"
          onChange={searchMessage}
          className={style.searcInput}
          placeholder="Shearch"
        />
        {filterData.map((item) => (
          <Data
            key={item._id}
            item={item}
            color={{ color: "white", backgroundColor: "rgba(120,67,233,0.6)" }}
          />
        ))}
        {content}
      </Grid>
    </Box>
  );
};

export default Dashboard;
