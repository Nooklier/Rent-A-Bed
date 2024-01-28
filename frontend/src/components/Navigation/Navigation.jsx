import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {

  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav-container'>
      <div className='icon-title'>
        <NavLink to="/">
          <img className='icon' src='https://res.cloudinary.com/dikyl7t9p/image/upload/v1706229549/HomepageIcon.webp'/>
        </NavLink>
        <div>Runeterra</div>
      </div>

      <div className='profile-after-login'>
        {sessionUser && <NavLink to='/spots/new'>Create a New Spot</NavLink>}
        <div>
        {isLoaded && (<ProfileButton user={sessionUser} />)}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
