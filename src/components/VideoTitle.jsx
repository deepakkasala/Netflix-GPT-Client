import React from "react";
import { IoIosPlay } from "react-icons/io";
import { AiOutlineInfoCircle } from "react-icons/ai";
const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full text-white flex flex-col justify-center px-4 sm:px-6 md:px-12 z-10 bg-gradient-to-r from-black/80 to-transparent">
      <h1 className="text-md md:text-xl lg:text-3xl xl:text-3xl font-bold leading-snug">
        {/* //text-xl sm:text-lg md:text-2xl lg:text-3xl */}
        {title}
      </h1>
      <p className="py-4 sm:py-6 text-xs sm:text-base md:text-sm lg:text-md xl:text-lg max-w-xl md:max-w-2xl text-gray-200">
        {/* text-sm sm:text-base md:text-md lg:text-lg */}
        {overview}
      </p>

      <div className="flex flex-wrap gap-3 mt-2">
        <button className="bg-white hover:bg-gray-300/70 text-black flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-md hover:cursor-pointer">
          <span className="text-2xl sm:text-3xl">
            <IoIosPlay />
          </span>
          <span className="text-base sm:text-lg md:text-xl font-bold">
            Play
          </span>
        </button>

        <button className="bg-gray-500/80 hover:bg-gray-500/40 flex items-center gap-2 px-5 sm:px-8 py-2 sm:py-2.5 rounded-md text-white cursor-pointer">
          <span className="text-2xl sm:text-3xl">
            <AiOutlineInfoCircle />
          </span>
          <span className="font-semibold text-base sm:text-lg md:text-xl">
            More Info
          </span>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
