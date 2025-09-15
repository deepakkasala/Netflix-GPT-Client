import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../redux/moviesSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_OPTIONS } from "../utils/constants";
const useNowPlayingMovies = () => {
  //Fetch movies data from TMDB API and updating it to Redux store.
  const dispatch = useDispatch();

  const getNowPlayingMovies = async () => {
    try {
      const data = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?page=1",
        API_OPTIONS
      );
      dispatch(addNowPlayingMovies(data?.data?.results));
    } catch (error) {
      console.error("Error in fetching now playing movies.");
    }
  };
  // console.log(data.data.results);
  // const data = await fetch("http://localhost:4050/now-playing")
  //   .then((res) => {
  //     console.log("res is->", res.results);
  //   })
  //   .catch((err) => console.error(err));
  // axios
  //   .get("http://localhost:4001/now-playing")
  //   .then((res) => {
  //     // console.log(res);
  //     console.log(res?.data[0]?.results);
  //     dispatch(addNowPlayingMovies(res?.data[0]?.results));
  //   })
  //   .catch((err) => console.error(err));

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
