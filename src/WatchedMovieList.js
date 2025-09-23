
import Styles from "./WatchedMovieList.module.css";
import WatchedMovie from "./WatchedMovie";

export default function WatchedMovieList({ watchedMovies, onDeleteMovie }) {

    return (<ul>
        {watchedMovies.map(wm => <WatchedMovie
            movie={wm}
            key={wm.imdbID}
            onDeleteMovie={onDeleteMovie} />)}
    </ul>);
}