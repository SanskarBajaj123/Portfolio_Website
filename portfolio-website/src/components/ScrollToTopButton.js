import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import './ScrollToTop.css';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    visible && (
      <div className="scroll-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <FaArrowUp />
      </div>
    )
  );
};

export default ScrollToTopButton;
