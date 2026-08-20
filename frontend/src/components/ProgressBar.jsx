import React from 'react';

export const ProgressBar = ({ percentage = 0, totalSteps = 0, completedSteps = 0, showDetails = true }) => {
  return (
    <div style={{ width: '100%' }}>
      {showDetails && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
          <span style={{ color: '#94a3b8', fontWeight: '500' }}>Progress</span>
          <span style={{ color: '#f8fafc', fontWeight: '600' }}>
            {completedSteps} / {totalSteps} Steps ({percentage}%)
          </span>
        </div>
      )}
      <div style={{
        width: '100%',
        height: '8px',
        backgroundColor: '#0f172a',
        borderRadius: '9999px',
        overflow: 'hidden',
        border: '1px solid #334155'
      }}>
        <div style={{
          width: `${Math.min(100, Math.max(0, percentage))}%`,
          height: '100%',
          backgroundColor: percentage === 100 ? '#10b981' : '#6366f1',
          transition: 'width 0.4s ease'
        }} />
      </div>
    </div>
  );
};
