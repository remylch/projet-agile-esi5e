import React from "react";
import { FaPlay } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { setIsOpenModalExercice } from "../../store/appSlice";

function CardCourses({ name, level, disable }) {
  const startExercice = () => {
    console.log("starting exercice");
  };

  const dispatch = useDispatch();

  const handleModalExercice = () => {
    dispatch(setIsOpenModalExercice());
  };

  return (
    <div
      className={`relative w-52 h-36 flex rounded-xl bg-white items-center justify-center ${
        disable ? "cursor-not-allowed opacity-50 " : "opacity-100 px-7"
      }`}
      onClick={!disable ? startExercice : undefined}
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
      {/* start button */}
      {!disable && (
        <div className="absolute -right-5 inset-y-0 grid items-center">
          <div
            className="w-12 h-12 bg-purple-500 rounded-full ring-4 ring-white grid place-items-center hover:bg-purple-400 transition"
            onClick={handleModalExercice}
          >
            <span className="sr-only">Watch the video</span>
            <FaPlay className="text-white w-4 ml-1" />
          </div>
        </div>
      )}
    </div>
  );
}

export default CardCourses;
