import React from "react";

/**
 * @description Component that contain the stat we want of the user
 */
function CardStats({ text, value, level, children }) {
  return (
    <div className="h-full w-52 bg-white rounded-lg shadow-sm hover:shadow-2xl flex flex-col p-3 justify-around">
      <div className="mb-2">{children}</div>
      <div className=" flex flex-col place-self-start justify-self-end">
        <h2 className="text-neutral400 text-xs mb-2">{text}</h2>
        <h1
          className={` ${
            level ? "text-secondary" : "text-black"
          } text-3xl font-bold `}
        >
          {value}
        </h1>
      </div>
    </div>
  );
}

export default CardStats;
