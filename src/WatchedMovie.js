import Styles from "./WatchedMovie.module.css";

export default function WatchedMovie({ movie, onDeleteMovie }) {

    const {
        imdbID,
        poster,
        title,
        imdbRating,
        runtime,
        userRating
    } = movie

    return (<li className={`${Styles["watched-movie"]}`} >
        <div className={`${Styles["watched-movie-poster"]}`} >
            <img src={poster} alt={`poster of movie ${title}`} />
        </div>
        <div className={`${Styles["watched-movie-info"]}`}>
            <h3 className={`${Styles["watched-movie-title"]}`}>{title}</h3>
            <div className={`${Styles["watched-movie-statics"]}`}>
                <p className={`${Styles["watched-movie-imdbrating"]}`}><span>⭐️</span>{imdbRating}</p>
                <p className={`${Styles["watched-movie-userrating"]}`}><span>🌟</span>{userRating}</p>
                <p className={`${Styles["watched-movie-runtime"]}`}><span>⏳</span>{runtime}</p>
                <button className={`${Styles["btn-delete"]}`} onClick={() => onDeleteMovie(imdbID)}>X</button>
            </div>
        </div>

    </li>);
}