import React, { useState } from 'react';
import { createTeamApi, joinTeamApi } from '../api/team.api';
import { FiUsers, FiKey, FiPlusCircle, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

/**
 * Team Management Component
 */
const TeamManagement = () => {
  const [hackathonId, setHackathonId] = useState('');
  const [teamName, setTeamName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [activeTeam, setActiveTeam] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    try {
      const response = await createTeamApi(hackathonId, teamName);
      setActiveTeam(response.data.team);
      setMessage({ type: 'success', text: `Team created! Join Code: ${response.data.team.joinCode}` });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to create team' });
    }
  };

  const handleJoinTeam = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    try {
      const response = await joinTeamApi(joinCode);
      setActiveTeam(response.data.team);
      setMessage({ type: 'success', text: `Successfully joined team ${response.data.team.name}!` });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to join team' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Team Hub</h1>
      <p className="text-slate-600 text-sm mb-8">Form a new squad or enter a 6-character Join Code to enter an existing team.</p>

      {message.text && (
        <div
          className={`mb-6 p-4 rounded-xl flex items-center space-x-2 text-sm ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
          }`}
        >
          {message.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
          <span>{message.text}</span>
        </div>
      )}

      {activeTeam && (
        <div className="bg-white p-6 rounded-xl border border-blue-200 shadow-sm mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs uppercase font-bold text-blue-600">Your Current Team</span>
              <h2 className="text-2xl font-bold text-slate-900">{activeTeam.name}</h2>
            </div>
            <div className="p-3 bg-blue-50 text-blue-700 font-mono font-bold text-lg rounded-xl border border-blue-200">
              JOIN CODE: {activeTeam.joinCode}
            </div>
          </div>
          <p className="text-xs text-slate-500">Share this join code with your teammates so they can register for your squad.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Create Team Form */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
            <FiPlusCircle className="text-blue-600" />
            <span>Create a New Team</span>
          </h2>
          <form onSubmit={handleCreateTeam} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Hackathon ID</label>
              <input
                type="text"
                required
                value={hackathonId}
                onChange={(e) => setHackathonId(e.target.value)}
                placeholder="Enter Hackathon Mongo ObjectId"
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Team Name</label>
              <input
                type="text"
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="CyberKnights AI"
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-all"
            >
              Create Team
            </button>
          </form>
        </div>

        {/* Join Team Form */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
            <FiKey className="text-blue-600" />
            <span>Join Existing Team</span>
          </h2>
          <form onSubmit={handleJoinTeam} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Team Join Code</label>
              <input
                type="text"
                required
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder="e.g. FORGE-8X92"
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-blue-500 focus:border-blue-500 uppercase"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-lg transition-all"
            >
              Join Squad
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeamManagement;
