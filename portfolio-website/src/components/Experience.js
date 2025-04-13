import React from 'react';
import { motion } from 'framer-motion';
import './Experience.css';

const Experience = () => {
  return (
    <section id="experience" className="experience">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2>Experience</h2>
        <div className="underline"></div>
      </motion.div>
      <div className="experience-container">
        <div className="timeline">
          <motion.div 
            className="timeline-item"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h3>Marketing and Hospitality Lead</h3>
                <span className="timeline-period">August 2023 – August 2024</span>
              </div>
              <h4>Orator Club, IIITN</h4>
              <ul className="timeline-list">
                <li>Led a team of 15+ members, demonstrating strong leadership and team coordination skills.</li>
                <li>Successfully organized and executed major intercollegiate events, driving nationwide participation from 100+ institutes.</li>
                <li>Showcased expertise in event planning, logistics management, and stakeholder engagement.</li>
              </ul>
            </div>
          </motion.div>
          
          <motion.div 
            className="timeline-item"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h3>Growth Intern</h3>
                <span className="timeline-period">June 2023 – July 2023</span>
              </div>
              <h4>FACT App (Project By ABPUA)</h4>
              <ul className="timeline-list">
                <li>Developed the Front-end of the FactApp website using HTML/CSS.</li>
                <li>Successfully acquired over 500 new users through targeted digital and in-person marketing strategies.</li>
                <li>Spearheaded a month-long initiative that revamped customer engagement strategies, resulting in a 25% increase in user interactions and a 15% boost in overall satisfaction scores through targeted feedback loops.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;