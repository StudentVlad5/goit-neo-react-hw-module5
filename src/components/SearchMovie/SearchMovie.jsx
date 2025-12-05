import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';

function SearchMovie() {
  const [list, setList] = useState([]);
  const [status, setStatus] = useState('idle');
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const refSection = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const page = Number(searchParams.get('page') ?? 1);

  useEffect(() => {
    if (!query) {
      setList([]);
      setTotalResults(0);
      setTotalPages(1);
      setStatus('idle');
      return;
    }

    async function fetchMovies() {
      setStatus('pending');
      try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=30a2ce985f394458475cdee9944c725b&query=${encodeURIComponent(
          query
        )}&page=${page}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Can't load movies");

        const data = await res.json();
        setList(data.results || []);
        setTotalResults(data.total_results || 0);
        setTotalPages(data.total_pages || 1);
        setStatus('resolved');
      } catch (err) {
        if (err.name === 'AbortError') return;
        console.error(err);
        setStatus('rejected');
      }
    }

    fetchMovies();
  }, [query, page]);

  useEffect(() => {
    if (status === 'resolved') {
      refSection.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [status]);

  if (!query) {
    return <p className="emptyCast">Enter something to search…</p>;
  }

  if (status === 'pending') {
    return <p className="loading">Loading...</p>;
  }

  if (status === 'rejected') {
    return <p className="emptyCast">Something went wrong. Try again.</p>;
  }

  return (
    <MovieList
      title={`Found movies: ${totalResults}`}
      movies={list}
      page={page}
      totalPages={totalPages}
      prevLink={`/movies?query=${query}&page=${page - 1}`}
      nextLink={`/movies?query=${query}&page=${page + 1}`}
      sectionRef={refSection}
    />
  );
}

export default SearchMovie;
