import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

import { API_KEY, BASE_URL } from "../config";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("avengers");

  const fetchMovies = async () => {
    const res = await fetch(
    `${BASE_URL}?s=${search}&apikey=${API_KEY}`
    );
    const data = await res.json();

    if (data.Response === "True") {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="app">
      <h1>🎬 Movie Database</h1>

      <div className="search-box">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search movies..."
        />
        <button onClick={fetchMovies}>Search</button>
      </div>

      <div className="movies">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}
