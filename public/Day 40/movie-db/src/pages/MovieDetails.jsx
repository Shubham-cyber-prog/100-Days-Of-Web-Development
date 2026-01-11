import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { API_KEY, BASE_URL } from "../config";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(
        `${BASE_URL}?i=${id}&apikey=${API_KEY}`
        );

      const data = await res.json();
      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="details">
      <Link to="/" className="back-btn">⬅ Back</Link>

      <div className="details-content">
        <img src={movie.Poster} alt={movie.Title} />

        <div>
          <h1>{movie.Title}</h1>
          <p><b>Year:</b> {movie.Year}</p>
          <p><b>Genre:</b> {movie.Genre}</p>
          <p><b>Runtime:</b> {movie.Runtime}</p>
          <p><b>IMDb Rating:</b> ⭐ {movie.imdbRating}</p>
          <p><b>Actors:</b> {movie.Actors}</p>
          <p><b>Plot:</b> {movie.Plot}</p>
        </div>
      </div>
    </div>
  );
}
