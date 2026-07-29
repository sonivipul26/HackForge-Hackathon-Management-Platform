import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Hackathons from './pages/Hackathons';
import HackathonDetail from './pages/HackathonDetail';
import CreateHackathon from './pages/CreateHackathon';
import OrganizerDashboard from './pages/OrganizerDashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import RoleRoute from './routes/RoleRoute';

/**
 * Root Application Component
 */
function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hackathons" element={<Hackathons />} />
            <Route path="/hackathons/:id" element={<HackathonDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/organizer/dashboard"
              element={
                <RoleRoute allowedRoles={['organizer', 'admin']}>
                  <OrganizerDashboard />
                </RoleRoute>
              }
            />

            <Route
              path="/organizer/create-hackathon"
              element={
                <RoleRoute allowedRoles={['organizer', 'admin']}>
                  <CreateHackathon />
                </RoleRoute>
              }
            />

            <Route
              path="*"
              element={
                <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                  <h2 className="text-3xl font-bold text-slate-900">Page Coming Soon</h2>
                  <p className="mt-2 text-slate-600">This module will be introduced in subsequent phases.</p>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
