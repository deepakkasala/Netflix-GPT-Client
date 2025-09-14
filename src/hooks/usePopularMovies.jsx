import { useDispatch } from "react-redux";
import { addPopularMovies } from "../redux/moviesSlice";
import { useEffect } from "react";
import axios from "axios";
import { API_OPTIONS } from "../utils/constants";
const usePopularMovies = () => {
  //Fetch movies data from TMDB API and updating it to Redux store.
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    console.log("Now playing fn called");

    const data = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      API_OPTIONS
    );
    // console.log(data.data.results);
    dispatch(addPopularMovies(data?.data?.results));
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

    getPopularMovies();
  }, []);
};

export default usePopularMovies;
