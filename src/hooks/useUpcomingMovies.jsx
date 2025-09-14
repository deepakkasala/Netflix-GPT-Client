import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../redux/moviesSlice";
import { useEffect } from "react";
import axios from "axios";
import { API_OPTIONS } from "../utils/constants";
const useUpcomingMovies = () => {
  //Fetch movies data from TMDB API and updating it to Redux store.
  const dispatch = useDispatch();

  const getUpcomingMovies = async () => {
    const data = await axios.get(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      API_OPTIONS
    );
    // console.log(data.data.results);
    dispatch(addUpcomingMovies(data?.data?.results));
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
    getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
