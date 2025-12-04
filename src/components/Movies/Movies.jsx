import { useState, useEffect } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { Suspense } from 'react';
import { BackLink } from '../BackLink/BackLink';
import css from './Movies.module.css';
import AddInfo from '../AdditionalInformation/AddInfo';
import NoFoto from '../../Images/no_image.png';

function Movies() {
  const [item, setItem] = useState('');
  const [status, setStatus] = useState('idle');
  const [posterpage, setPosterpage] = useState('');
  const [original_title, setOriginal_title] = useState('');
  const [popularity, setPopularity] = useState('');
  const [overview, setOverview] = useState('');
  const [genres, setGenres] = useState([]);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/moves';
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    let moveForFetch = `https://api.themoviedb.org/3/movie/${movieId}?api_key=30a2ce985f394458475cdee9944c725b&language`;

    async function moveItem() {
      setStatus('pending');
      await fetch(moveForFetch)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error(`Can't find anything`));
        })
        .then(key => {
          setItem(key.id);
          setOriginal_title(key.original_title);
          setPosterpage(key.poster_path);
          setPopularity(key.popularity);
          setOverview(key.overview);
          setGenres(key.genres);
          setStatus('resolved');
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (movieId !== item) {
      moveItem();
    }
  }, [item, movieId]);

  if (status === 'resolved') {
    return (
      <div>
        <div className={css.movieContainer}>
          <div className={css.leftBar}>
            <BackLink to={backLinkHref}>Back to list</BackLink>
            <div>
              <img
                src={
                  posterpage
                    ? `https://image.tmdb.org/t/p/original/${posterpage}`
                    : NoFoto
                }
                style={{ width: '300px' }}
                alt={original_title}
              />
            </div>
          </div>
          <div className={css.rightBar}>
            <h1>About movie: {original_title}</h1>
            <h2
              className={
                +popularity > 100
                  ? css.green
                  : +popularity < 30
                  ? css.red
                  : css.black
              }
            >
              {popularity.toFixed(2)} %
            </h2>
            <div className={css.overView}> {overview}</div>
            <div>
              <ul className={css.ganreMove}>
                <h2>Ganre of Movie:</h2>
                {genres.map(key => (
                  <li key={key.id}>{key.name}</li>
                ))}
              </ul>
            </div>
            <AddInfo backLink={backLinkHref} />
          </div>
        </div>
        <div className={css.addInfoBar}>
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    );
  }
}

export default Movies;
