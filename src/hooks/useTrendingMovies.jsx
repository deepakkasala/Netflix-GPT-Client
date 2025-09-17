import { useDispatch } from "react-redux";
import {
  addTrendingMoviesDay,
  addTrendingMoviesWeek,
} from "../redux/moviesSlice";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";

const useTrendingMovies = (trend) => {
  //Fetch movies data from TMDB API and updating it to Redux store.
  const dispatch = useDispatch();

  const getTrendingMovies = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}tmdb/trending-movies/${trend}`
      );

      if (trend === "day") dispatch(addTrendingMoviesDay(data?.data?.results));
      if (trend === "week")
        dispatch(addTrendingMoviesWeek(data?.data?.results));
    } catch (error) {
      console.log("Error in fetching trending movies", error);
    }
  };
  useEffect(() => {
    getTrendingMovies();
  }, []);
};

export default useTrendingMovies;
