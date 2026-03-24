import { useEffect } from "react";

export function useGetMovies({
  baseUrl = "https://www.omdbapi.com/",
  apiKey = "87834919",
  query,
  setMovieList,
  setError,
  setIsLoading,
}) {
  useEffect(
    function () {
      const controller = new AbortController();

      function urlBuilder() {
        const url = new URL(baseUrl);
        url.searchParams.set("apikey", apiKey);
        url.searchParams.set("s", query ?? "");
        return url.toString();
      }

      async function fetchMovie() {
        try {
          setIsLoading(true);
          setError("");
          const response = await fetch(urlBuilder(), {
            signal: controller.signal,
          });
          if (!response.ok) {
            throw new Error("Something went wrong with movie fetcing");
          }
          const data = await response.json();
          if (data.Response === "False") {
            throw new Error("Movie not found");
          }
          setMovieList(data.Search);
        } catch (error) {
          if (error.name !== "AbortError") {
            setMovieList([]);
            setError(error.message);
            console.log(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (!query.trim() || query.length < 3) {
        setMovieList([]);
        setIsLoading(false);
        setError("");
        return;
      }
      fetchMovie();

      return () => controller.abort();
    },
    [query, apiKey, baseUrl],
  ); //eslint-disable-line react-hooks/exhaustive-deps
}
