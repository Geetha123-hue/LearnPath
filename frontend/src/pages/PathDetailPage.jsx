import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPathById } from '../services/pathService';
import { useProgress } from '../hooks/useProgress';
import { useAuth } from '../hooks/useAuth';
import { ProgressBar } from '../components/ProgressBar';
import { StepItem } from '../components/StepItem';
import { Clock, BookOpen, User, CheckCircle, ArrowLeft } from 'lucide-react';

export const PathDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { handleEnroll, handleToggleStep } = useProgress();

  const [path, setPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  const loadPath = async () => {
    try {
      const data = await fetchPathById(id);
      setPath(data);
    } catch (err) {
      console.error('Error loading path:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPath();
  }, [id]);

  const onEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setEnrolling(true);
    try {
      await handleEnroll(id);
      await loadPath();
    } catch (err) {
      alert('Failed to enroll. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  const onStepToggle = async (stepId) => {
    if (!path.isEnrolled) return;
    try {
      await handleToggleStep(stepId);
      await loadPath();
    } catch (err) {
      console.error('Failed to toggle step');
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '4rem 0', color: '#94a3b8' }}>Loading path details...</div>;
  }

  if (!path) {
    return <div style={{ textAlign: 'center', padding: '4rem 0', color: '#f87171' }}>Learning path not found.</div>;
  }

  return (
    <div>
      <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ marginBottom: '1.5rem', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
        <ArrowLeft size={16} />
        <span>Back</span>
      </button>

      {/* Header Info Banner */}
      <div className="card" style={{ marginBottom: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <img 
          src={path.cover_image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600'} 
          alt={path.title}
          style={{ width: '280px', height: '180px', objectFit: 'cover', borderRadius: '8px' }} 
        />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span style={{ color: '#06b6d4', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                {path.category}
              </span>
              <span className={`badge badge-${path.difficulty?.toLowerCase()}`}>
                {path.difficulty}
              </span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>{path.title}</h1>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1rem' }}>{path.description}</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #334155', paddingTop: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.9rem', color: '#94a3b8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={16} />
                <span>{path.estimated_hours} Hours Total</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={16} />
                <span>By {path.creator_name || 'Community'}</span>
              </div>
            </div>

            {path.isEnrolled ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: '600' }}>
                <CheckCircle size={20} />
                <span>Enrolled</span>
              </div>
            ) : (
              <button onClick={onEnroll} disabled={enrolling} className="btn btn-primary">
                {enrolling ? 'Enrolling...' : 'Enroll in Path'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar (If Enrolled) */}
      {path.isEnrolled && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <ProgressBar percentage={path.progressPercentage} totalSteps={path.totalSteps} completedSteps={path.completedSteps} />
        </div>
      )}

      {/* Modules & Steps Hierarchy */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.25rem' }}>Learning Curriculum</h2>

      {(path.modules || []).map((mod, idx) => (
        <div key={mod.id} className="card" style={{ marginBottom: '1.5rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#f8fafc' }}>
              {mod.title}
            </h3>
            {mod.description && (
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.2rem' }}>{mod.description}</p>
            )}
          </div>

          <div>
            {(mod.steps || []).map(step => (
              <StepItem key={step.id} step={step} onToggle={onStepToggle} isEnrolled={path.isEnrolled} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
