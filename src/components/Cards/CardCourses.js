import React from "react";
import { FaPlay } from "react-icons/fa";
import { useDispatch } from "react-redux";

import {
  setDataCurrentExercise,
  setIsOpenModalExercice,
} from "../../store/appSlice";

function CardCourses({ name, level, disable, data, type, xp }) {
  const startExercice = () => {
    console.log("starting exercice");
  };

  const dispatch = useDispatch();

  const handleModalExercice = () => {
    //dispatch data into current exercise state
    dispatch(setDataCurrentExercise(data));
    //dispatch state of the modal exercise => open
    dispatch(setIsOpenModalExercice());
  };

  return (
    <div
      className={`relative w-52 h-36 flex rounded-xl bg-white items-center justify-center ${
        disable ? "cursor-not-allowed opacity-50 " : "opacity-100 px-7"
      }`}
      onClick={!disable ? startExercice : undefined}
    >
      <h4 className="text-primary font-thin text-xs absolute right-3 top-2 capitalize">
        {xp} xp
      </h4>
      <h4 className="text-lg w-52 text-center">{name}</h4>
      <h4
        className={
          level === "Easy"
            ? "text-success absolute bottom-2 right-3"
            : level === "Medium"
            ? "text-yellow-500 absolute bottom-2 right-3"
            : level === "Hard"
            ? "text-danger absolute bottom-2 right-3"
            : "text-white absolute bottom-2 right-3"
        }
      >
        {level}
      </h4>
      {/* Duration */}
      <h5 className="absolute text-fourth bottom-2 left-3 uppercase">{type}</h5>
      {/* start button */}
      {!disable && (
        <div className="absolute -right-5 inset-y-0 grid items-center cursor-pointer">
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
