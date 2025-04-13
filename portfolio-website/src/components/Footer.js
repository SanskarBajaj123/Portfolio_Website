import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <span>Sanskar V. Bajaj</span>
                </div>
                <p>© {new Date().getFullYear()} Sanskar Bajaj. All rights reserved.</p>
                <div className="footer-links">
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
            </div>
        </footer>
    );
};

export default Footer;