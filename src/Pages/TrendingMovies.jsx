import { useState, useEffect, useRef } from 'react';
import { useLocation, useParams, NavLink } from 'react-router-dom';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import css from '../components/SearchMovie/SearchMovie.module.css';

function TrendingMovies() {
  const [listTrendsMoves, setlistTrendsMoves] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState('idle');

  const location = useLocation();
  const { pageNumber } = useParams();
  const refSection = useRef(null);

  useEffect(() => {
    const pageToFetch = pageNumber || 1;

    let itemForFetch = `https://api.themoviedb.org/3/trending/movie/day?page=${pageToFetch}&api_key=30a2ce985f394458475cdee9944c725b&sort_by=popularity.desc`;

    async function listOfTrendMoves() {
      setStatus('pending');
      try {
        const res = await fetch(itemForFetch);
        if (!res.ok) throw new Error(`Can't find anything`);

        const item = await res.json();

        setlistTrendsMoves(item.results);
        setTotalPages(item.total_pages);
        setCurrentPage(item.page);
        setStatus('resolved');
      } catch (error) {
        console.log(error);
        setStatus('rejected');
      }
    }

    listOfTrendMoves();
  }, [pageNumber]);

  useEffect(() => {
    if (status === 'resolved') {
      refSection.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [status]);

  if (status === 'resolved') {
    return (
      <section className={css.styledSection} ref={refSection}>
        <div className={css.styledTitle}>
          <h1>List of most trending movies for day:</h1>
        </div>

        <ul className={css.list}>
          {listTrendsMoves.map(({ id, title, name }) => (
            <li className={css.styledLi} key={id}>
              <NavLink
                className={css.navItem}
                to={`/movie/${id}`}
                state={{ from: location }}
              >
                {name ?? title}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={css.pagination}>
          <div className={css.numberPage}>
            {currentPage > 1 && (
              <NavLink
                className={css.navNumber}
                to={`/top_movies/page/${currentPage - 1}`}
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
              {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages && (
              <NavLink
                className={css.navNumber}
                to={`/top_movies/page/${currentPage + 1}`}
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

  return null;
}

export default TrendingMovies;
