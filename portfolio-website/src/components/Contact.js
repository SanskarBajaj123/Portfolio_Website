import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log(formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    alert('Thank you for your message! I will get back to you soon.');
  };

  return (
    <section id="contact" className="contact">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2>Get In Touch</h2>
        <div className="underline"></div>
      </motion.div>
      
      <div className="contact-container">
        <motion.div 
          className="contact-info"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3>Let's Connect</h3>
          <p>Feel free to reach out for collaborations, opportunities, or just to say hello!</p>
          
          <div className="contact-details">
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <p>bsanskar123@gmail.com</p>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <p>+91 9021628377</p>
            </div>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <p>Nagpur, Maharashtra, India</p>
            </div>
          </div>
          
          <div className="social-links">
            <a href="https://linkedin.com/in/sanskar-bajaj8377" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/SanskarBajaj123" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="mailto:bsanskar123@gmail.com">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          className="contact-form"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;