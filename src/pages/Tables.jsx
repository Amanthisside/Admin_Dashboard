import React, { useState } from 'react';
import { Search, Filter, Download, Plus, Edit, Trash2, Eye } from 'lucide-react';

const Tables = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', joinDate: '2024-01-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Editor', status: 'Inactive', joinDate: '2024-02-01' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'User', status: 'Active', joinDate: '2024-02-10' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', role: 'Admin', status: 'Active', joinDate: '2024-02-15' },
    { id: 6, name: 'Lisa Davis', email: 'lisa@example.com', role: 'Editor', status: 'Inactive', joinDate: '2024-03-01' },
    { id: 7, name: 'David Miller', email: 'david@example.com', role: 'User', status: 'Active', joinDate: '2024-03-05' },
    { id: 8, name: 'Emma Garcia', email: 'emma@example.com', role: 'User', status: 'Active', joinDate: '2024-03-10' }
  ]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedUsers = users
    .filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const getStatusBadge = (status) => {
    const baseStyle = {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    };

    if (status === 'Active') {
      return {
        ...baseStyle,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        color: 'var(--accent-secondary)'
      };
    } else {
      return {
        ...baseStyle,
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        color: 'var(--accent-danger)'
      };
    }
  };

  const getRoleBadge = (role) => {
    const baseStyle = {
      padding: '4px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '500'
    };

    switch (role) {
      case 'Admin':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          color: 'var(--accent-primary)'
        };
      case 'Editor':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          color: 'var(--accent-warning)'
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: 'var(--bg-tertiary)',
          color: 'var(--text-secondary)'
        };
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
          User Management
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Manage and organize your users with advanced table features.
        </p>
      </div>

      {/* Table Controls */}
      <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <Search 
                size={18} 
                style={{ 
                  position: 'absolute', 
                  left: '12px', 
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)' 
                }} 
              />
              <input
                type="text"
                placeholder="Search users..."
                className="input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '40px', width: '300px' }}
              />
            </div>
            <button className="btn btn-secondary">
              <Filter size={16} />
              Filter
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary">
              <Download size={16} />
              Export
            </button>
            <button className="btn btn-primary">
              <Plus size={16} />
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th 
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSort('name')}
                >
                  Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSort('email')}
                >
                  Email {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSort('role')}
                >
                  Role {sortField === 'role' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSort('status')}
                >
                  Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSort('joinDate')}
                >
                  Join Date {sortField === 'joinDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}>
                        {user.name.charAt(0)}
                      </div>
                      <span style={{ fontWeight: '500' }}>{user.name}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{user.email}</td>
                  <td>
                    <span style={getRoleBadge(user.role)}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span style={getStatusBadge(user.status)}>
                      {user.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{user.joinDate}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        className="btn btn-secondary"
                        style={{ padding: '6px' }}
                        title="View"
                      >
                        <Eye size={14} />
                      </button>
                      <button 
                        className="btn btn-secondary"
                        style={{ padding: '6px' }}
                        title="Edit"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        className="btn btn-secondary"
                        style={{ padding: '6px', color: 'var(--accent-danger)' }}
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div style={{ 
          padding: '20px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Showing {filteredAndSortedUsers.length} of {users.length} users
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary" style={{ padding: '6px 12px' }}>
              Previous
            </button>
            <button className="btn btn-primary" style={{ padding: '6px 12px' }}>
              1
            </button>
            <button className="btn btn-secondary" style={{ padding: '6px 12px' }}>
              2
            </button>
            <button className="btn btn-secondary" style={{ padding: '6px 12px' }}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tables;