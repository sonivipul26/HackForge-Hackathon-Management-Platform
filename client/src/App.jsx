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
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dashboard';
import TeamManagement from './pages/TeamManagement';
import JudgingConsole from './pages/JudgingConsole';
import SubmitProject from './pages/SubmitProject';
import Projects from './pages/Projects';
import Leaderboard from './pages/Leaderboard';
import NotFound from './pages/NotFound';
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
            <Route path="/projects" element={<Projects />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/teams"
              element={
                <ProtectedRoute>
                  <TeamManagement />
                </ProtectedRoute>
              }
            />

            <Route
              path="/submit-project"
              element={
                <ProtectedRoute>
                  <SubmitProject />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/judging"
              element={
                <RoleRoute allowedRoles={['judge', 'admin']}>
                  <JudgingConsole />
                </RoleRoute>
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
              path="/admin/dashboard"
              element={
                <RoleRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </RoleRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
