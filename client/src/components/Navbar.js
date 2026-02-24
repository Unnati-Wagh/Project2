import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo.jpg'

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    navigate('/login'); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
          <img 
            src={logo} 
            alt="Logo" 
            width="60" 
            height="60" 
            className="d-inline-block align-top me-2" 
          />
          <span>Employee Management System</span>
        </Link>

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            {!user ? (
              // Show these if NO ONE is logged in
              <>
                <li className="nav-item">
                  <Link className="nav-link btn btn-outline-light me-2" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn btn-primary text-white" to="/register">Register</Link>
                </li>
              </>
            ) : (
              // Show these if Admin or Employee is logged in
              <>
                <li className="nav-item">
                  <span className="nav-link text-light me-3">Welcome, {user.name}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;