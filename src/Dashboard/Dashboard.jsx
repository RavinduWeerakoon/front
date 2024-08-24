import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Settings from './Settings';
import Profile from './Profile';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <main style={{ flexGrow: 1, padding: '20px' }}>
    <Sidebar />
    <div style={{ display: 'flex' }}>  
    <Routes>
    
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/settings" element={<h2>Settings</h2>} />
            <Route path="/profile" element={<h1>Profile</h1>} />
          
    </Routes>
    </div>
    </main>
  );
};

export default Dashboard;