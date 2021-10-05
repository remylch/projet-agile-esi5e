import React from "react";

function Navbar() {
  return (
    <div className="h-16 w-full shadow-sm flex items-center justify-between pl-5 pr-5">
      {/* app title */}
      <h2>SYNTAX MAP</h2>
      {/* app navigation */}
      <div className="flex gap-5 list-none">
        <li className="link">Home</li>
        <li className="link">About</li>
      </div>
      {/* app connexion */}
      <div>
        <button className="btn-inline">Login</button>
      </div>
    </div>
  );
}

export default Navbar;
