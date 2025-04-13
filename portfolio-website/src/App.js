import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
      <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              
              <Hero />
              <About />
              <Experience />
              <Projects />
              <Skills />
              <Achievements />
              <Contact />
            </>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
