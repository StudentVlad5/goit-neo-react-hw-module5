import TMBD from '../../Images/TMBD.svg';
import css from './Home.module.css';

const Home = () => {
  return (
    <div className={css.home}>
      <img src={TMBD} alt="logo TMBD" />
      <h2 className={css.homeTitle}>
        "This product uses the TMDB API but is not endorsed or certified by
        TMDB."
      </h2>
      <h2 className={css.homeSubtitle}>Not for commercial use</h2>
    </div>
  );
};
export default Home;
