import React, { useState } from 'react';
import './Navbar.scss';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/index';
import { Link, useHistory, Redirect, useLocation } from 'react-router-dom';
import Hamburger from './Hamburger';
import styled from 'styled-components';

import Signin from '../Signin/Signin';

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const user = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  console.log(user);
  // if (user.loading === true) {
  //   return <div />;
  // }

  const handleClickLogout = async (e) => {
    await dispatch(logout());
    history.push('/');
  };

  const handleHamburgerClick = () => {
    setClicked(!clicked)
  }

  return (
    <>
      <Hamburger handleHamburgerClick={handleHamburgerClick} clicked={clicked} />
      <Nav clicked={clicked} className="navbar">



        <Link to="/">
          <button onClick={() => setClicked(false)} className="navbar__description navbar-button">all tours</button>
        </Link>
        {/* <div className="navbar__info"> */}
        {!user.authenticated ? (
          <>
            <Link className="navbar__anchor" to="/signin">
              <button onClick={() => setClicked(false)} className="navbar__info-login navbar-button">
                sign in
              </button>
            </Link>

            <Link className="navbar__anchor" to="/signup">
              <button onClick={() => setClicked(false)} className="navbar__info-signup navbar-button">
                sign up
              </button>
            </Link>
          </>
        ) : (
            <>
              <button
                onClick={(e) => { handleClickLogout(e); setClicked(false) }}
                // onClick={() => setClicked(false)}
                className="navbar__info-logout navbar-button"
              >
                logout
            </button>

              <Link className="navbar__anchor" style={{ textDecoration: 'none' }} to="/me">
                <button onClick={() => setClicked(false)} className="navbar__info-me navbar-button">
                  {user.user.name}

                  <img src={`/uploads/users/${user.user.photo}`} alt="" />
                </button>
              </Link>

              <Link className="navbar__anchor" to={'/me'}>
                <button className="navbar__info-settings navbar-button">Settings</button>
              </Link>

              <Link className="navbar__anchor" to={'/me'}>
                <button className="navbar__info-bookings navbar-button">my bookings</button>
              </Link>
            </>
          )}
        {/* </div> */}
      </Nav>
    </>
  );
};


const Nav = styled.nav`


@media all and (max-width: 768px) {
    position: fixed;
    height: 100vh;
    width: 100%;
    z-index: 500;
    box-shadow: 5px 5px 10px grey;
    transform: ${props => props.clicked ? 'translateX(0)' : 'translateX(-105%)'};
    justify-content: flex-start;
    flex-direction: column;
}
`






export default Navbar;
