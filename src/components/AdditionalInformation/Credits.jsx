import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import NoFoto from '../../Images/no_image.png';

function Credits() {
  const [status, setStatus] = useState('idle');
  const [item, setItem] = useState('');
  const [list, setList] = useState([]);
  const [total_results, setTotal_results] = useState(0);
  const { movieId } = useParams();
  const refTitle = useRef(null);

  useEffect(() => {
    if (!movieId) return;
    let creditForFetch = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=30a2ce985f394458475cdee9944c725b&language=en-US`;

    async function creditItem() {
      setStatus('pending');
      setItem(movieId);
      await fetch(creditForFetch)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error(`Can't find anything`));
        })
        .then(key => {
          setStatus('resolved');
          setList(key.cast);
          setTotal_results(key.cast.length);
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (movieId !== item) {
      creditItem();
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
        <h2 ref={refTitle}>Cast of movie:</h2>
        <div className={total_results === 0 ? 'emtyList' : 'listOfCast'}>
          {total_results === 0 ? (
            <p className="emptyCast">No information about the actors</p>
          ) : (
            list.map(
              ({ credit_id, original_name, popularity, profile_path }) => (
                <div className="listOfCast__names" key={credit_id}>
                  <div>
                    <img
                      src={
                        profile_path
                          ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                          : NoFoto
                      }
                      width={200}
                      height={300}
                      alt={`{original_name}`}
                    />
                  </div>
                  <p>{original_name}</p>
                  <p>Popularity: {popularity.toFixed(2)} %</p>
                </div>
              )
            )
          )}
        </div>
      </>
    );
  }
}

export default Credits;
