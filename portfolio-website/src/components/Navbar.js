import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import './Navbar.css';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
 

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  

  return (
    <nav className={`navbar ${'scrolled'}`}>
      <div className="navbar-container">
        <Link to="hero" className="navbar-logo" smooth duration={500}>
          <span className="logo-text">Sanskar V. Bajaj</span>
        </Link>

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </div>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          {[ 'about', 'experience', 'projects', 'skills', 'achievements', 'contact'].map((section) => (
            <li className="nav-item" key={section}>
              <Link to={section} className="nav-link" smooth duration={500} onClick={() => setMenuOpen(false)}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            </li>
          ))}
          
        </ul>

        
      </div>
    </nav>
  );
};

export default Navbar;
