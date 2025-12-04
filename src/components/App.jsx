import { useState, Suspense, lazy } from 'react'; // 1. Додали Suspense
import { Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import TrendingMoves from '../Pages/TrendingMovies';
import Searchbar from './Searchbar/SeachBar';
import Move from './Moves/Moves';
import AppBar from './AppBar/AppBar';
import NotFound from '../Pages/NotFind';
import './App.css';
import FilteredMovies from '../Pages/FilteredMovies';

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
              element={<TrendingMoves />}
            />
            <Route path="movie" element={<FilteredMovies />} />
            <Route path="movie/:movieId" element={<Move />}>
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
