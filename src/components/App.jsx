import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import AppBar from './AppBar/AppBar';
import './App.css';
import TrendingMovies from '../pages/TrendingMovies';

const Movies = lazy(() => import('./Movies/Movies'));
const FilteredMovies = lazy(() => import('../pages/FilteredMovies'));
const NotFound = lazy(() => import('../pages/NotFind'));
const Reviews = lazy(() => import('./AdditionalInformation/Reviews'));
const Credits = lazy(() => import('./AdditionalInformation/Credits'));

const App = () => {
  return (
    <div className="app">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<AppBar />}>
            <Route index element={<Home />} />
            <Route
              path="top_movies/page/:pageNumber"
              element={<TrendingMovies />}
            />
            <Route path="movies" element={<FilteredMovies />} />
            <Route path="movie/:movieId" element={<Movies />}>
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
