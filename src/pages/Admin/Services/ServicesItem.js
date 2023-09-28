import React from 'react'
import style from "../Hero/index.module.css";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { CircularProgress } from "react-cssfx-loading";
import Swal from "sweetalert2";
import { useDeleteServicesDataMutation } from '../../../store/apis/myServicesApi';

const ServicesItem = ({ item, formik, handleOpen, setId, results }) => {
    const [deleteServicesData, result] = useDeleteServicesDataMutation();
    const handleUpdate = () => {
        formik.values.icons = item.icons;
        formik.values.services = item.services;
        handleOpen()
        setId(item._id)
    }
    return (
        <React.Fragment>
            <TableRow >
                <TableCell component="th" scope="row">
                    <i className={item.icons}></i>
                </TableCell>
                <TableCell component="th" scope="row">
                    {item.services}
                </TableCell>
                <TableCell component="th" scope="row">
                    {
                        results.isLoading ?
                            <CircularProgress
                                style={{ height: "25px", width: "25px" }}
                                color="black"
                            /> : <EditIcon onClick={handleUpdate} className={style.svg} sx={{ color: "green" }} />
                    }

                </TableCell>
                <TableCell component="th" scope="row">
                    {
                        result.isLoading ? (<CircularProgress
                            style={{ height: "25px", width: "25px" }}
                            color="black"
                        />) : (<DeleteIcon
                            className={style.svg}
                            onClick={() => {
                                Swal.fire({
                                    title: "Are you sure?",
                                    text: "You won't be able to revert this!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes, delete it!",
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        deleteServicesData(item._id)
                                        Swal.fire("Deleted!", "Your file has been deleted.", "success");
                                    }
                                });

                            }}
                        />)
                    }
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export default ServicesItem