import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      category: "Languages",
      skills: ["Python", "C", "C++", "HTML/CSS", "PHP", "JavaScript", "SQL"]
    },
    {
      category: "Frameworks & Libraries",
      skills: ["Flask", "Django","NumPy", "Pandas", "Scikit-Learn", "PyTorch", "TensorFlow", "Keras", "Bootstrap", "React"]
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
          <div key={idx} className="skill-category">
            <h3>{category.category}</h3>
            <div className="scrolling-wrapper">
              <div className="scrolling-content">
                {[...category.skills, ...category.skills].map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-info">
                      <p>{skill}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
