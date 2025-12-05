import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Navigation from './Navigation/Navigation';
import './App.css';

const TopMoviesPage = lazy(() => import('../pages/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../pages/MovieDetailsPage'));
const FilteredMoviesPage = lazy(() => import('../pages/FilteredMoviesPage'));
const NotFound = lazy(() => import('../pages/NotFoundPage'));
const Reviews = lazy(() => import('./AdditionalInformation/MovieCast'));
const Credits = lazy(() => import('./AdditionalInformation/MovieReviews'));

const App = () => {
  return (
    <div className="app">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<HomePage />} />
            <Route
              path="top_movies/page/:pageNumber"
              element={<TopMoviesPage />}
            />
            <Route path="movies" element={<FilteredMoviesPage />} />
            <Route path="movie/:movieId" element={<MovieDetailsPage />}>
              <Route path="credits" element={<Credits />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
