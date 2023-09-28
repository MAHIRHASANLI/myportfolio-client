import React from "react";
import style from "../Hero/index.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Skeleton } from "@mui/material";
import { useGetContactDAtaQuery } from "../../../store/apis/myContactApi";
import ContactItem from "./ContactItem";
import { useNavigate } from "react-router-dom";
const AdminContactMe = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/admin/login");
  }, [navigate]);
  const { data, isError, isFetching } = useGetContactDAtaQuery();
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
  else content = data.map((item) => <ContactItem key={item._id} item={item} />);
  return (
    <Box className={style.containerBox}>
      <Table sx={{ maxWidth: "80%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell> mydata</TableCell>
            <TableCell>Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{content}</TableBody>
      </Table>
    </Box>
  );
};

export default AdminContactMe;
