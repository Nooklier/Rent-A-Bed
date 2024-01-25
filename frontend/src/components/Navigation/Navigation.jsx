import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {

  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='nav-container'>
      <nav>
        <NavLink to="/">
          <img className='icon' src='https://res.cloudinary.com/dikyl7t9p/image/upload/v1706115298/kisspng-league-of-legends-computer-icons-riven-riot-games-legends-5aeb2a5fc077c7.5067134315253612477884_ipmu3w.jpg'/>
        </NavLink>
      </nav>
      <div>
        <NavLink to='/'>Create a New Spot</NavLink>
        <div>
        {isLoaded && (
            <ProfileButton user={sessionUser} />
        )}
        </div>
      </div>
    </ul>
  );
}

export default Navigation;
