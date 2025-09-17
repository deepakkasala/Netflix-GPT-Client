import { useSelector } from "react-redux";
import { useState } from "react";
import useMovieTrailer from "../hooks/useMovieTrailer";
import Loader from "./Loader";

const VideoBackground = ({ movieId, onVideoEnd }) => {
  const trailers = useSelector((store) => store?.movies?.trailerVideo);
  const [isLoading, setIsLoading] = useState(true);

  // load trailers for this movie
  useMovieTrailer(movieId);

  if (!trailers || trailers.length === 0) {
    return <div className="w-screen aspect-video bg-black" />;
  }

  const firstTrailer = trailers[0];
  const playlistIds = trailers.map((t) => t.key).join(",");

  return (
    <div className="w-full relative mt-10 sm:mt-0 md:mt-0 lg:mt-0 xl:mt0">
      {isLoading && <Loader />}

      <iframe
        className="w-full aspect-video"
        src={`https://www.youtube.com/embed/${firstTrailer.key}?autoplay=1&mute=1&controls=0&rel=0&showinfo=0&loop=0&playlist=${playlistIds}&enablejsapi=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        onLoad={() => setIsLoading(false)}
      ></iframe>
    </div>
  );
};

export default VideoBackground;
