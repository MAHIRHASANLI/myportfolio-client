import React from 'react'
import style from "../Hero/index.module.css";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { CircularProgress } from "react-cssfx-loading";
import Swal from "sweetalert2";
import { useDeleteProjectDataMutation } from '../../../store/apis/myProject';

const ProjectItem = ({ item, formik, handleOpen,setId ,results}) => {
    const [deleteProjectData, result] = useDeleteProjectDataMutation();
    const handleUpdate = () => {
        handleOpen()
        formik.values.name = item.name;
        formik.values.title = item.title;
        formik.values.webkitURL = item.webkitURL;
        formik.values.image = item.image;
        setId(item._id)
    }
    return (
        <React.Fragment>
            <TableRow >
                <TableCell component="th" scope="row">
                    <img src={item.image} alt="" />
                </TableCell>
                <TableCell component="th" scope="row">
                    {item.name}
                </TableCell>
                <TableCell component="th" scope="row">
                    <div className={style.container}>
                        <span className={style.about}>{item.title}</span>
                    </div>
                </TableCell>
                <TableCell component="th" scope="row">
                    {
                        results.isLoading ? 
                            <CircularProgress
                              style={{ height: "25px", width: "25px" }}
                              color="black"
                            />:<EditIcon onClick={handleUpdate} className={style.svg} sx={{ color: "green" }} />
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
                                        deleteProjectData(item._id)
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

export default ProjectItem