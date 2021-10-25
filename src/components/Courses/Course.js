import React from "react";
import { Link } from "react-router-dom";

function Course(props) {
  const { title, text, link } = props.history.location.state;
  return (
    <div className="flex flex-1 flex-col pl-20 pr-20 pt-10 pb-10 gap-10">
      <h3 className="font-bold text-2xl">{title}</h3>
      <p>{text}</p>
      <Link to={`${link}`}>
        <button className="btn-inline">Start the exercise</button>
      </Link>
    </div>
  );
}

export default Course;
