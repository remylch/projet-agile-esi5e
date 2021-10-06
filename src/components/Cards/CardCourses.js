import React from "react";

function CardCourses({ name, level, disable }) {
  return (
    <div
      className={`relative w-52 h-36 flex rounded-xl bg-white items-center justify-center ${
        disable
          ? "cursor-not-allowed opacity-50 "
          : "cursor-pointer opacity-100"
      }`}
    >
      <h4 className="text-lg w-52 text-center">{name}</h4>
      <h4
        className={
          level === "easy"
            ? "text-success absolute bottom-2 right-3"
            : level === "medium"
            ? "text-yellow-500 absolute bottom-2 right-3"
            : level === "hard"
            ? "text-danger absolute bottom-2 right-3"
            : "text-white absolute bottom-2 right-3"
        }
      >
        {level}
      </h4>
    </div>
  );
}

export default CardCourses;
