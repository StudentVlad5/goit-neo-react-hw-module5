import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

function Reviews() {
  const [status, setStatus] = useState('idle');
  const [item, setItem] = useState('');
  const [list, setList] = useState([]);
  const [total_results, setTotal_results] = useState(0);
  const { movieId } = useParams();
  const refTitle = useRef(null);

  useEffect(() => {
    if (!movieId) return;
    let reviewsForFetch = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=30a2ce985f394458475cdee9944c725b&language=en-US&page=1`;

    async function reviewsItem() {
      setStatus('pending');
      setItem(movieId);
      await fetch(reviewsForFetch)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error(`Can't find anything`));
        })
        .then(key => {
          setStatus('resolved');
          setList(key);
          setTotal_results(key.total_results);
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (movieId !== item) {
      reviewsItem();
    }
  }, [item, movieId]);

  useEffect(() => {
    if (status === 'resolved') {
      refTitle.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [status]);

  if (status === 'resolved') {
    return (
      <>
        <h2 ref={refTitle}>Reviews :</h2>
        <ul className="listOfReviews">
          {total_results === 0 ? (
            <li className="emptyCast">Don't have any review yet</li>
          ) : (
            list.results.map(({ author, content, id }) => (
              <li key={id} className="reviewsCast">
                <p className="author">{author}</p>
                <p>{content}</p>
              </li>
            ))
          )}
        </ul>
      </>
    );
  }
}

export default Reviews;
