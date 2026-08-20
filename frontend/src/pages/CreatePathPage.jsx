import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLearningPath } from '../services/pathService';
import { Plus, Trash2, PlusCircle, ArrowLeft } from 'lucide-react';

export const CreatePathPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [estimatedHours, setEstimatedHours] = useState(10);
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600');

  const [modules, setModules] = useState([
    {
      title: 'Module 1: Introduction',
      description: 'Getting started fundamentals',
      steps: [
        { title: 'Overview Article', resourceType: 'article', resourceUrl: 'https://example.com', estimatedMinutes: 30 }
      ]
    }
  ]);

  const addModule = () => {
    setModules([...modules, {
      title: `Module ${modules.length + 1}: New Module`,
      description: '',
      steps: [{ title: 'New Step', resourceType: 'article', resourceUrl: '', estimatedMinutes: 20 }]
    }]);
  };

  const removeModule = (mIdx) => {
    setModules(modules.filter((_, idx) => idx !== mIdx));
  };

  const addStep = (mIdx) => {
    const updated = [...modules];
    updated[mIdx].steps.push({ title: '', resourceType: 'article', resourceUrl: '', estimatedMinutes: 20 });
    setModules(updated);
  };

  const removeStep = (mIdx, sIdx) => {
    const updated = [...modules];
    updated[mIdx].steps = updated[mIdx].steps.filter((_, idx) => idx !== sIdx);
    setModules(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await createLearningPath({
        title,
        description,
        category,
        difficulty,
        estimatedHours: Number(estimatedHours),
        coverImage,
        modules
      });
      navigate(`/path/${result.path.id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create learning path.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ marginBottom: '1.5rem', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
        <ArrowLeft size={16} />
        <span>Back</span>
      </button>

      <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>Create Learning Path</h1>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Design a structured step-by-step roadmap for yourself or others.</p>

      {error && (
        <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.25rem' }}>Basic Details</h2>

          <div className="form-group">
            <label>Path Title *</label>
            <input type="text" required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Master React in 30 Days" className="form-input" />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea required rows={3} value={description} onChange={e => setDescription(e.target.value)} placeholder="What will learners achieve in this roadmap?" className="form-textarea" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="form-select">
                <option value="Web Development">Web Development</option>
                <option value="Data Science">Data Science</option>
                <option value="DevOps">DevOps</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="General">General</option>
              </select>
            </div>

            <div className="form-group">
              <label>Difficulty</label>
              <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="form-select">
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="form-group">
              <label>Estimated Hours</label>
              <input type="number" min={1} value={estimatedHours} onChange={e => setEstimatedHours(e.target.value)} className="form-input" />
            </div>
          </div>
        </div>

        {/* Modules Builder */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '700' }}>Modules & Steps</h2>
          <button type="button" onClick={addModule} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
            <Plus size={16} />
            <span>Add Module</span>
          </button>
        </div>

        {modules.map((mod, mIdx) => (
          <div key={mIdx} className="card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid #6366f1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <input 
                type="text" 
                required 
                value={mod.title} 
                onChange={e => {
                  const updated = [...modules];
                  updated[mIdx].title = e.target.value;
                  setModules(updated);
                }} 
                placeholder="Module Title" 
                className="form-input" 
                style={{ fontWeight: '700', fontSize: '1.1rem' }} 
              />
              {modules.length > 1 && (
                <button type="button" onClick={() => removeModule(mIdx)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', marginLeft: '0.5rem' }}>
                  <Trash2 size={18} />
                </button>
              )}
            </div>

            {/* Steps List */}
            {mod.steps.map((step, sIdx) => (
              <div key={sIdx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                <input 
                  type="text" 
                  required 
                  value={step.title} 
                  onChange={e => {
                    const updated = [...modules];
                    updated[mIdx].steps[sIdx].title = e.target.value;
                    setModules(updated);
                  }} 
                  placeholder="Step title" 
                  className="form-input" 
                  style={{ flex: 2 }} 
                />
                <select 
                  value={step.resourceType} 
                  onChange={e => {
                    const updated = [...modules];
                    updated[mIdx].steps[sIdx].resourceType = e.target.value;
                    setModules(updated);
                  }} 
                  className="form-select" 
                  style={{ flex: 1 }}
                >
                  <option value="article">Article</option>
                  <option value="video">Video</option>
                  <option value="project">Project</option>
                  <option value="quiz">Quiz</option>
                </select>
                <input 
                  type="url" 
                  value={step.resourceUrl} 
                  onChange={e => {
                    const updated = [...modules];
                    updated[mIdx].steps[sIdx].resourceUrl = e.target.value;
                    setModules(updated);
                  }} 
                  placeholder="URL (optional)" 
                  className="form-input" 
                  style={{ flex: 2 }} 
                />
                {mod.steps.length > 1 && (
                  <button type="button" onClick={() => removeStep(mIdx, sIdx)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}

            <button type="button" onClick={() => addStep(mIdx)} style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <PlusCircle size={15} />
              <span>Add Step to Module</span>
            </button>
          </div>
        ))}

        <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontSize: '1rem', marginTop: '1rem' }}>
          {loading ? 'Publishing Path...' : 'Publish Learning Path'}
        </button>
      </form>
    </div>
  );
};
