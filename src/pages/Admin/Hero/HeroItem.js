import React from 'react'
import style from "./index.module.css";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
// import UpdateDataModal from './Modal';
import { useFormik } from 'formik';
import { HeroValidation } from './hero.validation';
import { useUpdateHeroDataMutation } from '../../../store/apis/homeHeroApi';
import axios from 'axios';
import { CircularProgress } from 'react-cssfx-loading';
import { TextField } from '@mui/material';
import UpdateDataModal from '../../../shared/modal/Modal';

const HeroItem = ({ item }) => {
    const [updateHeroData, results] = useUpdateHeroDataMutation();
    const [detail, setDetail] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            profession: "",
            image: "",
        },
        validationSchema: HeroValidation,
        onSubmit: async (values) => {
            handleOpen();
            const formData = new FormData();
            try {
                if (values.image === detail.image) {
                    const newObj = {
                        values,
                        id: detail._id,
                    };
                    updateHeroData(newObj);
                } else {
                    formData.append("file", values.image);
                    formData.append("upload_preset", "ex66068y");
                    const res = await axios.post(
                        "https://api.cloudinary.com/v1_1/dbb6ug7f5/image/upload",
                        formData
                    );
                    const newObj = {
                        name: values.name,
                        surname: values.surname,
                        profession: values.profession,
                        image: res.data.secure_url,
                    };
                    updateHeroData({ values: newObj, id: detail._id });
                }
            } catch (error) {
                console.log(error);
            }
        },
    });

    const madalItem = (<> <TextField
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
            error={formik.errors.surname && formik.touched.surname ? true : false}
            size="small"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.surname}
            name="surname"
            sx={{ width: "100%", marginBottom: "20px" }}
            label={formik.errors.surname && formik.touched.surname ? (`${formik.errors.surname}`) : ("SurName")}
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
        <TextField
            error={formik.errors.image && formik.touched.image ? true : false}
            size="small"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.image}
            name="image"
            sx={{ width: "100%", marginBottom: "20px" }}
            label={formik.errors.image && formik.touched.image ? (`${formik.errors.image}`) : ("Image")}
        /></>)

    return (
        <React.Fragment>
            <TableRow >
                <TableCell component="th" scope="row">
                    {item.name}
                </TableCell>
                <TableCell component="th" scope="row">
                    {item.surname}
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
                            disableshrink="true"
                        />
                    ) : (
                        <ModeEditIcon
                            className={style.svg}
                            onClick={() => {
                                setDetail(item);
                                handleOpen();
                                formik.values.name = item.name;
                                formik.values.surname = item.surname;
                                formik.values.profession = item.profession;
                                formik.values.image = item.image;
                            }}
                        />
                    )}
                </TableCell>
            </TableRow>
            <UpdateDataModal madalItem={madalItem} formik={formik} open={open} handleOpen={handleOpen} />
        </React.Fragment>
    )
}

export default HeroItem