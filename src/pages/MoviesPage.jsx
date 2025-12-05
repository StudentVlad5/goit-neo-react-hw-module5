import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import MovieList from '../components/MovieList/MovieList';

const TopMoviesPage = () => {
  const [listTrendsMoves, setlistTrendsMoves] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState('idle');

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

  if (status === 'pending') {
    return <div className="loading">Loading...</div>;
  }
  if (status === 'resolved') {
    return (
      <MovieList
        title="List of most trending movies for day:"
        movies={listTrendsMoves}
        page={currentPage}
        totalPages={totalPages}
        prevLink={`/top_movies/page/${currentPage - 1}`}
        nextLink={`/top_movies/page/${currentPage + 1}`}
        sectionRef={refSection}
      />
    );
  }
  return null;
};

export default TopMoviesPage;
