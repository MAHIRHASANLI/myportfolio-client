import React from "react";
import AdminDetailAbout from "./myAbout/MyAbout";
import AdminSkills from "./Skills/MySkill";
import { useNavigate } from "react-router-dom";

const AdminAbout = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/admin/login");
  }, [navigate]);
  return (
    <React.Fragment>
      <AdminDetailAbout />
      <AdminSkills />
    </React.Fragment>
  );
};

export default AdminAbout;
