import { useEffect, useState } from "react";
import Header from "./Header";
import Logo from "./Logo";
import Result from "./Result";
import Searchbar from "./Searchbar";
import { useGetMovies } from "./useGetMovie";
import Main from "./Main";
import MovieList from "./MovieList";
import Spinner from "./Spinner";
import Error from "./Error";
import Box from "./Box";
import WatchedSummary from "./WatchedSummary";
import WatchedList from "./WatchedMovieList";
import MovieDetails from "./MovieDetails";
import { useLocalStorageState } from "./useLocalStorage";
import { useKeyDown } from './useKeyStroke';

const BASE_URL = "https://www.omdbapi.com/";
const KEY = "87834919";

function App() {

  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [movieList, setMovieList] = useState([]);
  const [watchedMovies, setWatchedMovies] = useLocalStorageState([], 'watched');
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  function handleCloseMovie() {
    setSelectedMovieId(null);
  }

  function handleDeleteMovie(imdbID) {
    setWatchedMovies(movies => movies.filter(x => x.imdbID !== imdbID))
  }

  function handleSelectMovie(id) {
    setSelectedMovieId(currId => currId !== id ? id : null);
  }

  function handleAddWatched(watchedMovie) {
    setWatchedMovies(wms => [...wms, watchedMovie]);
  }

  useKeyDown('Escape', function () {
    handleCloseMovie();
  });

  useGetMovies({
    baseUrl: BASE_URL,
    apiKey: KEY,
    query,
    setMovieList,
    setError,
    setIsLoading
  });


  return (
    <div className="container">

      <Header>
        <Logo />
        <Searchbar query={query} setQuery={setQuery} />
        <Result num={movieList.length} />
      </Header>

      <Main>
        <Box >
          {isLoading ? <Spinner /> :
            (error ? <Error message={error} /> :
              <MovieList movieList={movieList} onSelectMovie={handleSelectMovie} />)}
        </Box>
        <Box>

          {
            selectedMovieId ? (<MovieDetails apiKey={KEY}
              selectedMovieId={selectedMovieId}
              setError={setError}
              setIsLoading={setIsLoading}
              onAddWatched={handleAddWatched}
              onCloseMovie={handleCloseMovie}
              watchedMovies={watchedMovies} key={selectedMovieId} />) : (
              <>
                <WatchedSummary watchedMovies={watchedMovies} />
                <WatchedList watchedMovies={watchedMovies} onDeleteMovie={handleDeleteMovie} />
              </>
            )}


          {/* 
          {isLoading ? <Spinner /> :
            (error ? <Error message={error} /> :
              <MovieDetails KEY={KEY}
                selectedMovieId={selectedMovie} setError={setError} setIsLoading={setIsLoading} />)
          } */}


        </Box>
      </Main>
    </div >

  );
}

export default App;
