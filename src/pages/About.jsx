import React from "react";
import {
  HiOutlineMail,
  HiPhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { VscDebugStart } from "react-icons/vsc";
import Card from "../components/Card";

function About() {
  return (
    <div className="flex-1 bg-primary pl-20 pr-20 pt-10 pb-10">
      {/*  contact */}
      <h2 className="text-white font-bold text-center text-3xl mb-8">
        Contact
      </h2>
      <div className="flex flex-col mb-16">
        <div className="flex justify-center gap-40">
          <h6 className="flex items-center gap-2">
            <VscDebugStart />
            founded in October, 2021
          </h6>
          <h6 className="flex items-center gap-2">
            <HiOutlineLocationMarker />
            Evry, France
          </h6>
        </div>
        <br />
        <div className="flex justify-center gap-44">
          <div className="flex items-center gap-2">
            <HiPhone />
            06 06 06 06 06
          </div>
          <div className="flex items-center gap-2">
            <HiOutlineMail />
            syntaxmap@mail.com
          </div>
        </div>
      </div>
      {/*  the team */}
      <div>
        <h2 className="text-white font-bold text-center text-3xl mb-11">
          Team member
        </h2>
        {/* grid of member */}
        <div className="flex flex-wrap w-full gap-10">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
}

export default About;
