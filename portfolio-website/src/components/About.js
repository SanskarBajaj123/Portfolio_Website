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
          <p>I'm a dedicated Computer Science & Engineering student at Indian Institute Of Information Technology, Nagpur with a current CGPA of 9.18. My academic journey is focused on developing expertise in machine learning, deep learning, web development, and software engineering.</p>
          <p>With a passion for innovation and problem-solving, I've worked on various projects ranging from emotion analysis using BiLSTM neural networks to developing comprehensive web applications. I thrive in collaborative environments and have demonstrated leadership skills through my roles in various college organizations.</p>
          <p>I'm constantly expanding my knowledge through certifications and hands-on projects, always eager to apply cutting-edge technologies to solve real-world problems.</p>
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
            <p>9.18/10</p>
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
