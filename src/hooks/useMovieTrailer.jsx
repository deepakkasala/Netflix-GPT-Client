import axios from "axios";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../redux/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  //fetch trailer video and updating the store with trailer video.
  const getMovieVideos = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );

    const filteredTrailers = data.results.filter(
      (video) => video.type === "Trailer"
    );
    // console.log(filteredTrailers);
    // const trailer = filteredTrailers.length
    //   ? filteredTrailers[0]
    //   : data.results[0];
    // console.log(trailer);
    dispatch(addTrailerVideo(filteredTrailers));
  };

  useEffect(() => {
    if (movieId) getMovieVideos();
  }, [movieId]);
};

export default useMovieTrailer;
