// eslint-disable-next-line no-unused-vars
import Styles from "./WatchedMovieList.module.css";
import WatchedMovie from "../WatchedMovie/WatchedMovie";

export default function WatchedMovieList({ watchedMovies, onDeleteMovie }) {
  return (
    <ul className={Styles["watched-movie-item"]}>
      {watchedMovies.map((wm) => (
        <WatchedMovie
          movie={wm}
          key={wm.imdbID}
          onDeleteMovie={onDeleteMovie}
        />
      ))}
    </ul>
  );
}
