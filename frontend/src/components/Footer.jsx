import React from 'react';

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p>© {new Date().getFullYear()} LearnPath Platform. Empowering continuous self-guided learning.</p>
      </div>
    </footer>
  );
};
