import { Outlet, NavLink } from 'react-router-dom';
import { FaCat, FaBook, FaCrown } from 'react-icons/fa';
import css from './AppBar.module.css';

const navItems = [
  { href: '/', text: 'Home', icon: FaCrown },
  { href: '/top_movies/page/1', text: 'Top Movies', icon: FaBook },
  { href: '/movies', text: 'Movies', icon: FaCat },
];

function AppBar() {
  return (
    <div className={css.layout}>
      <header className={css.header}>
        <div className={css.containerWrap}>
          <nav>
            <ul className={css.menuList}>
              {navItems.map(({ href, text, icon: Icon }) => (
                <li key={href} className={css.menuItem}>
                  <NavLink
                    to={href}
                    className={({ isActive }) =>
                      `${css.navLink} ${isActive ? css.active : ''}`
                    }
                  >
                    <Icon className={css.icon} />
                    <span>{text}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className={css.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}

export default AppBar;
