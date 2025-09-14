import { useSelector } from "react-redux";
import { useState } from "react";
import useMovieTrailer from "../hooks/useMovieTrailer";

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
    <div className="w-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
          <div className="loader border-4 border-t-4 border-gray-200 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}

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
