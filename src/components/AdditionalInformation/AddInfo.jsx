import { Link } from 'react-router-dom';

const AddInfo = ({ backLink }) => {
  return (
    <ul>
      <li className="styleAddInfo">
        <h3>
          <Link
            style={{ textDecoration: 'none' }}
            to={'credits'}
            state={{ from: backLink }}
          >
            Credits
          </Link>
        </h3>
      </li>
      <li className="styleAddInfo">
        <h3>
          <Link
            style={{ textDecoration: 'none' }}
            to={'reviews'}
            state={{ from: backLink }}
          >
            Reviews
          </Link>
        </h3>
      </li>
    </ul>
  );
};

export default AddInfo;
