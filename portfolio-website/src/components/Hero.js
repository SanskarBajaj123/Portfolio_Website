import React from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
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
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Hi, this is <span className="highlight">Sanskar Bajaj</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            AI enthusiast who has driven real-world impact as an intern at an AI-native startup company. Specializing in intelligent orchestration agents, full-stack development, and building scalable digital products.
          </motion.p>
          
          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link to="contact" className="btn primary-btn glowing-btn" smooth duration={800}>
              Get In Touch
            </Link>
            <Link to="projects" className="btn secondary-btn" smooth duration={800}>
              View Projects
            </Link>
            <Link to="experience" className="btn secondary-btn" smooth duration={800}>
              View Experience
            </Link>
          </motion.div>

          <motion.div 
            className="social-icons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <a href="https://github.com/SanskarBajaj123" target="_blank" rel="noreferrer"><FaGithub /></a>
            <a href="https://linkedin.com/in/sanskar-bajaj8377" target="_blank" rel="noreferrer"><FaLinkedin /></a>
            <a href="mailto:bsanskar123@gmail.com" target="_blank" rel="noreferrer"><FaEnvelope /></a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="image-container">
            <img src={ProfileImage} alt="Sanskar Bajaj" className="profile-image" />
            <div className="glow-ring"></div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <Link to="about" smooth duration={500}>
          <div className="mouse"><div className="wheel"></div></div>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
