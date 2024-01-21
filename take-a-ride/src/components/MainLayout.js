import { Outlet } from "react-router-dom";
import Menu from "./menu/Menu";
import Footer from "./footer/Footer";

const MainLayout = () => {
  return (
    <>
      <Menu />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
