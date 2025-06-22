import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Table, 
  BarChart3, 
  Calendar as CalendarIcon, 
  Trello,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/tables', icon: Table, label: 'Tables' },
    { path: '/charts', icon: BarChart3, label: 'Charts' },
    { path: '/calendar', icon: CalendarIcon, label: 'Calendar' },
    { path: '/kanban', icon: Trello, label: 'Kanban' }
  ];

  return (
    <>
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            display: 'block'
          }}
          onClick={onClose}
        />
      )}
      
      <aside 
        className={`sidebar ${isOpen ? 'open' : ''}`}
        style={{
          width: '250px',
          padding: '20px 0',
          position: 'fixed',
          height: '100vh',
          top: 0,
          left: 0,
          zIndex: 1000,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease'
        }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '0 20px',
          marginBottom: '30px'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Menu</h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        <nav>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 20px',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  borderRight: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent',
                  backgroundColor: isActive ? 'var(--bg-tertiary)' : 'transparent',
                  transition: 'all 0.2s ease',
                  fontWeight: isActive ? '600' : '400'
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Desktop sidebar */}
      <aside 
        className="sidebar"
        style={{
          width: '250px',
          padding: '20px 0',
          position: 'sticky',
          top: '73px',
          height: 'calc(100vh - 73px)',
          display: window.innerWidth > 768 ? 'block' : 'none'
        }}
      >
        <div style={{ 
          padding: '0 20px',
          marginBottom: '30px'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Menu</h2>
        </div>

        <nav>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 20px',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  borderRight: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent',
                  backgroundColor: isActive ? 'var(--bg-tertiary)' : 'transparent',
                  transition: 'all 0.2s ease',
                  fontWeight: isActive ? '600' : '400'
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;