import { Link } from 'react-router-dom';
import css from './AddInfo.module.css';

const AddInfo = ({ backLink }) => {
  return (
    <ul className={css.listAddInfo}>
      <li className={css.styleAddInfo}>
        <Link
          className={css.addInfoLink}
          to="credits"
          state={{ from: backLink }}
        >
          Credits
        </Link>
      </li>

      <li className={css.styleAddInfo}>
        <Link
          className={css.addInfoLink}
          to="reviews"
          state={{ from: backLink }}
        >
          Reviews
        </Link>
      </li>
    </ul>
  );
};

export default AddInfo;
