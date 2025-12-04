import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaSearchengin, FaTimesCircle } from 'react-icons/fa';
import css from './Searchbar.module.css';

function Searchbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query') ?? '';
  const [inputValue, setInputValue] = useState(() => {
    if (queryParam) return queryParam;
    try {
      const saved = window.localStorage.getItem('searchQuery');
      return saved ? JSON.parse(saved) : '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    const saved = window.localStorage.getItem('searchQuery');
    if (!queryParam && saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) {
          setSearchParams({ query: parsed, page: 1 });
          setInputValue(parsed);
        }
      } catch (err) {
        console.error(err);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (queryParam) {
      window.localStorage.setItem('searchQuery', JSON.stringify(queryParam));
      setInputValue(queryParam);
    }
  }, [queryParam]);

  const handleChange = e => setInputValue(e.target.value.toLowerCase());

  const handleSubmit = e => {
    e.preventDefault();
    const q = inputValue.trim();
    if (!q) {
      alert('Please enter a movie name');
      return;
    }

    setSearchParams({ query: q, page: 1 });
  };

  const clearInput = () => {
    setInputValue('');
    setSearchParams({});
    window.localStorage.removeItem('searchQuery');
  };

  return (
    <>
      <div className={css.searchBar}>
        <form className={css.searchForm} onSubmit={handleSubmit}>
          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search name of movie"
            value={inputValue}
            onChange={handleChange}
          />

          {inputValue && (
            <button
              type="button"
              className={css.searchFormBtnClear}
              onClick={clearInput}
              aria-label="clear"
            >
              <FaTimesCircle
                style={{ width: 30, height: 30, fill: 'rgba(84,78,114,1)' }}
              />
            </button>
          )}

          <button type="submit" className={css.searchFormButton}>
            <FaSearchengin style={{ width: 30, height: 30, fill: '#3C93D5' }} />
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>
        </form>
      </div>
    </>
  );
}

export default Searchbar;
