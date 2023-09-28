import React from 'react'
import style from "../../Hero/index.module.css";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { DeleteSkills } from '../../../../store/apis/skills.requests';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";

const SkillItem = ({ item, dataAbout, setDataAbout }) => {
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
                    {item.category}
                </TableCell>
                <TableCell component="th" scope="row">
                    <div className={style.container}>
                        <span className={style.about}>{item.about}</span>
                    </div>
                </TableCell>
                <TableCell component="th" scope="row">
                    <DeleteIcon
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
                                    DeleteSkills(item._id)
                                    setDataAbout(dataAbout.filter((m) => m._id !== item._id));
                                    Swal.fire("Deleted!", "Your file has been deleted.", "success");
                                }
                            });

                        }}
                    />
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export default SkillItem