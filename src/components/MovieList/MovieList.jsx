import { NavLink, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const MovieList = ({
  title,
  movies,
  page,
  totalPages,
  prevLink,
  nextLink,
  sectionRef,
}) => {
  const location = useLocation();

  return (
    <section className={css.section} ref={sectionRef}>
      <div className={css.title}>
        <h1>{title}</h1>
      </div>

      <ul className={css.list}>
        {movies.map(({ id, title, name }) => (
          <li key={id} className={css.item}>
            <NavLink
              className={css.nav}
              to={`/movie/${id}`}
              state={{ from: location }}
            >
              {name ?? title}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className={css.pagination}>
        <div className={css.innerPagination}>
          {page > 1 && prevLink && (
            <NavLink className={css.navNumber} to={prevLink}>
              <FaArrowAltCircleLeft
                style={{ fontSize: 50, fill: 'rgba(84,78,114,1)' }}
              />
            </NavLink>
          )}

          <span className={css.pageInfo}>
            {page} of {totalPages}
          </span>

          {page < totalPages && nextLink && (
            <NavLink className={css.navNumber} to={nextLink}>
              <FaArrowAltCircleRight
                style={{ fontSize: 50, fill: 'rgba(84,78,114,1)' }}
              />
            </NavLink>
          )}
        </div>
      </div>
    </section>
  );
};

export default MovieList;
