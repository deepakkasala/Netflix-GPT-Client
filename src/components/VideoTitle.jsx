import React from "react";
import { IoIosPlay } from "react-icons/io";
import { AiOutlineInfoCircle } from "react-icons/ai";
const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full text-white flex flex-col justify-center px-12 z-10 bg-gradient-to-r from-black/70 to-transparent">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/2 text-gray-200">{overview}</p>

      <div className="flex gap-3">
        <button className="bg-white hover:bg-gray-300/70 text-black p-1 px-6 flex items-center gap-1 w-40 py-1 rounded hover:cursor-pointer">
          <span className="text-5xl">
            <IoIosPlay />
          </span>
          <span className="text-xl font-bold">Play</span>
        </button>

        <button className="bg-gray-500/80 hover:bg-gray-500/40 flex items-center gap-3 px-8 p-2 rounded text-white cursor-pointer">
          <span className="text-4xl">
            <AiOutlineInfoCircle />
          </span>
          <span className="font-semibold text-xl">More Info</span>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
