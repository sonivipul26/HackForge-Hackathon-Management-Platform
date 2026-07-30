import React, { useEffect, useState } from 'react';
import {
  getAdminStatsApi,
  getAdminUsersApi,
  toggleUserBlockApi,
  updateUserRoleApi,
  deleteUserApi,
  adminDeleteHackathonApi,
} from '../api/admin.api';
import {
  FiUsers,
  FiAward,
  FiCode,
  FiShield,
  FiUserX,
  FiUserCheck,
  FiTrash2,
  FiEdit,
  FiSearch,
  FiActivity,
} from 'react-icons/fi';

/**
 * Admin Dashboard Component
 *
 * Full platform administration suite: Real-time analytics, User Management Table
 * (Role modification, Block/Unblock, Deletion), and Hackathon oversight.
 */
const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'analytics'

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes] = await Promise.all([
        getAdminStatsApi(),
        getAdminUsersApi({ search: searchTerm, role: roleFilter }),
      ]);
      setStats(statsRes.data.stats);
      setUsers(usersRes.data.users);
    } catch (err) {
      console.error('Failed to load admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [searchTerm, roleFilter]);

  const handleToggleBlock = async (userId) => {
    try {
      await toggleUserBlockApi(userId);
      fetchDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update user block status');
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRoleApi(userId, newRole);
      fetchDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update role');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to permanently delete this user account?')) return;
    try {
      await deleteUserApi(userId);
      fetchDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete user');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center space-x-2 text-xs font-extrabold uppercase text-blue-600 tracking-wider">
            <FiShield className="text-sm" />
            <span>PLATFORM OVERLORD CONSOLE</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Admin Dashboard</h1>
          <p className="text-slate-600 text-sm mt-1">
            Complete platform control: Manage users, review analytics, and enforce system security.
          </p>
        </div>

        {/* Tab Switching Buttons */}
        <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'users' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            User Directory
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'analytics' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            System Analytics
          </button>
        </div>
      </div>

      {/* Analytics KPI Stat Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-slate-400">Total Users</span>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">{stats.totalUsers}</div>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <FiUsers className="text-2xl" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-slate-400">Hackathons</span>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">{stats.totalHackathons}</div>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <FiAward className="text-2xl" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-slate-400">Total Teams</span>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">{stats.totalTeams}</div>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <FiUsers className="text-2xl" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-slate-400">Submissions</span>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">{stats.totalSubmissions}</div>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <FiCode className="text-2xl" />
            </div>
          </div>
        </div>
      )}

      {/* Main Tab Content */}
      {activeTab === 'users' ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Table Search & Filter Bar */}
          <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-3 justify-between items-center bg-slate-50/50">
            <div className="relative w-full md:w-80">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <input
                type="text"
                placeholder="Search user by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center space-x-3 w-full md:w-auto">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none text-slate-700 font-semibold"
              >
                <option value="">All Roles</option>
                <option value="admin">Administrator</option>
                <option value="organizer">Organizer</option>
                <option value="participant">Participant</option>
                <option value="judge">Judge</option>
              </select>
            </div>
          </div>

          {/* User Management Table */}
          {loading ? (
            <div className="py-16 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : users.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-sm">No user accounts found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200 font-bold uppercase text-slate-500">
                    <th className="py-3 px-6">User</th>
                    <th className="py-3 px-6">Email</th>
                    <th className="py-3 px-6">Role</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6">Joined Date</th>
                    <th className="py-3 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900 flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                          {u.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <div>{u.name}</div>
                          <div className="text-[10px] font-normal text-slate-400">{u.organization || 'Independent'}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium text-slate-600">{u.email}</td>
                      <td className="py-4 px-6">
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u._id, e.target.value)}
                          className="px-2 py-1 bg-slate-100 border border-slate-300 rounded font-bold text-[11px] text-slate-700 capitalize focus:outline-none"
                        >
                          <option value="participant">participant</option>
                          <option value="organizer">organizer</option>
                          <option value="judge">judge</option>
                          <option value="admin">admin</option>
                        </select>
                      </td>
                      <td className="py-4 px-6">
                        {u.isActive ? (
                          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold rounded-full inline-flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span>Active</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 font-extrabold rounded-full inline-flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                            <span>Blocked</span>
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-slate-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => handleToggleBlock(u._id)}
                          title={u.isActive ? 'Block User' : 'Unblock User'}
                          className={`p-2 rounded-lg border transition-all ${
                            u.isActive
                              ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          }`}
                        >
                          {u.isActive ? <FiUserX /> : <FiUserCheck />}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          title="Delete User"
                          className="p-2 bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 rounded-lg transition-all"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        /* Analytics Breakdown View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center space-x-2">
              <FiActivity className="text-blue-600" />
              <span>User Role Distribution</span>
            </h3>
            <div className="space-y-3">
              {Object.entries(stats?.roleDistribution || {}).map(([role, count]) => (
                <div key={role} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="capitalize font-bold text-xs text-slate-700">{role}</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 font-extrabold text-xs rounded-full">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center space-x-2">
              <FiActivity className="text-indigo-600" />
              <span>Hackathon Status Distribution</span>
            </h3>
            <div className="space-y-3">
              {Object.entries(stats?.hackathonStatusDistribution || {}).map(([status, count]) => (
                <div key={status} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="capitalize font-bold text-xs text-slate-700">{status}</span>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 font-extrabold text-xs rounded-full">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
