import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const carouselRef = useRef(null);
  
  const projects = [
    {
      title: "SimplySpent",
      description: "A robust cross-platform expense tracker built with React and React Native. Engineered a secure backend architecture utilizing Supabase, incorporating advanced Row Level Security (RLS) policies to ensure absolute data privacy and isolation for multi-tenant users. Delivered a highly responsive UI with real-time state synchronization.",
      technologies: ["React", "React Native", "Supabase", "PostgreSQL", "RLS"],
      links: [
        { name: "GitHub", url: "https://github.com/SanskarBajaj123/SimplySpent" },
        { name: "Live Demo", url: "https://simply-spent-dusky.vercel.app/" }
      ]
    },
    {
      title: "Emotion Analysis of Tweets",
      description: "Designed and deployed an Emotion Detection Web App using a BiLSTM neural network, achieving 91.3% test accuracy with stratified k-fold cross-validation on a labeled Twitter dataset. Built a complete NLP preprocessing pipeline with NLTK and TensorFlow/Keras. Integrated the model with a Flask API backend and a React frontend for real-time inference.",
      technologies: ["BiLSTM", "TensorFlow", "Flask", "React", "NLP"],
      links: [
        { name: "GitHub", url: "https://github.com/SanskarBajaj123/Emotion_Analyzer" },
        { name: "Live Demo", url: "https://emotion-analyzer-site.onrender.com/" }
      ]
    },
    {
      title: "Sentiment Analysis of Tweets",
      description: "Built and deployed a Sentiment Analysis Web App using traditional machine learning models (Logistic Regression, Naive Bayes). Implemented a robust NLP pipeline using NLTK for stemming, stopword removal, and vectorization with TF-IDF. Achieved high accuracy and integrated with a scalable Flask backend.",
      technologies: ["Logistic Regression", "Naive Bayes", "NLTK", "TF-IDF", "Flask"],
      links: [
        { name: "GitHub", url: "https://github.com/SanskarBajaj123/Sentiment_Analyzer" },
        { name: "Live Demo", url: "https://sentiment-analyzer-frontend.onrender.com/" }
      ]
    },
    {
      title: "College Management System",
      description: "Collaborated on a web-based CMS with role-based authentication for Admin, Faculty, and Student portals. Implemented secure login and personalized dashboards using Django. Developed modules for academic records, fee payments, and feedback collection.",
      technologies: ["Django", "Python", "SQLite", "JavaScript", "Bootstrap"],
      links: [
        { name: "GitHub", url: "https://github.com/SanskarBajaj123/Student_management" }
      ]
    }
  ];

  const getVisibleProjects = () => {
    return [...projects, ...projects.slice(0, 3)];
  };

  useEffect(() => {
    let interval;
    if (autoScroll) {
      interval = setInterval(() => {
        setActiveProject((prev) => (prev + 1) % projects.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoScroll, projects.length]);

  useEffect(() => {
    if (carouselRef.current) {
      const activeElement = carouselRef.current.children[activeProject];
      if (activeElement) {
        const scrollPosition = activeElement.offsetLeft - (carouselRef.current.offsetWidth / 2) + (activeElement.offsetWidth / 2);
        carouselRef.current.scroll({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [activeProject]);

  const handleTabClick = (index) => {
    setActiveProject(index % projects.length);
    setAutoScroll(false);
    setTimeout(() => setAutoScroll(true), 30000);
  };

  return (
    <section id="projects" className="projects">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2>PROJECTS</h2>
        <div className="underline"></div>
      </motion.div>
      
      <div className="projects-container">
        <div className="carousel-wrapper">
          <motion.div 
            className="project-carousel"
            ref={carouselRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {getVisibleProjects().map((project, index) => (
              <div 
                key={index} 
                className={`project-tab ${activeProject === index % projects.length ? 'active' : ''}`}
                onClick={() => handleTabClick(index)}
              >
                {project.title}
              </div>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="project-content true-glass"
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