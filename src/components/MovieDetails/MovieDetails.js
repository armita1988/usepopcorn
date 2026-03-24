import { useEffect, useState } from "react";
import Styles from "./MovieDetails.module.css";
import Rating from "../Rating/Rating";

export default function MovieDetails({
  defaultRating = 0,
  selectedMovieId,
  apiKey,
  setIsLoading,
  setError,
  onCloseMovie,
  onAddWatched,
  watchedMovies,
}) {
  const [movie, setMovie] = useState({});
  const [externalRate, setExternalRate] = useState(defaultRating);
  const [externalHoverRate, setExternalHoverRate] = useState(0);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID,
      poster,
      title,
      imdbRating,
      runtime,
      userRating: externalRate,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  const isWatched = watchedMovies.find((m) => m.imdbID === selectedMovieId);

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovieDetails() {
        setError("");
        setIsLoading(true);
        try {
          const resp = await fetch(
            `https://www.omdbapi.com/?apikey=${apiKey}&i=${selectedMovieId}`,
            { signal: controller.signal },
          );
          if (!resp.ok) {
            throw new Error("Something went wrong with movie fetcing");
          }
          const data = await resp.json();
          setMovie(data);
        } catch (Err) {
          setError(Err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovieDetails();
    },
    [selectedMovieId, apiKey],
  ); //eslint-disable-line react-hooks/exhaustive-deps

  const {
    Title: title,
    Released: released,
    Runtime: runtime,
    Genre: genre,
    Director: director,
    Actors: actors,
    Poster: poster,
    Plot: plot,
    imdbRating,
    imdbID,
  } = movie;

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie| ${title}`;
      return () => (document.title = "Rate Movies");
    },
    [title],
  );

  return (
    imdbID && (
      <div className={`${Styles.details}`}>
        <button className={`btn-back`} onClick={onCloseMovie}>
          &larr;
        </button>
        <header className={`${Styles["details-header"]} `}>
          <div className={`${Styles["details-poster"]} `}>
            <img src={poster} alt={`poster of ${title} movie`} />
          </div>
          <div className={`${Styles["details-overview"]} `}>
            <h2 className={`${Styles["details-title"]} `}>{title}</h2>
            <p className={`${Styles["details-release"]} `}>
              {released} &bull; {runtime}{" "}
            </p>
            <p className={`${Styles["details-genre"]} `}>{genre}</p>
            <p className={`${Styles["details-imdbrating"]} `}>
              <span>⭐️ </span>
              {imdbRating} IMDb rating
            </p>
          </div>
        </header>
        <section className={`${Styles["details-body"]} `}>
          <div className={`${Styles["details-rating"]} `}>
            {isWatched ? (
              <p className={`${Styles["details-rating-text"]} `}>
                you rated movie <strong>{isWatched.userRating}</strong>{" "}
                <span>⭐️</span>
              </p>
            ) : (
              <div className={`${Styles["details-rating-box"]} `}>
                <div className={`${Styles["details-rating-stars"]} `}>
                  <Rating
                    maxRating={10}
                    defaultRating={defaultRating}
                    onSetExtenalRate={setExternalRate}
                    onSetExtenalHoverRate={setExternalHoverRate}
                    color={`var(--accent-color)`}
                  />
                  <p className={`${Styles["details-rating-value"]} `}>
                    {externalHoverRate || externalRate || "  "}
                  </p>
                </div>
                <button
                  className={`${Styles["details-rating-btn"]} `}
                  onClick={handleAdd}
                  disabled={externalRate < 1}
                >
                  <span>+</span> add to list
                </button>
              </div>
            )}
          </div>

          <p className={`${Styles["details-plot"]} `}>
            <em>{plot}</em>
          </p>
          <p className={`${Styles["details-actors"]} `}>{actors}</p>
          <p className={`${Styles["details-director"]} `}>
            Directed by {director}
          </p>
        </section>
      </div>
    )
  );
}
