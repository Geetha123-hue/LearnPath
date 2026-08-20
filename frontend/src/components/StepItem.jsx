import React from 'react';
import { CheckCircle2, Circle, ExternalLink, Video, FileText, Code, HelpCircle } from 'lucide-react';

export const StepItem = ({ step, onToggle, isEnrolled }) => {
  const getIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'video': return <Video size={18} style={{ color: '#ec4899' }} />;
      case 'project': return <Code size={18} style={{ color: '#10b981' }} />;
      case 'quiz': return <HelpCircle size={18} style={{ color: '#f59e0b' }} />;
      default: return <FileText size={18} style={{ color: '#06b6d4' }} />;
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.85rem 1rem',
      backgroundColor: '#0f172a',
      border: '1px solid #334155',
      borderRadius: '8px',
      marginBottom: '0.5rem',
      transition: 'border-color 0.2s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {isEnrolled ? (
          <button 
            onClick={() => onToggle(step.id)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
            {step.completed ? (
              <CheckCircle2 size={22} style={{ color: '#10b981' }} />
            ) : (
              <Circle size={22} style={{ color: '#64748b' }} />
            )}
          </button>
        ) : (
          <Circle size={22} style={{ color: '#475569' }} />
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {getIcon(step.resource_type)}
          <span style={{
            fontSize: '0.95rem',
            fontWeight: '500',
            color: step.completed ? '#94a3b8' : '#f8fafc',
            textDecoration: step.completed ? 'line-through' : 'none'
          }}>
            {step.title}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {step.estimated_minutes && (
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
            {step.estimated_minutes} mins
          </span>
        )}
        {step.resource_url && (
          <a href={step.resource_url} target="_blank" rel="noopener noreferrer" 
             style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#6366f1', fontSize: '0.85rem', fontWeight: '500' }}>
            <span>Resource</span>
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  );
};
