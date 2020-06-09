import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = ({ user }) => {
  let userDashboard = (
    <React.Fragment>
      <li className='nav-item'>
        <NavLink className='nav-link' to='/login'>
          Login
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink className='nav-link' to='/register'>
          Register
        </NavLink>
      </li>
    </React.Fragment>
  );

  if (user) {
    userDashboard = (
      <React.Fragment>
        <li className='nav-item'>
          <Navbar.Text>{user}</Navbar.Text>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/logout'>
            Logout
          </NavLink>
        </li>
      </React.Fragment>
    );
  }

  return (
    <div className='bg-light'>
      <nav className='navbar navbar-expand-lg navbar-light bg-light container'>
        <Link className='navbar-brand' to='/'>
          Vidly
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse justify-content-end' id='navbarNav'>
          <ul className='navbar-nav'>{userDashboard}</ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
