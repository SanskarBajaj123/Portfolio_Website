import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const carouselRef = useRef(null);
  
  const projects = [
    {
      title: "Emotion Analysis of Tweets",
      description: "Designed and deployed an Emotion Detection Web App using a BiLSTM neural network, achieving 0.9130 test accuracy with stratified k-fold cross-validation on a labeled Twitter dataset. Built a complete NLP preprocessing pipeline with NLTK and TensorFlow/Keras, including tokenization. Compared BiLSTM model with Random Forest (0.8735) and XGBoost (0.8805), demonstrating superior performance across precision, recall, and F1-score. Integrated the model with a Flask API backend and a React frontend for real-time user emotion prediction.",
      technologies: ["BiLSTM Model", "TensorFlow", "Keras", "Flask", "ReactJs", "Render"],
      links: [
        { name: "GitHub", url: "https://github.com/SanskarBajaj123/Emotion_Analyzer" },
        { name: "Live Demo", url: "https://emotion-analyzer-site.onrender.com/" }
      ]
    },
    {
      title: "Sentiment Analysis of Tweets",
      description: "Built and deployed a Sentiment Analysis Web App using traditional machine learning models including Logistic Regression and Naive Bayes. Implemented a robust NLP pipeline using NLTK for preprocessing tasks such as stemming, stopword removal, and vectorization with TF-IDF. Developed an intuitive frontend using HTML, CSS, and JavaScript integrated with a Flask backend for real-time tweet sentiment classification. Achieved high accuracy and performance across multiple test datasets.",
      technologies: ["Logistic Regression", "Naive Bayes", "NLTK", "TF-IDF", "Flask", "HTML/CSS/JS", "Render"],
      links: [
        { name: "GitHub", url: "https://github.com/SanskarBajaj123/Sentiment_Analyzer" },
        { name: "Live Demo", url: "https://sentiment-analyzer-frontend.onrender.com/" }
      ]
    },
    
    {
      title: "College Management System",
      description: "Collaborated on a group project to develop a web-based College Management System with role-based authentication for Admin, Faculty, and Student portals. Implemented secure login and personalized dashboards using Django's built-in authentication. Admins managed departments and courses, faculty tracked academic performance, and students accessed their records and certificate applications. Developed core modules for managing academic records, fee payments, library resources, grievances, and feedback collection.",
      technologies: ["HTML/CSS", "JavaScript", "Django", "SQLite", "Bootstrap"],
      links: [
        { name: "GitHub", url: "https://github.com/SanskarBajaj123/Student_management" }
      ]
    },
    {
      title: "Mini Election Portal",
      description: "Developed a comprehensive election management application using C language, handling electoral processes for over 200 voters and 20 candidates efficiently. Implemented distinct Admin and Student panels with secure authentication protocols, ensuring role-based access control and maintaining data integrity throughout the election cycle. Designed and utilized data structures such as structs and arrays to effectively manage and store candidate information, voter credentials, and vote counts.",
      technologies: ["C", "Data Structures"],
      links: [
        { name: "GitHub", url: "https://github.com/SanskarBajaj123/Mini-Election-Portal" }
      ]
    },
    {
      title: "Savory Bites: Exploring Culinary Delights",
      description: "Developed a full-stack Cafe Management Web App that streamlines the process of managing menu items, orders, and table bookings. The system enables users to explore various cuisines, manage daily specials, and process customer orders efficiently. Utilized Flask for backend logic and MySQL for data management, paired with a visually appealing frontend built using HTML, CSS, JavaScript, and Bootstrap to enhance the user experience.",
      technologies: ["Flask", "MySQL", "HTML/CSS/JS", "Bootstrap", "Jinja2"],
      links: [
        { name: "GitHub", url: "https://github.com/SanskarBajaj123/group_project" }
      ]
    }
    
  ];

  // Get visible projects for circular effect
  const getVisibleProjects = () => {
    // Create a circular array of projects
    return [...projects, ...projects.slice(0, 3)];
  };

  // Auto-scroll functionality
  useEffect(() => {
    let interval;
    if (autoScroll) {
      interval = setInterval(() => {
        setActiveProject((prev) => (prev + 1) % projects.length);
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [autoScroll, projects.length]);

  // Shift carousel position when active project changes
  useEffect(() => {
    if (carouselRef.current) {
      // Calculate position to center active project
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

  // Pause auto-scroll when user interacts
  const handleTabClick = (index) => {
    setActiveProject(index % projects.length);
    setAutoScroll(false);
    // Resume auto-scroll after 30 seconds of inactivity
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