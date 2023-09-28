import React from "react";
import { Box, Button, Modal} from "@mui/material";
import style from "./index.module.css";

const UpdateDataModal = ({ madalItem, formik, open, handleOpen }) => {
  return (
    <Modal open={open}>
      <form onSubmit={formik.handleSubmit} className={style.modal}>
        {madalItem}
        <Box sx={{ textAlign: "center" }}>
          <Button type="submit" variant="outlined">
            Update
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button variant="outlined" color="error" onClick={handleOpen}>
            Back
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default UpdateDataModal;
