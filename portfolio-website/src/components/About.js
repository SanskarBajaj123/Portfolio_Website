import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2>About Me</h2>
        <div className="underline"></div>
      </motion.div>
      <div className="about-content">
        <motion.div 
          className="about-text"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p>I'm a Computer Science & Engineering student at the Indian Institute of Information Technology, Nagpur, maintaining a CGPA of 9.28. My academic journey is driven by a deep curiosity for building software that solves real-world problems.</p>
          <p>I have hands-on experience in AI product development, having built core orchestration agents at Kookar AI and implemented full-stack web and mobile applications using React, Node, and Supabase. My technical foundation spans across machine learning algorithms and modern web frameworks.</p>
          <p>Whether it's designing efficient backend architectures or deploying intelligent models, I am constantly learning and eager to tackle complex engineering challenges collaboratively.</p>
        </motion.div>
        <motion.div 
          className="about-stats"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="stat">
            <h3>Education</h3>
            <p>B.Tech in Computer Science</p>
            <p>IIIT Nagpur (2022-2026)</p>
          </div>
          <div className="stat">
            <h3>CGPA</h3>
            <p>9.28/10</p>
          </div>
          <div className="stat">
            <h3>Location</h3>
            <p>Nagpur, Maharashtra</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
