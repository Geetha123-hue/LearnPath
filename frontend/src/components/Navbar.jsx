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
    <nav className="site-nav">
      <div className="site-nav-inner">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src={logo} alt="LearnPath Logo" style={{ width: '32px', height: '32px' }} />
          <span className="brand-name">
            Learn<span>Path</span>
          </span>
        </Link>

        <div className="site-nav-links">
          <Link to="/" className="nav-link">
            <Compass size={18} />
            <span>Explore</span>
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">
                <BookOpen size={18} />
                <span>My Dashboard</span>
              </Link>

              <Link to="/create-path" className="nav-link">
                <PlusCircle size={18} />
                <span>Create Path</span>
              </Link>

              <div className="nav-user">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <img src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'} 
                       alt={user.username} 
                       style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #0f9f92' }} />
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
