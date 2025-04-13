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
    },
    {
      title: "Portfolio Website",
      description: "Designed and developed a responsive personal portfolio website using modern web technologies. Implemented interactive components and animations to create an engaging user experience. The website showcases projects, skills, and professional experience in a clean and intuitive interface.",
      technologies: ["React", "Framer Motion", "CSS", "Responsive Design"],
      links: [
        { name: "GitHub", url: "#" },
        { name: "Live Demo", url: "#" }
      ]
    },
    {
      title: "Weather Forecast App",
      description: "Created a weather forecast application that provides real-time weather data for any location. Integrated with a weather API to fetch accurate weather information and display it in a user-friendly interface. Implemented features such as current conditions, daily forecasts, and location search.",
      technologies: ["JavaScript", "API Integration", "HTML/CSS", "React"],
      links: [
        { name: "GitHub", url: "#" },
        { name: "Live Demo", url: "#" }
      ]
    },
    {
      title: "E-Commerce Platform",
      description: "Built a full-featured e-commerce platform with product listings, shopping cart functionality, and secure checkout process. Implemented user authentication, product search and filtering, and order management. Utilized responsive design principles to ensure optimal viewing across various devices.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Payment Gateway"],
      links: [
        { name: "GitHub", url: "#" }
      ]
    },
    {
      title: "Task Management System",
      description: "Developed a task management application to help users organize and prioritize their daily activities. Implemented features such as task creation, categorization, deadline setting, and progress tracking. The system includes notification reminders and visual progress indicators.",
      technologies: ["React", "Redux", "Local Storage", "CSS"],
      links: [
        { name: "GitHub", url: "#" },
        { name: "Live Demo", url: "#" }
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