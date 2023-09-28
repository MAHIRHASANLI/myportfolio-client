import AdminAbout from "../pages/Admin/About";
import AdminRoot from "../pages/Admin/AdminRoot";
import AdminContactMe from "../pages/Admin/Contact";
import Dashboard from "../pages/Admin/Dashboard";
import AdminHero from "../pages/Admin/Hero";
import AdminProject from "../pages/Admin/Project";
import AdminServices from "../pages/Admin/Services";
import AdminLogin from "../pages/AdminLogin";
import MainRoot from "../pages/User/MainRoot";

export const ROUTES = [
  {
    path: "",
    element: <MainRoot />,
  },
  {
    path: "/admin",
    element: <AdminRoot />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "hero",
        element: <AdminHero />,
      },
      {
        path: "project",
        element: <AdminProject />,
      },
      {
        path: "services",
        element: <AdminServices />,
      },
      {
        path: "about",
        element: <AdminAbout />,
      },
      {
        path: "contact",
        element: <AdminContactMe />,
      },
      {
        path: "login",
        element: <AdminLogin />,
      },
    ],
  },
];
