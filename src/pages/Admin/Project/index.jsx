import React from "react";
import style from "../Hero/index.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Skeleton, TextField } from "@mui/material";
import { CircularProgress } from "react-cssfx-loading";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useFormik } from "formik";
import {
  useGetProjectDataQuery,
  usePostProjectDataMutation,
  useUpdateProjectDataMutation,
} from "../../../store/apis/myProject";
import axios from "axios";
import UpdateDataModal from "../../../shared/modal/Modal";
import { myProjectValidation } from "./myProject.validation";
import ProjectItem from "./ProjectItem";
import { useNavigate } from "react-router-dom";

const AdminProject = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/admin/login");
  }, [navigate]);
  const [updateProjectData, result] = useUpdateProjectDataMutation();
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const handleOpen = () => setOpen(!open);
  // Formikk

  const formik = useFormik({
    initialValues: {
      name: "",
      title: "",
      webkitURL: "",
      image: "",
    },
    validationSchema: myProjectValidation,
    onSubmit: async (values,actions) => {
      handleOpen();
      const formData = new FormData();
      try {
        formData.append("file", values.image);
        formData.append("upload_preset", "ex66068y");
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dbb6ug7f5/image/upload",
          formData
        );
        const newObj = {
          name: values.name,
          title: values.title,
          webkitURL: values.webkitURL,
          image: res.data.secure_url,
        };
        if (
          formik.initialValues.name === "" ||
          formik.initialValues.image === "" ||
          formik.initialValues.webkitURL === "" ||
          formik.initialValues.title === ""
        ) {
          postProjectData(newObj);
          actions.resetForm();
          console.log("Post olundu");
        } else {
          updateProjectData({ values: newObj, id });
          actions.resetForm();
          console.log("Update olundu");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  const [postProjectData, results] = usePostProjectDataMutation();
  const { data, isError, isFetching } = useGetProjectDataQuery();

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
  else
    content = data.map((item, i) => (
      <ProjectItem
        key={i}
        item={item}
        results={result}
        handleOpen={handleOpen}
        formik={formik}
        setId={setId}
      />
    ));

  const madalItem = (
    <>
      <TextField
        error={formik.errors.name && formik.touched.name ? true : false}
        size="small"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        name="name"
        sx={{ width: "100%", marginBottom: "20px" }}
        label={
          formik.errors.name && formik.touched.name
            ? `${formik.errors.name}`
            : "Name"
        }
      />

      <TextField
        error={formik.errors.title && formik.touched.title ? true : false}
        size="small"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
        name="title"
        sx={{ width: "100%", marginBottom: "20px" }}
        label={
          formik.errors.title && formik.touched.title
            ? `${formik.errors.title}`
            : "Title"
        }
      />
      <TextField
        error={
          formik.errors.webkitURL && formik.touched.webkitURL ? true : false
        }
        size="small"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.webkitURL}
        name="webkitURL"
        sx={{ width: "100%", marginBottom: "20px" }}
        label={
          formik.errors.webkitURL && formik.touched.webkitURL
            ? `${formik.errors.webkitURL}`
            : "Webkit URL"
        }
      />
      <TextField
        error={formik.errors.image && formik.touched.image ? true : false}
        size="small"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.image}
        name="image"
        sx={{ width: "100%", marginBottom: "20px" }}
        label={
          formik.errors.image && formik.touched.image
            ? `${formik.errors.image}`
            : "Image"
        }
      />
    </>
  );
  return (
    <Box className={style.containerBox}>
      <h1>
        Data-Project{" "}
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
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Title</TableCell>
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

export default AdminProject;
