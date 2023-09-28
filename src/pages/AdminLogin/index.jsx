import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, TextField, Typography } from "@mui/material";
import Button from "../../shared/button/Button";
import { CircularProgress } from "react-cssfx-loading";
import style from "./index.module.css";
import { useSignINMutation } from "../../store/apis/loginApi";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [loginMessage, setLoginMessage] = React.useState("");
  const [signIN, results] = useSignINMutation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(5, "Too Short!")
        .max(20, "Too Long!")
        .trim()
        .strict(true)
        .required("Username required"),
      password: Yup.string()
        .min(5, "Too Short!")
        .max(20, "Too Long!")
        .trim()
        .strict(true)
        .required("Password required"),
    }),
    onSubmit: async (values, actions) => {
      const res = await signIN(values);
      if (res.data.auth && res.data.user.isAdmin) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        setTimeout(() => {
          actions.resetForm();
        }, 1000);
        setLoginMessage("");
        navigate("/admin");
      } else setLoginMessage("False information!");
    },
  });
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      {" "}
      <form onSubmit={formik.handleSubmit} className={style.form}>
        <TextField
          sx={{ width: "100%" }}
          variant="outlined"
          error={
            formik.errors.username && formik.touched.username ? true : false
          }
          size="small"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          name="username"
          label={
            formik.errors.username && formik.touched.username
              ? `${formik.errors.username}`
              : "Username"
          }
        />
        <TextField
          sx={{ width: "100%", marginTop: "20px" }}
          type="password"
          variant="outlined"
          error={
            formik.errors.password && formik.touched.password ? true : false
          }
          size="small"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          name="password"
          label={
            formik.errors.password && formik.touched.password
              ? `${formik.errors.password}`
              : "Password"
          }
        />
        <Typography sx={{ marginTop: "5px", color: "red" }}>
          {loginMessage}
        </Typography>
        <Button>
          {results.isLoading ? (
            <CircularProgress
              style={{ height: "20px", width: "20px" }}
              color="white"
            />
          ) : (
            "Sign IN"
          )}
        </Button>
      </form>
    </Box>
  );
};

export default AdminLogin;
