import React from "react";
import { Link } from "react-router-dom";
import HeroImage from "../images/professor.svg";

/**
 * @description Home Page
 */
function Home() {
  return (
    <div className=" flex flex-1 w-full bg-third">
      <div className="flex flex-1 bg-secondary m-7 rounded-3xl">
        <div className="flex flex-1 flex-col gap-5 text-white justify-center items-center">
          <h1 className="text-4xl font-semibold">Welcome on Syntax map</h1>
          <h3 className="text-xl">
            The new application to learn english realy fast
          </h3>
          <p>
            You can now access a course preview by clicking{" "}
            <Link to="/courses">
              <a className="link font-bold text-primary">here</a>
            </Link>
          </p>
          <div className="flex gap-5 items-center">
            <p>If you are ready don't waste any more time !</p>
            <Link to="/login">
              <button className="btn-inline">Get started</button>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center flex-1 bg-primary rounded-r-2xl">
          <img src={HeroImage} height={450} width={450} alt="home professor" />
        </div>
      </div>
    </div>
  );
}

export default Home;
