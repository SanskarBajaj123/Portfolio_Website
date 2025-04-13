import React from 'react';
import { motion } from 'framer-motion';
import './Achievements.css';

const Achievements = () => {
  const achievements = [
    {
      title: "Winter School of Deep Learning for Vision and Language Modeling",
      organization: "IIT Guwahati",
      description: "Successfully completed the program, gaining knowledge of various applications of Machine Learning and Deep Learning, including Natural Language Processing, Generative AI, and Image Processing."
    },
    {
      title: "Hospitality Lead - TantraFiesta 2024",
      organization: "IIIT Nagpur",
      description: "Secured position of Hospitality Lead in the College Annual Technical Fest TantraFiesta 2024 and Coordinator in college events like TantraFiesta 2023, Abhivyakti 2024."
    },
    {
      title: "Google Cloud Computing Foundations & Gen AI Certification",
      organization: "Google",
      description: "Completed Google Cloud Computing Foundations and Gen AI Certification Course by Google."
    },
    {
      title: "Marketing Hospitality Lead at Orator Club",
      organization: "IIIT Nagpur",
      description: "Led a 15+ member team, driving nationwide participation from 100+ institutes through effective event planning and stakeholder engagement."
    }
  ];

  return (
    <section id="achievements" className="achievements">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2>Achievements</h2>
        <div className="underline"></div>
      </motion.div>
      
      <div className="achievements-container">
        {achievements.map((achievement, index) => (
          <motion.div 
            key={index} 
            className="achievement-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <div className="achievement-content">
              <h3>{achievement.title}</h3>
              <h4>{achievement.organization}</h4>
              <p>{achievement.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;