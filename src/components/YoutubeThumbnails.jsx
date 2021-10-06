import React from "react";
import { FaPlay } from "react-icons/fa";

function YoutubeThumbnails({ name, image, youtubeId }) {
  return (
    <div className="flex flex-col">
      <div className="relative flex rounded-t-xl bg-white">
        <div className="w-64 h-36"></div>
        <img src={image.url} alt="name" className="rounded-t-xl" />
        {/* play button */}
        <div className="absolute -right-5 inset-y-0 grid items-center">
          <a
            href={`https://www.youtube.com/watch?v=${youtubeId.videoId}`}
            className="w-12 h-12 bg-purple-500 rounded-full ring-4 ring-white grid place-items-center hover:bg-purple-400 transition"
          >
            <span className="sr-only">Watch the video</span>
            <FaPlay className="text-white w-4 ml-1" />
          </a>
        </div>
      </div>
      <div className="h-14 w-full bg-secondary rounded-b-xl pt-1 pl-2 pr-2">
        <h2 className=" text-white font-semibold">{name}</h2>
      </div>
    </div>
  );
}

export default YoutubeThumbnails;
