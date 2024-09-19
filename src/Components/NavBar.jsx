import React, { useState } from 'react';
import '../css_folder/NavBar.css'; 
import { Link } from 'react-router-dom';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar">
        <button className="menu-toggle" onClick={toggleDrawer}>
          ☰
        </button>
        <div className="search-form">
          <input type="search" placeholder="Search" aria-label="Search" />
          <button type="submit">Search</button>
        </div>
      </nav>

      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleDrawer}>
          &times;
        </button>
        <ul className="drawer-menu">
          <li><a href="#">Home</a></li>
          <li><Link to="/profile">Profile</Link></li>
          {/* <li><a href="#">Link</a></li> */}
        </ul>
      </div>
    </>
  );
}

export default NavBar;
