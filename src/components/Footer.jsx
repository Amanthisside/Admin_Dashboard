import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: '8px',
        fontSize: '14px'
      }}>
        <span>Made with</span>
        <Heart size={16} style={{ color: 'var(--accent-danger)' }} />
        <span>by</span>
        <strong style={{ 
          color: 'var(--accent-primary)',
          fontWeight: '600'
        }}>
          AMAN
        </strong>
      </div>
      <div style={{ 
        marginTop: '8px',
        fontSize: '12px',
        color: 'var(--text-muted)'
      }}>
        © 2025 Admin Dashboard. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;