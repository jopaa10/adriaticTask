import { Link } from "react-router-dom";
import "./navbar.scss";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to={"/"}>Home</Link>
    </nav>
  );
};
