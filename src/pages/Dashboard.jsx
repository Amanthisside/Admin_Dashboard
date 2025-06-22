import React from 'react';
import { 
  Users, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp,
  Activity,
  Calendar as CalendarIcon
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '12,345',
      change: '+12%',
      icon: Users,
      color: 'var(--accent-primary)'
    },
    {
      title: 'Revenue',
      value: '$45,678',
      change: '+8%',
      icon: DollarSign,
      color: 'var(--accent-secondary)'
    },
    {
      title: 'Orders',
      value: '1,234',
      change: '+23%',
      icon: ShoppingCart,
      color: 'var(--accent-warning)'
    },
    {
      title: 'Growth',
      value: '89%',
      change: '+5%',
      icon: TrendingUp,
      color: 'var(--accent-danger)'
    }
  ];

  const chartData = [
    { name: 'Jan', users: 400, revenue: 2400 },
    { name: 'Feb', users: 300, revenue: 1398 },
    { name: 'Mar', users: 200, revenue: 9800 },
    { name: 'Apr', users: 278, revenue: 3908 },
    { name: 'May', users: 189, revenue: 4800 },
    { name: 'Jun', users: 239, revenue: 3800 },
    { name: 'Jul', users: 349, revenue: 4300 }
  ];

  const pieData = [
    { name: 'Desktop', value: 400, color: '#3b82f6' },
    { name: 'Mobile', value: 300, color: '#10b981' },
    { name: 'Tablet', value: 200, color: '#f59e0b' },
    { name: 'Other', value: 100, color: '#ef4444' }
  ];

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'Created new project', time: '2 hours ago' },
    { id: 2, user: 'Jane Smith', action: 'Updated profile', time: '4 hours ago' },
    { id: 3, user: 'Mike Johnson', action: 'Completed task', time: '6 hours ago' },
    { id: 4, user: 'Sarah Wilson', action: 'Added new comment', time: '8 hours ago' }
  ];

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
          Dashboard Overview
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card stat-card" style={{
              background: `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ opacity: 0.9, marginBottom: '8px' }}>{stat.title}</p>
                  <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>
                    {stat.value}
                  </h3>
                  <p style={{ opacity: 0.8, fontSize: '14px' }}>
                    {stat.change} from last month
                  </p>
                </div>
                <Icon size={32} style={{ opacity: 0.8 }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Line Chart */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={20} />
            User Growth
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="name" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="var(--accent-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--accent-primary)', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DollarSign size={20} />
            Revenue
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="name" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="revenue" fill="var(--accent-secondary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px'
      }}>
        {/* Pie Chart */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '20px' }}>Device Usage</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CalendarIcon size={20} />
            Recent Activity
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentActivities.map((activity) => (
              <div key={activity.id} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                padding: '12px',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '8px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: 'var(--accent-primary)',
                  borderRadius: '50%'
                }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: '500', marginBottom: '4px' }}>
                    {activity.user}
                  </p>
                  <p style={{ 
                    fontSize: '14px', 
                    color: 'var(--text-secondary)',
                    marginBottom: '2px'
                  }}>
                    {activity.action}
                  </p>
                  <p style={{ 
                    fontSize: '12px', 
                    color: 'var(--text-muted)' 
                  }}>
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;