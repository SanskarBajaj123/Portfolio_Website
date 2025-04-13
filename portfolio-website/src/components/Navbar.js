
import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="hero" className="navbar-logo" smooth={true} duration={500}>
          <span className="logo-text">Sanskar V. Bajaj</span>
        </Link>
        
        <div className={`menu-icon ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="hero" className="nav-link" smooth={true} duration={500} onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="about" className="nav-link" smooth={true} duration={500} onClick={() => setMenuOpen(false)}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="experience" className="nav-link" smooth={true} duration={500} onClick={() => setMenuOpen(false)}>
              Experience
            </Link>
          </li>
          <li className="nav-item">
            <Link to="projects" className="nav-link" smooth={true} duration={500} onClick={() => setMenuOpen(false)}>
              Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link to="skills" className="nav-link" smooth={true} duration={500} onClick={() => setMenuOpen(false)}>
              Skills
            </Link>
          </li>
          <li className="nav-item">
            <Link to="achievements" className="nav-link" smooth={true} duration={500} onClick={() => setMenuOpen(false)}>
              Achievements
            </Link>
          </li>
          <li className="nav-item">
            <Link to="contact" className="nav-link" smooth={true} duration={500} onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;