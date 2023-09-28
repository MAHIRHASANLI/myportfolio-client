import style from "./index.module.css";
import { useGetHeroDataQuery } from "../../../store/apis/homeHeroApi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Skeleton } from "@mui/material";
import HeroItem from "./HeroItem";
import { useNavigate } from "react-router-dom";
import React from "react";

const AdminHero = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/admin/login");
  }, [navigate]);
  const { data, isError, isFetching } = useGetHeroDataQuery();
  let content;

  if (isFetching)
    content = (
      <TableRow>
        <TableCell>
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
        </TableCell>
      </TableRow>
    );
  else if (isError)
    content = (
      <TableRow>
        <TableCell>
          <Box>Error!</Box>
        </TableCell>
      </TableRow>
    );
  else content = data.map((item) => <HeroItem key={item._id} item={item} />);

  return (
    <Box className={style.containerBox}>
      <Table sx={{ maxWidth: "80%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>SurName</TableCell>
            <TableCell> Profession</TableCell>
            <TableCell>Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{content}</TableBody>
      </Table>
    </Box>
  );
};

export default AdminHero;
