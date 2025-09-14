import { useDispatch } from "react-redux";
import {
  addTrendingMoviesDay,
  addTrendingMoviesWeek,
} from "../redux/moviesSlice";
import { useEffect } from "react";
import axios from "axios";
import { API_OPTIONS } from "../utils/constants";

const useTrendingMovies = (trend) => {
  //Fetch movies data from TMDB API and updating it to Redux store.
  const dispatch = useDispatch();

  const getTrendingMovies = async () => {
    const data = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/${trend}`,
      API_OPTIONS
    );
    // console.log(data.data.results);
    if (trend === "day") dispatch(addTrendingMoviesDay(data?.data?.results));
    if (trend === "week") dispatch(addTrendingMoviesWeek(data?.data?.results));
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
  };
  useEffect(() => {
    console.log("useEffect called");

    getTrendingMovies();
  }, []);
};

export default useTrendingMovies;
