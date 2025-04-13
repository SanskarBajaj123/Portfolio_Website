import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      category: "Languages",
      skills: ["Python", "C", "C++", "HTML/CSS", "PHP", "JavaScript", "SQL", "Flask", "Django"]
    },
    {
      category: "Frameworks & Libraries",
      skills: ["NumPy", "Pandas", "Scikit Learn", "PyTorch", "TensorFlow", "Keras", "Bootstrap", "React"]
    },
    {
      category: "Tools & Platforms",
      skills: ["VS Code", "Google Colab", "Android Studio", "GitHub", "Linux", "AWS", "Google Cloud", "Render"]
    }
  ];

  return (
    <section id="skills" className="skills">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2>Technical Skills</h2>
        <div className="underline"></div>
      </motion.div>
      
      <div className="skills-container">
        {skillCategories.map((category, idx) => (
          <motion.div 
            key={idx} 
            className="skill-category"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 * idx }}
          >
            <h3>{category.category}</h3>
            <div className="skill-items">
              {category.skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <p>{skill}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;