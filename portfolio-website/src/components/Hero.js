import React from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import './Hero.css';
import ProfileImage from '../assets/images/profile.jpg';

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Hello, I'm <span className="highlight">Sanskar V. Bajaj</span></h1>
          <h2>Computer Science Student & ML Enthusiast</h2>
          <p>I'm a tech enthusiast currently pursuing B.Tech in Computer Science at IIIT Nagpur with a passion for machine learning, deep learning, and web development.</p>
          <div className="hero-buttons">
            <Link to="contact" className="btn primary-btn" smooth={true} duration={800}>
              Get In Touch
            </Link>
            <Link to="projects" className="btn secondary-btn" smooth={true} duration={800}>
              View Projects
            </Link>
          </div>
        </motion.div>
        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="image-container">
            <img src={ProfileImage} alt="Sanskar Bajaj" className="profile-image" />
          </div>
        </motion.div>
      </div>
      <div className="scroll-indicator">
        <Link to="about" smooth={true} duration={500}>
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
