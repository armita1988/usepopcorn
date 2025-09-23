import Styles from "./WatchedSummary.module.css"

export default function WatchedSummary({ watchedMovies }) {

    const Avg = (arr) => {
        return arr.reduce((acc, curr, i, arr) => {
            if (i === arr.length - 1)
                return (acc + curr) / arr.length;
            else
                return acc + curr;
        }, 0)
    }

    // const Average = (arr) => arr.reduce((acc, curr, i, arr) => (acc + curr), 0) / arr.length

    return (<div className={`${Styles.summary}`}>

        <h2 className={`${Styles["summary-title"]}`}>movies you watched</h2>
        <div className={`${Styles["summary-statics"]}`}>
            <p className={`${Styles["summary-movie-num"]}`}><span>#️⃣</span>{watchedMovies.length} movies</p>
            <p className={`${Styles["summary-imdbrating"]}`}><span>⭐️</span>{
                Math.round(Avg(watchedMovies.map(movie => Number(movie.imdbRating))))}</p>
            <p className={`${Styles["summary-userrating"]}`}><span>🌟</span>{Math.round(Avg(watchedMovies.map(movie => Number(movie.userRating))))}</p>
            <p className={`${Styles["watched-movie-runtime"]}`}><span>⏳</span>{Math.floor(Avg(watchedMovies.map(movie => Number(String(movie.runtime).split(" ").at(0)))))} min</p>
        </div>


    </div>);
}