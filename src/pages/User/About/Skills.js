import React, { useEffect, useState } from 'react'
import { Grid, Skeleton } from "@mui/material";
import style from "./index.module.css";
import { GetAllSkills } from "../../../store/apis/skills.requests";

const Skills = () => {
    const [about, setAbout] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        GetAllSkills("skills").then((res) => setAbout(res));
        setTimeout(() => {
            setLoading(false)
        }, 0)
    }, []);
    function handleClick(e) {
        GetAllSkills(e.target.value).then((res) => setAbout(res));
    }

    var aa = document.getElementById("aa");
    const btnsElement = document.querySelectorAll(".btn");
    btnsElement.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (aa.className.includes("button")) {
                aa.classList.remove("button");
            }
            document.querySelector(".button")?.classList.remove("button");
            btn.classList.add("button");
        });
    });

    return (
        <div className={style.row}>
            <div style={{ paddingBottom: "20px" }}>
                <button
                    id="aa"
                    onClick={(e) => handleClick(e)}
                    className="btn button"
                    value="skills"
                >
                    Skills
                </button>
                <button
                    onClick={(e) => handleClick(e)}
                    className="btn"
                    value="experience"
                >
                    Experience
                </button>
                <button
                    onClick={(e) => handleClick(e)}
                    className="btn"
                    value="education"
                >
                    Education
                </button>
            </div>

            <Grid container spacing={1}>
                {about &&
                    about.map((item) => {
                        return (
                            <Grid key={item._id} item xs={6} sm={4} md={4} lg={4}>
                                {loading ? (<Skeleton variant="rectangular" sx={{ width: "100%", height: "50px" }} />) : (<div className={style.row_item}>
                                    <img src={item.image} alt={item.name} title={item.name} />
                                    <div>
                                        <i>{item.about}</i>
                                        <p style={{ color: "#333" }}>{item.name}</p>
                                    </div>
                                </div>)}
                            </Grid>
                        );
                    })}
            </Grid>
        </div>
    )
}

export default Skills