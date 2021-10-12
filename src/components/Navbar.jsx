import React from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../images/logo.png";
import { auth } from "../firebase";
import Avatar from "./Avatar";
import { toast } from "react-toastify";

function Navbar({ user }) {
  const history = useHistory();

  const logout = () => {
    auth
      .signOut()
      .then((res) => {
        console.log(res);
        history.push("/");
      })
      .catch((e) => console.log(e.message));
    toast.info("You are now logged out");
  };

  console.log(user);

  return (
    <div className="h-16 w-full shadow-sm flex items-center justify-between pl-5 pr-5">
      {/* app title */}
      <img src={logo} width={150} height={50} alt="Logo Syntax map" />
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
        {user ? (
          <div className="flex items-center gap-3">
            <Avatar url={user.photoURL !== null ? user.photoURL : null} />
            <Link to="/profile">
              <div className="py-2 px-3 hover:shadow-md cursor-pointer rounded-md">
                <h5>
                  {user.displayName !== null ? user.displayName : user.email}
                </h5>
              </div>
            </Link>
            <button className="btn-outline" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="btn-inline">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
