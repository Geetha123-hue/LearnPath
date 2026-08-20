import React from 'react';
import { useFetchPaths } from '../hooks/useFetchPaths';
import { PathCard } from '../components/PathCard';
import { ArrowRight, BookOpen, CheckCircle2, Compass, Rocket, Sparkles, Users } from 'lucide-react';

export const HomePage = () => {
  const { paths, loading, selectedCategory, setSelectedCategory, allPaths } = useFetchPaths();
  const [career, setCareer] = React.useState('All');

  const categories = ['All', ...new Set((allPaths || []).map(p => p.category))];
  const careerPaths = career === 'All' ? allPaths : allPaths.filter(path => path.category === career);
  const visiblePaths = career === 'All' ? paths : careerPaths;
  const featuredPath = careerPaths?.[0];

  const handleCareerChange = (value) => {
    setCareer(value);
    setSelectedCategory(value === 'All' ? 'All' : value);
  };

  return (
    <div>
      <section className="home-hero">
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.35rem 1rem',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: '9999px',
          color: '#818cf8',
          fontSize: '0.85rem',
          fontWeight: '600',
          marginBottom: '1.25rem'
        }}>
          <Sparkles size={16} />
          <span>Structured Learning Roadmaps</span>
        </div>
        <h1>
          Find your next <span>career direction.</span>
        </h1>
        <p>
          Pick a goal and get a practical roadmap built from free resources, community knowledge, and small steps you can finish.
        </p>
        <div className="career-picker">
          <label htmlFor="career-select">I want to learn</label>
          <div className="career-picker-row">
            <select id="career-select" className="form-select" value={career} onChange={(event) => handleCareerChange(event.target.value)}>
              <option value="All">Any career path</option>
              {categories.filter(category => category !== 'All').map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <a href="#roadmaps" className="btn btn-primary"><Rocket size={18} /> Show my roadmap <ArrowRight size={17} /></a>
          </div>
          {featuredPath && (
            <div className="career-result">
              <CheckCircle2 size={17} />
              <span>Recommended: <strong>{featuredPath.title}</strong></span>
            </div>
          )}
        </div>
      </section>

      <section className="feature-strip" aria-label="LearnPath benefits">
        <div><BookOpen size={21} /><span><strong>Structured</strong> step-by-step roadmaps</span></div>
        <div><CheckCircle2 size={21} /><span><strong>Trackable</strong> progress and milestones</span></div>
        <div><Users size={21} /><span><strong>Community</strong> paths that keep evolving</span></div>
      </section>

      {/* Category Filter */}
      <div id="roadmaps" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Compass size={22} style={{ color: '#6366f1' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Explore Learning Paths</h2>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setCareer(cat); }}
              className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Path List Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#94a3b8' }}>
          <p>Loading learning paths...</p>
        </div>
      ) : visiblePaths.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#94a3b8' }}>
          <p>No learning paths found in this category.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {visiblePaths.map(path => (
            <PathCard key={path.id} path={path} />
          ))}
        </div>
      )}
    </div>
  );
};
