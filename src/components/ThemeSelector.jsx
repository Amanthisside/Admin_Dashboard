import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeSelector = () => {
  const { theme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button 
        className="btn btn-secondary"
        onClick={() => setIsOpen(!isOpen)}
        style={{ padding: '8px' }}
      >
        <Palette size={18} />
      </button>
      
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '8px',
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          boxShadow: 'var(--shadow-lg)',
          padding: '8px',
          minWidth: '150px',
          zIndex: 1000
        }}>
          {themes.map((themeOption) => (
            <button
              key={themeOption.id}
              onClick={() => {
                setTheme(themeOption.id);
                setIsOpen(false);
              }}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: 'none',
                backgroundColor: theme === themeOption.id ? 'var(--accent-primary)' : 'transparent',
                color: theme === themeOption.id ? 'white' : 'var(--text-primary)',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '4px',
                transition: 'all 0.2s ease'
              }}
            >
              <span>{themeOption.icon}</span>
              <span>{themeOption.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;