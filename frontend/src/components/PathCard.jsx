import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, User } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

export const PathCard = ({ path }) => {
  const getBadgeClass = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'badge-beginner';
      case 'intermediate': return 'badge-intermediate';
      case 'advanced': return 'badge-advanced';
      default: return 'badge-beginner';
    }
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ position: 'relative', marginBottom: '1rem', overflow: 'hidden', borderRadius: '8px', height: '160px' }}>
        <img 
          src={path.cover_image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600'} 
          alt={path.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <span className={`badge ${getBadgeClass(path.difficulty)}`} style={{ position: 'absolute', top: '10px', right: '10px' }}>
          {path.difficulty}
        </span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '0.8rem', color: '#06b6d4', fontWeight: '600', textTransform: 'uppercase' }}>
          {path.category}
        </span>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', margin: '0.3rem 0 0.6rem 0', color: '#f8fafc' }}>
          {path.title}
        </h3>
        <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.25rem', flex: 1, lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {path.description}
        </p>

        {path.progressPercentage !== undefined && (
          <div style={{ marginBottom: '1rem' }}>
            <ProgressBar percentage={path.progressPercentage} totalSteps={path.totalSteps} completedSteps={path.completedSteps} />
          </div>
        )}

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid #334155',
          paddingTop: '1rem',
          fontSize: '0.85rem',
          color: '#64748b'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={15} />
            <span>{path.estimated_hours} Hours</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <BookOpen size={15} />
            <span>{path.total_steps || path.totalSteps || 0} Steps</span>
          </div>
        </div>

        <Link to={`/path/${path.id}`} className="btn btn-primary" style={{ marginTop: '1rem', justifyContent: 'center' }}>
          View Learning Path
        </Link>
      </div>
    </div>
  );
};
