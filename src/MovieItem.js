import Styles from './MovieItem.module.css'

export default function MovieItem({ movie, onSelectMovie }) {


    const { Title: title,
        Year: year,
        imdbID,
        Poster: poster } = movie;


    return (<li className={Styles["movie"]} onClick={() => { onSelectMovie(imdbID); }}>
        <div className={Styles["movie-img"]}>
            <img src={poster} alt={`poster of ${title} movie`} />
        </div>
        <div className={Styles["movie-details"]}>
            <h3 className={Styles["movie-title"]}>{title}</h3>
            <p className={Styles["movie-published-year"]}><span>📆</span> {year}</p>
        </div>
    </li >);

}