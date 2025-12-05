import { useEffect } from 'react';
import SearchMovie from '../components/SearchMovie/SearchMovie';
import Searchbar from '../components/Searchbar/SeachBar';

const FilteredMoviesPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <Searchbar />;
      <SearchMovie />
    </>
  );
};

export default FilteredMoviesPage;
