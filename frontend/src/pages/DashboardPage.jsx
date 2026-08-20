import React from 'react';
import { useProgress } from '../hooks/useProgress';
import { useAuth } from '../hooks/useAuth';
import { PathCard } from '../components/PathCard';
import { Award, BookOpen, CheckCircle, Flame, Plus, Target, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { progressData, loading } = useProgress();

  if (loading || !progressData) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0', color: '#94a3b8' }}>
        <p>Loading your learning dashboard...</p>
      </div>
    );
  }

  const { enrolledCount, completedStepCount, paths } = progressData;
  const totalSteps = paths.reduce((total, path) => total + (path.totalSteps || 0), 0);
  const overallProgress = totalSteps ? Math.round((completedStepCount / totalSteps) * 100) : 0;
  const activePath = paths.find(path => path.progressPercentage < 100) || paths[0];
  const badges = [
    { label: 'First Step', detail: 'Complete your first topic', earned: completedStepCount >= 1, icon: Target },
    { label: 'Momentum', detail: 'Complete 5 topics', earned: completedStepCount >= 5, icon: Flame },
    { label: 'Path Finisher', detail: 'Finish a complete path', earned: paths.some(path => path.progressPercentage === 100), icon: Trophy }
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <div className="card" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.25rem' }}>
            Welcome back, <span style={{ color: '#6366f1' }}>{user?.username}</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Keep up the great work! Track your ongoing learning roadmaps below.
          </p>
        </div>
        <Link to="/create-path" className="btn btn-primary">
          <Plus size={18} />
          <span>Create New Path</span>
        </Link>
      </div>

      {/* Stats Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(99, 102, 241, 0.15)', borderRadius: '10px', color: '#6366f1' }}>
            <BookOpen size={28} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '500' }}>Enrolled Paths</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{enrolledCount}</h3>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(16, 185, 129, 0.15)', borderRadius: '10px', color: '#10b981' }}>
            <CheckCircle size={28} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '500' }}>Completed Steps</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{completedStepCount}</h3>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(245, 158, 11, 0.15)', borderRadius: '10px', color: '#f59e0b' }}>
            <Flame size={28} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '500' }}>Active Streak</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>3 Days</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-overview">
        <div className="card dashboard-focus">
          <div className="section-kicker"><Target size={17} /> Your focus</div>
          <h2>{activePath ? activePath.title : 'Choose your first roadmap'}</h2>
          <p>{activePath ? 'Keep moving through your active path. One completed topic today keeps your momentum alive.' : 'Explore the community library and enroll in a path that matches your next goal.'}</p>
          <Link to={activePath ? `/path/${activePath.id}` : '/'} className="btn btn-primary">
            {activePath ? 'Continue learning' : 'Explore roadmaps'}
          </Link>
        </div>
        <div className="card dashboard-progress-summary">
          <div className="section-kicker"><Award size={17} /> Overall progress</div>
          <div className="progress-number">{overallProgress}<span>%</span></div>
          <div className="progress-track"><div style={{ width: `${overallProgress}%` }} /></div>
          <p>{completedStepCount} of {totalSteps} topics completed</p>
        </div>
      </div>

      <section className="badges-section">
        <div className="section-heading">
          <div><span className="section-kicker"><Award size={17} /> Milestones</span><h2>Your badges</h2></div>
          <span className="muted-text">{badges.filter(badge => badge.earned).length} of {badges.length} earned</span>
        </div>
        <div className="badges-grid">
          {badges.map(({ label, detail, earned, icon: BadgeIcon }) => (
            <div className={`badge-card ${earned ? 'is-earned' : ''}`} key={label}>
              <div className="badge-icon"><BadgeIcon size={22} /></div>
              <div><strong>{label}</strong><p>{detail}</p></div>
              {earned && <CheckCircle size={18} className="badge-check" />}
            </div>
          ))}
        </div>
      </section>

      {/* Enrolled Paths Section */}
      <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.25rem' }}>Your Learning Paths</h2>

      {paths.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
          <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>You haven't enrolled in any learning paths yet.</p>
          <Link to="/" className="btn btn-primary">
            Explore Roadmaps
          </Link>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {paths.map(path => (
            <PathCard key={path.id} path={path} />
          ))}
        </div>
      )}
    </div>
  );
};
