import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  
  const projects = [
    {
      title: "Emotion Analysis of Tweets",
      description: "Designed and deployed an Emotion Detection Web App using a BiLSTM neural network, achieving 0.9130 test accuracy with stratified k-fold cross-validation on a labeled Twitter dataset. Built a complete NLP preprocessing pipeline with NLTK and TensorFlow/Keras, including tokenization. Compared BiLSTM model with Random Forest (0.8735) and XGBoost (0.8805), demonstrating superior performance across precision, recall, and F1-score. Integrated the model with a Flask API backend and a React frontend for real-time user emotion prediction.",
      technologies: ["BiLSTM Model", "TensorFlow", "Keras", "Flask", "ReactJs", "Render"],
      links: [
        { name: "GitHub", url: "#" },
        { name: "Live Demo", url: "#" }
      ]
    },
    {
      title: "College Management System",
      description: "Collaborated on a group project to develop a web-based College Management System with role-based authentication for Admin, Faculty, and Student portals. Implemented secure login and personalized dashboards using Django's built-in authentication. Admins managed departments and courses, faculty tracked academic performance, and students accessed their records and certificate applications. Developed core modules for managing academic records, fee payments, library resources, grievances, and feedback collection.",
      technologies: ["HTML/CSS", "JavaScript", "Django", "SQLite", "Bootstrap"],
      links: [
        { name: "GitHub", url: "#" }
      ]
    },
    {
      title: "Mini Election Portal",
      description: "Developed a comprehensive election management application using C language, handling electoral processes for over 200 voters and 20 candidates efficiently. Implemented distinct Admin and Student panels with secure authentication protocols, ensuring role-based access control and maintaining data integrity throughout the election cycle. Designed and utilized data structures such as structs and arrays to effectively manage and store candidate information, voter credentials, and vote counts.",
      technologies: ["C", "Data Structures"],
      links: [
        { name: "GitHub", url: "#" }
      ]
    }
  ];

  return (
    <section id="projects" className="projects">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2>Projects</h2>
        <div className="underline"></div>
      </motion.div>
      
      <div className="projects-container">
        <motion.div 
          className="project-tabs"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={`project-tab ${activeProject === index ? 'active' : ''}`}
              onClick={() => setActiveProject(index)}
            >
              {project.title}
            </div>
          ))}
        </motion.div>
        
        <motion.div 
          className="project-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          key={activeProject}
        >
          <h3>{projects[activeProject].title}</h3>
          <p>{projects[activeProject].description}</p>
          <div className="technologies">
            {projects[activeProject].technologies.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
          <div className="project-links">
            {projects[activeProject].links.map((link, index) => (
              <a key={index} href={link.url} className="project-link" target="_blank" rel="noopener noreferrer">
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;