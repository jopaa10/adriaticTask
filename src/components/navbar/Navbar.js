import { Link } from "react-router-dom";
import "./navbar.scss";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <p className="logo">Accommodation</p>
      <Link to={"/"}>Home</Link>
    </nav>
  );
};
