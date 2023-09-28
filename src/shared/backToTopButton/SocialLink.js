import React from 'react'
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import style from "./index.module.css";
import { useGetContactDAtaQuery } from '../../store/apis/myContactApi';

const SocialLink = () => {
    const { data } = useGetContactDAtaQuery();

    return (
        <>
            {
                data && data.map((item) => (
                    <div key={item._id} className={style.home_hero_social}>
                        <a href={`mailto:${item.email}`} target="_blank" rel="noopener noreferrer" title="Email">
                            <EmailIcon style={{ fontSize: "30px" }} />
                        </a>
                        <a href={item.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                            <GitHubIcon style={{ fontSize: "30px" }} />
                        </a>
                        <a href={item.linkedn} target="_blank" rel="noopener noreferrer" title="Linkedn">
                            <LinkedInIcon style={{ fontSize: "30px" }} />
                        </a>
                        <a href={item.facebook} target="_blank" rel="noopener noreferrer" title="Facebook">
                            <FacebookIcon style={{ fontSize: "30px" }} />
                        </a>
                        <a href={item.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
                            <InstagramIcon style={{ fontSize: "30px" }} />
                        </a>
                    </div>
                ))
            }
        </>
    )
}

export default SocialLink