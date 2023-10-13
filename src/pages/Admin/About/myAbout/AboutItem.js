import React from 'react'
import style from "../../Hero/index.module.css";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useFormik } from 'formik';
import axios from 'axios';
import { CircularProgress } from 'react-cssfx-loading';
import { myAboutValidation } from './myAbout.validation';
import { useUpdateMyAboutDataMutation } from '../../../../store/apis/myAboutApi';
import { Fab, TextField } from '@mui/material';
import UpdateDataModal from '../../../../shared/modal/Modal';

const AboutItem = ({ item }) => {
    const [updateMyAboutData, results] = useUpdateMyAboutDataMutation();
    const [detail, setDetail] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    const formik = useFormik({
        initialValues: {
            name: "",
            profession: "",
            image: "",
        },
        validationSchema: myAboutValidation,
        onSubmit: async (values) => {
            handleOpen();
            const formData = new FormData();
            try {
                if (values.image === detail.image) {
                    const newObj = {
                        values,
                        id: detail._id,
                    };
                    updateMyAboutData(newObj);
                } else {
                    formData.append("file", values.image);
                    formData.append("upload_preset", "ex66068y");
                    const res = await axios.post(
                        "https://api.cloudinary.com/v1_1/dbb6ug7f5/image/upload",
                        formData
                    );
                    const newObj = {
                        name: values.name,
                        profession: values.profession,
                        image: res.data.secure_url,
                    };
                    updateMyAboutData({ values: newObj, id: detail._id });
                }
            } catch (error) {
                console.log(error);
            }
        },
    });

    const madalItem = (<>  <TextField
        error={formik.errors.name && formik.touched.name ? true : false}
        size="small"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        name="name"
        sx={{ width: "100%", marginBottom: "20px" }}
        label={formik.errors.name && formik.touched.name ? (`${formik.errors.name}`) : ("Name")}
    />
        <TextField
            error={formik.errors.profession && formik.touched.profession ? true : false}
            size="small"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.profession}
            name="profession"
            sx={{ width: "100%", marginBottom: "20px" }}
            label={formik.errors.profession && formik.touched.profession ? (`${formik.errors.profession}`) : ("Profession")}
        />
        <label className="file_img" htmlFor="upload-photo">
            <input
                style={{ display: "none" }}
                id="upload-photo"
                name="image"
                type="file"
                onChange={(e) =>
                    formik.setFieldValue("image", e.target.files[0])
                }
            />

            <Fab
                color="info"
                size="small"
                component="span"
                aria-label="add"
                variant="extended"
                style={{ marginTop: "10px" }}
            >
                {formik.errors.image && formik.touched.image ? (
                    <span style={{ color: "red", fontSize: "14px" }}>
                        {formik.errors.image}
                    </span>
                ) : (
                    <span style={{ color: "white", fontSize: "14px" }}>
                        + Upload Photo
                    </span>
                )}
            </Fab>
        </label></>)
    return (
        <React.Fragment>
            <TableRow >
                <TableCell component="th" scope="row">
                    <img style={{ width: "60%", height: "100%" }} src={item.image} alt="" />
                </TableCell>
                <TableCell component="th" scope="row">
                    {item.name}
                </TableCell>
                <TableCell component="th" scope="row">
                    <div className={style.container}>
                        <p className={style.profession}>{item.profession}</p>
                    </div>
                </TableCell>
                <TableCell component="th" scope="row">
                    {results.isLoading ? (
                        <CircularProgress
                            style={{ height: "20px", width: "20px", }}
                            color="black"
                        />
                    ) : (
                        <ModeEditIcon
                            className={style.svg}
                            onClick={() => {
                                setDetail(item);
                                handleOpen();
                                formik.values.name = item.name;
                                formik.values.profession = item.profession;
                                formik.values.image = item.image;
                            }}
                        />
                    )}
                </TableCell>
            </TableRow>
            <UpdateDataModal madalItem={madalItem} formik={formik} open={open} handleOpen={handleOpen} />
        </React.Fragment>)
}

export default AboutItem