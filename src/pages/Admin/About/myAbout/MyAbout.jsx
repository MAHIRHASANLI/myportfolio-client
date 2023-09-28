import React from "react";
import style from "../../Hero/index.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Skeleton } from "@mui/material";
import { useGetMyAboutDataQuery } from "../../../../store/apis/myAboutApi";
import AboutItem from "./AboutItem";

const AdminDetailAbout = () => {
  const { data, isError, isFetching } = useGetMyAboutDataQuery();
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
  else content = data.map((item) => <AboutItem key={item._id} item={item} />);

  return (
    <Box className={style.containerBox}>
      <h1>Data-About </h1>
      <Table sx={{ maxWidth: "80%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell> Profession</TableCell>
            <TableCell>Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{content}</TableBody>
      </Table>
    </Box>
  );
};

export default AdminDetailAbout;
