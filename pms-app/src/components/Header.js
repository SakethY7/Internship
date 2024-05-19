// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">Person Management System</h1>
      <nav className="header-nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">Add Person</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
