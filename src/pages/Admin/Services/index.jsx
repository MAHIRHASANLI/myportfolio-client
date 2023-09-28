import React from "react";
import style from "../Hero/index.module.css";
import ServicesItem from "./ServicesItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Skeleton, TextField } from "@mui/material";
import { CircularProgress } from "react-cssfx-loading";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useFormik } from "formik";
import UpdateDataModal from "../../../shared/modal/Modal";
import {
  useGetServicesDataQuery,
  usePostServicesDataMutation,
  useUpdateServicesDataMutation,
} from "../../../store/apis/myServicesApi";
import { myServicesValidation } from "./myServices.validation";
import { useNavigate } from "react-router-dom";
const AdminServices = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/admin/login");
  }, [navigate]);
  const { data, isError, isFetching } = useGetServicesDataQuery();
  console.log(data);
  const [updateServicesData, result] = useUpdateServicesDataMutation();
  const [postServicesData, results] = usePostServicesDataMutation();
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const handleOpen = () => setOpen(!open);
  // Formikk

  const formik = useFormik({
    initialValues: {
      icons: "",
      services: "",
    },
    validationSchema: myServicesValidation,
    onSubmit: async (values, actions) => {
      handleOpen();
      try {
        const newObj = {
          icons: values.icons,
          services: values.services,
        };
        if (
          formik.initialValues.icons === "" ||
          formik.initialValues.services === ""
        ) {
          postServicesData(newObj);
          actions.resetForm();
          console.log("Post olundu");
        } else {
          updateServicesData({ values: newObj, id });
          actions.resetForm();
          console.log("Update olundu");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
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
  else if (isError) {
    content = (
      <TableRow>
        <TableCell>
          <Box>Error!</Box>
        </TableCell>
      </TableRow>
    );
  } else {
    content = data.map((item) => (
      <ServicesItem
        key={item._id}
        item={item}
        results={result}
        handleOpen={handleOpen}
        formik={formik}
        setId={setId}
      />
    ));
  }

  const madalItem = (
    <>
      <TextField
        error={formik.errors.icons && formik.touched.icons ? true : false}
        size="small"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.icons}
        name="icons"
        sx={{ width: "100%", marginBottom: "20px" }}
        label={
          formik.errors.icons && formik.touched.icons
            ? `${formik.errors.icons}`
            : "Icon"
        }
      />

      <TextField
        error={formik.errors.services && formik.touched.services ? true : false}
        size="small"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.services}
        name="services"
        sx={{ width: "100%", marginBottom: "20px" }}
        label={
          formik.errors.services && formik.touched.services
            ? `${formik.errors.services}`
            : "Services"
        }
      />
    </>
  );

  return (
    <Box className={style.containerBox}>
      <h1>
        Data-Services{" "}
        <Button
          onClick={handleOpen}
          variant="outlined"
          startIcon={<AddShoppingCartIcon />}
        >
          {results.isLoading ? (
            <CircularProgress
              style={{ height: "25px", width: "25px" }}
              color="black"
            />
          ) : (
            "Add Skill"
          )}
        </Button>{" "}
      </h1>
      <Table sx={{ maxWidth: "80%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Icon</TableCell>
            <TableCell>Services</TableCell>
            <TableCell>Update</TableCell>
            <TableCell>Delet</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{content}</TableBody>
      </Table>
      <UpdateDataModal
        formik={formik}
        madalItem={madalItem}
        open={open}
        handleOpen={handleOpen}
        results={results}
      />
    </Box>
  );
};

export default AdminServices;
