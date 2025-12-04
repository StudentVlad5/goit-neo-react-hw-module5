import { HiArrowLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import css from './BackLink.module.css';

export const BackLink = ({ to, children }) => {
  return (
    <Link className={css.link} to={to}>
      <HiArrowLeft size="30" />
      {children}
    </Link>
  );
};
