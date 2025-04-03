import React, { useState } from "react";
import "./Movie.css";
import axios from "axios";

const Movie = () => {
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "10e2c6ed"; 

  const searchMovie = async () => {
    if (!query) return;

    setError("");
    setMovie(null);

    try {
      const response = await axios.get(`https://www.omdbapi.com/?t=${query}&apikey=${API_KEY}`, {
        params: { t: query, apikey: API_KEY },
      });

      if (response.data.Response === "True") {
        setMovie(response.data);
      } else {
        setError(response.data.Error);
      }
    } catch (err) {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="app_container">
      <h1>Movie Search</h1>
      <input
        type="text"
        placeholder="Enter movie title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchMovie}>Search</button>

      {error && <p className="error">{error}</p>}

      {movie && (
        <div className="movie-card">
          <h2>
            {movie.Title} ({movie.Year})
          </h2>
          <img src={movie.Poster} alt={movie.Title} />
          <p>
            <strong>Plot:</strong> {movie.Plot}
          </p>
          <p>
            <strong>Actors:</strong> {movie.Actors}
          </p>
          <p>
            <strong>IMDB Rating:</strong> {movie.imdbRating}
          </p>
        </div>
      )}
    </div>
  );
};

export default Movie;
