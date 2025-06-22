import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import ThemeSelector from './ThemeSelector';

const Header = ({ onMenuClick }) => {
  return (
    <header style={{
      backgroundColor: 'var(--bg-primary)',
      borderBottom: '1px solid var(--border-color)',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: 'var(--shadow)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          className="btn btn-secondary"
          onClick={onMenuClick}
          style={{ padding: '8px' }}
        >
          <Menu size={20} />
        </button>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: '700',
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Admin Dashboard
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search 
            size={18} 
            style={{ 
              position: 'absolute', 
              left: '12px', 
              color: 'var(--text-muted)' 
            }} 
          />
          <input
            type="text"
            placeholder="Search..."
            className="input"
            style={{ 
              paddingLeft: '40px', 
              width: '300px',
              '@media (max-width: 768px)': {
                width: '200px'
              }
            }}
          />
        </div>
        
        <ThemeSelector />
        
        <button className="btn btn-secondary" style={{ padding: '8px' }}>
          <Bell size={18} />
        </button>
        
        <button className="btn btn-secondary" style={{ padding: '8px' }}>
          <User size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;