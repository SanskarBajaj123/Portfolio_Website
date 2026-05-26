import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import './Experience.css';

const Experience = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 450;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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
      
      <div className="horizontal-exp-wrapper">
        <button className="scroll-btn left" onClick={() => scroll('left')}>&#8249;</button>
        
        <div className="horizontal-exp-container" ref={scrollRef}>
          <motion.div 
            className="horizontal-exp-card true-glass"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="exp-header">
              <div className="exp-title">
                <h3>AI Product Analyst Intern</h3>
                <h4>Kookar AI <span>&bull; Gurugram, Haryana</span></h4>
              </div>
              <div className="exp-period">June 2025 – June 2026</div>
            </div>
            <ul className="exp-list">
              <li>Built and shipped core orchestration agents for Kookar's WhatsApp-based kitchen product, achieving 99% accuracy on AI-evaluator benchmarks.</li>
              <li>Developed and deployed 12+ culinary agents across meal generation, editing, and dish suggestions workflows.</li>
              <li>Owned complete AI feature lifecycle: problem scoping, R&D, prompt engineering, knowledge-base design, and LLM evaluation (Anthropic, OpenAI, Gemini).</li>
              <li>Served as QC and Issue Manager, triaging product defects and tracking resolution to improve reliability.</li>
              <li>Built 10+ automation workflows using n8n and Python for agent metrics tracking and LLM evaluation pipelines.</li>
            </ul>
          </motion.div>

          <motion.div 
            className="horizontal-exp-card true-glass"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="exp-header">
              <div className="exp-title">
                <h3>Growth Intern</h3>
                <h4>FACT App <span>&bull; Remote</span></h4>
              </div>
              <div className="exp-period">June 2023 – July 2023</div>
            </div>
            <ul className="exp-list">
              <li>Developed the Front-end of the FACT App website using HTML/CSS.</li>
              <li>Successfully acquired over 500 new users through targeted digital and in-person marketing strategies within one month.</li>
              <li>Spearheaded a month-long initiative that revamped customer engagement strategies, resulting in a 25% increase in user interactions and a 15% boost in overall satisfaction scores.</li>
            </ul>
          </motion.div>
        </div>
        
        <button className="scroll-btn right" onClick={() => scroll('right')}>&#8250;</button>
      </div>
    </section>
  );
};

export default Experience;