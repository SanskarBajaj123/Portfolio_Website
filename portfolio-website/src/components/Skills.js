import React from 'react';
import { motion } from 'framer-motion';
import {
  SiPytorch, SiTensorflow, SiScikitlearn, SiNumpy, SiPandas,
  SiLangchain, SiOpenai, SiAnthropic, SiGooglegemini,
  SiReact, SiNodedotjs, SiExpress, SiDjango, SiFlask, SiFastapi,
  SiPython, SiJavascript, SiTypescript, SiMysql, SiC, SiCplusplus,
  SiAmazonwebservices, SiGooglecloud, SiOracle, SiVercel, SiRender, SiGithub,
  SiLinear, SiNotion, SiN8N, SiGooglesheets
} from 'react-icons/si';
import { FaBrain, FaCode, FaTools, FaLink } from 'react-icons/fa';
import { BsRobot } from 'react-icons/bs';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      category: "AI & Machine Learning",
      skills: [
        { name: "PyTorch", icon: SiPytorch },
        { name: "TensorFlow", icon: SiTensorflow },
        { name: "Scikit-Learn", icon: SiScikitlearn },
        { name: "NumPy", icon: SiNumpy },
        { name: "Pandas", icon: SiPandas },
        { name: "LangChain", icon: SiLangchain },
        { name: "LangSmith", icon: FaTools },
        { name: "OpenAI API", icon: SiOpenai },
        { name: "Anthropic API", icon: SiAnthropic },
        { name: "Gemini", icon: SiGooglegemini },
        { name: "Mistral AI", icon: BsRobot },
        { name: "DeepSeek", icon: BsRobot },
        { name: "GLM", icon: FaBrain }
      ],
      span: "span 2"
    },
    {
      category: "Frameworks & Libraries",
      skills: [
        { name: "React", icon: SiReact },
        { name: "React Native", icon: SiReact },
        { name: "Node.js", icon: SiNodedotjs },
        { name: "Express", icon: SiExpress },
        { name: "Django", icon: SiDjango },
        { name: "Flask", icon: SiFlask },
        { name: "FastAPI", icon: SiFastapi }
      ],
      span: "span 1"
    },
    {
      category: "Languages",
      skills: [
        { name: "Python", icon: SiPython },
        { name: "JavaScript", icon: SiJavascript },
        { name: "TypeScript", icon: SiTypescript },
        { name: "SQL", icon: SiMysql },
        { name: "C", icon: SiC },
        { name: "C++", icon: SiCplusplus }
      ],
      span: "span 1"
    },
    {
      category: "Cloud & DevOps",
      skills: [
        { name: "AWS", icon: SiAmazonwebservices },
        { name: "Google Cloud", icon: SiGooglecloud },
        { name: "Oracle Cloud", icon: SiOracle },
        { name: "Vercel", icon: SiVercel },
        { name: "Render", icon: SiRender },
        { name: "GitHub", icon: SiGithub }
      ],
      span: "span 2"
    },
    {
      category: "Product & Automation",
      skills: [
        { name: "Linear", icon: SiLinear },
        { name: "Notion", icon: SiNotion },
        { name: "n8n", icon: SiN8N },
        { name: "Google Sheets", icon: SiGooglesheets },
        { name: "Mermaid", icon: FaLink },
        { name: "Claude Code", icon: FaCode }
      ],
      span: "span 2"
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
        <h2>Technical Arsenal</h2>
        <div className="underline"></div>
      </motion.div>

      <div className="skills-bento-grid">
        {skillCategories.map((category, idx) => (
          <motion.div 
            key={idx} 
            className={`bento-card true-glass ${category.span === 'span 2' ? 'span-2' : ''}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <h3>{category.category}</h3>
            <div className="futuristic-skill-grid">
              {category.skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div key={index} className="skill-logo-card">
                    <div className="skill-icon-wrapper">
                      {Icon && <Icon className="skill-icon" />}
                    </div>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
