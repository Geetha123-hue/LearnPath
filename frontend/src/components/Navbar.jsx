import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import logo from '../assets/logo.svg';
import { BookOpen, Compass, PlusCircle, LogOut, User, LogIn } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      backgroundColor: '#1e293b',
      borderBottom: '1px solid #334155',
      padding: '1rem 1.5rem',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src={logo} alt="LearnPath Logo" style={{ width: '32px', height: '32px' }} />
          <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#f8fafc' }}>
            Learn<span style={{ color: '#6366f1' }}>Path</span>
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#cbd5e1' }}>
            <Compass size={18} />
            <span>Explore</span>
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#cbd5e1' }}>
                <BookOpen size={18} />
                <span>My Dashboard</span>
              </Link>

              <Link to="/create-path" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#cbd5e1' }}>
                <PlusCircle size={18} />
                <span>Create Path</span>
              </Link>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '1rem', borderLeft: '1px solid #334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <img src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'} 
                       alt={user.username} 
                       style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #6366f1' }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{user.username}</span>
                </div>
                <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}>
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link to="/login" className="btn btn-outline">
                <LogIn size={16} />
                <span>Log In</span>
              </Link>
              <Link to="/register" className="btn btn-primary">
                <span>Sign Up</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
