import React, { useEffect, useState } from "react";
import style from "../../Hero/index.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
} from "@mui/material";
import { CircularProgress } from "react-cssfx-loading";
import SkillItem from "./SkillItem";
import {
  GetAllSkills,
  PostSkills,
} from "../../../../store/apis/skills.requests";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import UpdateDataModal from "../../../../shared/modal/Modal";
import { mySkillsValidation } from "./skills.validation";
import { useFormik } from "formik";
import axios from "axios";

const AdminSkills = () => {
  const [dataAbout, setDataAbout] = useState([]);
  const [categoryValue, setCategoryValue] = useState("skills");
  const [getLoading, setGetLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(false);
  useEffect(() => {
    GetAllSkills(categoryValue).then((res) => setDataAbout(res));
    setTimeout(() => {
      setGetLoading(false);
    }, 1000);
  }, [categoryValue]);
  let content;

  if (getLoading)
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
  else
    content = dataAbout.map((item, i) => (
      <SkillItem
        key={i}
        item={item}
        setDataAbout={setDataAbout}
        dataAbout={dataAbout}
      />
    ));

  // Formikk
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const formik = useFormik({
    initialValues: {
      name: "",
      about: "",
      category: "",
      image: "",
    },
    validationSchema: mySkillsValidation,
    onSubmit: async (values) => {
      setPostLoading(true);
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
          about: values.about,
          category: values.category,
          image: res.data.secure_url,
        };
        PostSkills(newObj);
        setDataAbout([...dataAbout, newObj]);
        setTimeout(() => {
          setPostLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const madalItem = (
    <>
      <InputLabel id="demo-simple-select-label">
        {formik.errors.category && formik.touched.category ? (
          <Box sx={{ color: "red" }}>{formik.errors.category}</Box>
        ) : (
          "Category"
        )}
      </InputLabel>
      <Select
        name="category"
        size="small"
        sx={{ width: "100%", marginBottom: "20px" }}
        error={formik.errors.category && formik.touched.category ? true : false}
        value={formik.values.category}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        label={
          formik.errors.category && formik.touched.category
            ? `${formik.errors.category}`
            : "Category"
        }
      >
        <MenuItem value="skills">Skills</MenuItem>
        <MenuItem value="experience">Experience</MenuItem>
        <MenuItem value="education">Education</MenuItem>
      </Select>
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
        error={formik.errors.about && formik.touched.about ? true : false}
        size="small"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.about}
        name="about"
        sx={{ width: "100%", marginBottom: "20px" }}
        label={
          formik.errors.about && formik.touched.about
            ? `${formik.errors.about}`
            : "About"
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
        Data-Skills{" "}
        <Button
          onClick={handleOpen}
          variant="outlined"
          startIcon={<AddShoppingCartIcon />}
        >
          {postLoading ? (
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
            <TableCell>
              <Select
                size="small"
                value={categoryValue}
                onChange={(e) => setCategoryValue(e.target.value)}
              >
                <MenuItem value="skills">Skills</MenuItem>
                <MenuItem value="experience">Experience</MenuItem>
                <MenuItem value="education">Education</MenuItem>
              </Select>
            </TableCell>
            <TableCell>About</TableCell>
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
      />
    </Box>
  );
};

export default AdminSkills;
