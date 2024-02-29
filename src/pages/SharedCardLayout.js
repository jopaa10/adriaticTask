import { Outlet } from "react-router";
import { Navbar } from "../components/navbar/Navbar";
import "./cardLayout.scss";
import Footer from "../components/footer/Footer";

export function CardLayout() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
