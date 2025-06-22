import React, { useState } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';

const Charts = () => {
  const [activeChart, setActiveChart] = useState('line');

  const salesData = [
    { month: 'Jan', sales: 4000, revenue: 2400, profit: 1600 },
    { month: 'Feb', sales: 3000, revenue: 1398, profit: 1200 },
    { month: 'Mar', sales: 2000, revenue: 9800, profit: 2800 },
    { month: 'Apr', sales: 2780, revenue: 3908, profit: 2000 },
    { month: 'May', sales: 1890, revenue: 4800, profit: 2400 },
    { month: 'Jun', sales: 2390, revenue: 3800, profit: 2100 },
    { month: 'Jul', sales: 3490, revenue: 4300, profit: 2600 }
  ];

  const categoryData = [
    { name: 'Electronics', value: 400, color: '#3b82f6' },
    { name: 'Clothing', value: 300, color: '#10b981' },
    { name: 'Books', value: 200, color: '#f59e0b' },
    { name: 'Home & Garden', value: 150, color: '#ef4444' },
    { name: 'Sports', value: 100, color: '#8b5cf6' }
  ];

  const performanceData = [
    { subject: 'Sales', A: 120, B: 110, fullMark: 150 },
    { subject: 'Marketing', A: 98, B: 130, fullMark: 150 },
    { subject: 'Development', A: 86, B: 130, fullMark: 150 },
    { subject: 'Customer Service', A: 99, B: 100, fullMark: 150 },
    { subject: 'HR', A: 85, B: 90, fullMark: 150 },
    { subject: 'Finance', A: 65, B: 85, fullMark: 150 }
  ];

  const trafficData = [
    { time: '00:00', visitors: 120 },
    { time: '04:00', visitors: 80 },
    { time: '08:00', visitors: 200 },
    { time: '12:00', visitors: 350 },
    { time: '16:00', visitors: 280 },
    { time: '20:00', visitors: 180 }
  ];

  const chartTypes = [
    { id: 'line', name: 'Line Chart', icon: TrendingUp },
    { id: 'bar', name: 'Bar Chart', icon: BarChart3 },
    { id: 'pie', name: 'Pie Chart', icon: PieChartIcon },
    { id: 'area', name: 'Area Chart', icon: Activity }
  ];

  const renderChart = () => {
    switch (activeChart) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="month" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="var(--accent-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--accent-primary)', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="var(--accent-secondary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--accent-secondary)', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="month" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="sales" fill="var(--accent-primary)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" fill="var(--accent-secondary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="time" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="visitors" 
                stroke="var(--accent-primary)" 
                fill="var(--accent-primary)"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
          Analytics & Charts
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Visualize your data with interactive charts and graphs.
        </p>
      </div>

      {/* Chart Type Selector */}
      <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {chartTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setActiveChart(type.id)}
                className={`btn ${activeChart === type.id ? 'btn-primary' : 'btn-secondary'}`}
              >
                <Icon size={16} />
                {type.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chart */}
      <div className="card" style={{ padding: '24px', marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '20px' }}>
          {chartTypes.find(type => type.id === activeChart)?.name}
        </h3>
        {renderChart()}
      </div>

      {/* Additional Charts Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '20px'
      }}>
        {/* Radar Chart */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '20px' }}>Performance Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={performanceData}>
              <PolarGrid stroke="var(--border-color)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)' }} />
              <PolarRadiusAxis tick={{ fill: 'var(--text-secondary)' }} />
              <Radar
                name="Team A"
                dataKey="A"
                stroke="var(--accent-primary)"
                fill="var(--accent-primary)"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="Team B"
                dataKey="B"
                stroke="var(--accent-secondary)"
                fill="var(--accent-secondary)"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Mini Stats */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '20px' }}>Quick Stats</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '16px',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '8px'
            }}>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Total Revenue</p>
                <p style={{ fontSize: '24px', fontWeight: '700' }}>$45,678</p>
              </div>
              <div style={{ 
                width: '60px', 
                height: '60px',
                backgroundColor: 'var(--accent-primary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <TrendingUp size={24} color="white" />
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '16px',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '8px'
            }}>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Orders</p>
                <p style={{ fontSize: '24px', fontWeight: '700' }}>1,234</p>
              </div>
              <div style={{ 
                width: '60px', 
                height: '60px',
                backgroundColor: 'var(--accent-secondary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <BarChart3 size={24} color="white" />
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '16px',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '8px'
            }}>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Customers</p>
                <p style={{ fontSize: '24px', fontWeight: '700' }}>5,678</p>
              </div>
              <div style={{ 
                width: '60px', 
                height: '60px',
                backgroundColor: 'var(--accent-warning)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Activity size={24} color="white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;