import React, { useState } from "react";
import style from "./index.module.css";
import Grid from "@mui/material/Grid";
import Form from "./Form";
import Button from "../../../shared/button/Button";
import { useGetContactDAtaQuery } from "../../../store/apis/myContactApi";
import { Skeleton } from "@mui/material";
import myCv from "../../../cv/HasanliMahirCV.pdf"

const Contact = () => {
  const [downLoading, setDownloadLoading] = useState(false);
  const { data, isError, isFetching } = useGetContactDAtaQuery();
  let content;
  if (isFetching)
    content = (
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{ width: "100%", height: "80%" }}
      />
    );
  else if (isError) content = <div>Error!</div>;
  else
    content = data.map((item) => (
      <div key={item._id} className={style.row}>
        <h2>Contact Me</h2>
        <div>
          <i title="email" className="fa-solid fa-envelope"></i>
          <a href={`mailto:${item.email}`} target="_blank" rel="noopener noreferrer" title="email">
            <span>{item.email}</span>
          </a>
        </div>
        <div>
          <i title="phone" className="fa-solid fa-square-phone"></i>
          <a
            href={`tel:${item.phone}`} target="_blank" rel="noopener noreferrer"
            title="phone"
          >
            <span>{item.phone}</span>
          </a>
        </div>

        <a
          href={myCv}
          download="Example-PDF-document"
          target="_blank"
          rel="noreferrer"
          title="download"
        >
          <Button onClick={() => downloadFile()}>
            {" "}
            {downLoading ? (
              "is loaded"
            ) : (
              <>
                <strong> CV</strong>{" "}
                <i
                  className="fa-solid fa-download"
                  style={{ color: "white", fontSize: "20px" }}
                ></i>
              </>
            )}
          </Button>
        </a>
      </div>
    ));

  const downloadFile = () => {
    setDownloadLoading(true);
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = myCv;
      link.setAttribute("download", link);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.remove();

      setDownloadLoading(false);
    }, 1500);
  };
  return (
    <section id="contact">
      <div className={style.container}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5} md={5} lg={5}>
            {content}
          </Grid>
          <Grid item xs={12} sm={7} md={7} lg={7}>
            <Form />
          </Grid>
        </Grid>
      </div>
    </section>
  );
};

export default Contact;
