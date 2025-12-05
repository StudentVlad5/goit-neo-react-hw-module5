import { useEffect } from 'react';
import Home from '../components/Home/Home';

const HomePage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return <Home />;
};
export default HomePage;
