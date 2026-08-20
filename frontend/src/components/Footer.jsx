import React from 'react';

export const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#0f172a',
      borderTop: '1px solid #334155',
      padding: '2rem 1.5rem',
      marginTop: 'auto',
      textAlign: 'center',
      color: '#64748b',
      fontSize: '0.9rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p>© {new Date().getFullYear()} LearnPath Platform. Empowering continuous self-guided learning.</p>
      </div>
    </footer>
  );
};
