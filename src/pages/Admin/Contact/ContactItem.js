import React from 'react'
import style from "../Hero/index.module.css";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useFormik } from 'formik';
import { CircularProgress } from 'react-cssfx-loading';
import UpdateDataModal from '../../../shared/modal/Modal';
import { usePutContactDataMutation } from '../../../store/apis/myContactApi';
import { myContactValidation } from './myContact.validation';
import FormContact from './Form';

const ContactItem = ({ item }) => {
    const [putContactData, results] = usePutContactDataMutation();
    const [detail, setDetail] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    const formik = useFormik({
        initialValues: {
            phone: "",
            email: "",
            facebook: "",
            linkedn: "",
            github: "",
            instagram: "",
            mydata: "",
        },
        validationSchema: myContactValidation,
        onSubmit: async (values) => {
            handleOpen();
            try {
                const newObj = {
                    values,
                    id: detail._id,
                };
                putContactData(newObj);
            } catch (error) {
                console.log(error);
            }
        },
    });
    const handleUpdate = () => {
        setDetail(item);
        handleOpen();
        formik.values.phone = item.phone;
        formik.values.email = item.email;
        formik.values.facebook = item.facebook;
        formik.values.linkedn = item.linkedn;
        formik.values.github = item.github;
        formik.values.instagram = item.instagram;
        formik.values.mydata = item.mydata;
    }
    return (
        <React.Fragment>
            <TableRow >
                <TableCell component="th" scope="row">
                    {item.email}
                </TableCell>
                <TableCell component="th" scope="row">
                    <div className={style.container}>
                        <p className={style.profession}>{item.phone}</p>
                    </div>

                </TableCell>
                <TableCell component="th" scope="row">
                    <div className={style.container}>
                        <p className={style.profession}>{item.mydata}</p>
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
                            onClick={handleUpdate}
                        />
                    )}
                </TableCell>
            </TableRow>
            <UpdateDataModal madalItem={<FormContact formik={formik} />} formik={formik} open={open} handleOpen={handleOpen} />
        </React.Fragment>
    )
}

export default ContactItem