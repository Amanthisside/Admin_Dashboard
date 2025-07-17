import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Tables from './pages/Tables';
import Charts from './pages/Charts';
import Calendar from './pages/Calendar';
import Kanban from './pages/Kanban';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
 
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
            <Header 
              onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
            />
            <div style={{ display: 'flex', flex: 1 }}>
              <Sidebar 
                isOpen={sidebarOpen} 
                onClose={() => setSidebarOpen(false)} 
              />
              <main className="main-content" style={{ flex: 1, padding: '20px' }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/tables" element={<Tables />} />
                  <Route path="/charts" element={<Charts />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/kanban" element={<Kanban />} />
                </Routes>
              </main>
            </div>
            <Footer />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
