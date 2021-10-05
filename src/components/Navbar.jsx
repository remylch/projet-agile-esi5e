import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo.svg";
import logo from "../images/logo.png";

function Navbar() {
  return (
    <div className="h-16 w-full shadow-sm flex items-center justify-between pl-5 pr-5">
      {/* app title */}
      <img src={logo} width={150} height={50} />
      {/* app navigation */}
      <div className="flex gap-5 list-none">
        <Link to="/">
          <li className="link">Home</li>
        </Link>
        <Link to="/about">
          <li className="link">About</li>
        </Link>
        <Link to="/courses">
          <li className="link">Courses</li>
        </Link>
      </div>
      {/* app connexion */}
      <div>
        <Link to="/login">
          <button className="btn-inline">Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
