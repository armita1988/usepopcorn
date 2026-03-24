import MovieItem from "../MovieItem/MovieItem";
import Styles from "./MovieList.module.css";

export default function MovieList({ movieList, onSelectMovie }) {
  return (
    <ul className={`${Styles["movie-list"]}`}>
      {movieList.map((movie) => (
        <MovieItem
          movie={movie}
          key={movie.imdbID}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}
