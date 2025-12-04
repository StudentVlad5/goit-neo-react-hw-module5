import { useState, useEffect, useRef } from 'react';
import { useLocation, NavLink, useSearchParams } from 'react-router-dom';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import css from './SearchMovie.module.css';

function SearchMovie() {
  const [list, setList] = useState([]);
  const [status, setStatus] = useState('idle');
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const location = useLocation();
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
    return <p className={css.EmptyCast}>Enter something to search…</p>;
  }

  if (status === 'pending') {
    return <p className={css.loading}>Loading...</p>;
  }

  if (status === 'rejected') {
    return <p className={css.EmptyCast}>Something went wrong. Try again.</p>;
  }

  return (
    <section className={css.StyledSection} ref={refSection}>
      <div className={css.styledTitle}>
        <h1>Found movies: {totalResults}</h1>
      </div>
      {list.length === 0 ? (
        <p className={css.EmptyCast}>No movies found for &quot;{query}&quot;</p>
      ) : (
        <ul className={css.list}>
          {list
            .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
            .map(({ id, title }) => (
              <li className={css.styledLi} key={id}>
                <NavLink
                  className={css.navItem}
                  to={`/movie/${id}`}
                  state={{ from: location }}
                >
                  {title}
                </NavLink>
              </li>
            ))}
        </ul>
      )}
      {/* pagination */}
      <div className={css.pagination}>
        <div className={css.numberPage}>
          {page > 1 && (
            <NavLink
              className={css.navNumber}
              to={`/movies?query=${query}&page=${page - 1}`}
            >
              <FaArrowAltCircleLeft
                style={{ fontSize: '50px', fill: 'rgba(84,78,114,1)' }}
              />
            </NavLink>
          )}

          <span
            style={{
              fontSize: '50px',
              color: 'rgba(84,78,114,1)',
              padding: '40px',
            }}
          >
            {page} of {totalPages}
          </span>

          {page < totalPages && (
            <NavLink
              className={css.navNumber}
              to={`/movies?query=${query}&page=${page + 1}`}
            >
              <FaArrowAltCircleRight
                style={{ fontSize: '50px', fill: 'rgba(84,78,114,1)' }}
              />
            </NavLink>
          )}
        </div>
      </div>
    </section>
  );
}

export default SearchMovie;
