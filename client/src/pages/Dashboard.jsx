import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  FiAward,
  FiClock,
  FiCheckCircle,
  FiSend,
  FiArrowRight,
  FiBookOpen,
  FiUsers,
  FiCheckSquare,
} from 'react-icons/fi';

/**
 * Participant Dashboard Page
 *
 * Implements the dashboard design from the Stitch UI screenshots.
 */
const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs uppercase font-bold text-blue-600 tracking-wider">
            WELCOME BACK, {user?.name || 'ALEX'}
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Your Dashboard</h1>
        </div>

        {/* Global Rank & Next Deadline Widgets */}
        <div className="flex items-center space-x-4">
          <div className="bg-white p-3 px-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <FiAward className="text-xl" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Global Rank</div>
              <div className="text-sm font-extrabold text-slate-900">#42 / 12,403</div>
            </div>
          </div>

          <div className="bg-white p-3 px-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-3">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
              <FiClock className="text-xl" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Next Deadline</div>
              <div className="text-sm font-extrabold text-slate-900">14h 22m</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Active Hackathon Card & Recommended */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active Hackathon Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                Active Hackathon
              </span>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center border-2 border-white">
                  SC
                </div>
                <div className="w-8 h-8 rounded-full bg-indigo-500 text-white font-bold text-xs flex items-center justify-center border-2 border-white">
                  MZ
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-700 text-white font-bold text-xs flex items-center justify-center border-2 border-white">
                  +2
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">CyberSentinel AI 2024</h2>
            <p className="text-sm text-slate-600 mt-1">Final refinement of the neural engine for threat detection.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Milestone</span>
                <span className="text-sm font-bold text-slate-900 block mt-1">API Integration</span>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-blue-600 h-full w-3/4"></div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Repo Health</span>
                <span className="text-sm font-bold text-emerald-600 flex items-center space-x-1 mt-1">
                  <FiCheckCircle /> <span>Stable</span>
                </span>
                <span className="text-[11px] text-slate-400 block mt-2">Last commit 12m ago</span>
              </div>

              <div className="bg-blue-600 text-white p-4 rounded-xl shadow-md flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-200 block">Action Required</span>
                  <span className="text-sm font-bold block mt-1">Submit Video Pitch</span>
                </div>
                <span className="text-[11px] text-blue-200 block mt-2">Due: Aug 24, 23:59 GMT</span>
              </div>
            </div>
          </div>

          {/* Recommended Events */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900">Recommended for You</h3>
              <Link to="/hackathons" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Edge Workers Global',
                  category: 'Web3 & DeFi',
                  prize: '$50k Prize',
                  timeLeft: '14 Days Left',
                  joined: '1.2k joined',
                },
                {
                  title: 'ChainLink Builders',
                  category: 'Web3 & DeFi',
                  prize: 'ETH Global',
                  timeLeft: '3 Days Left',
                  joined: '800 joined',
                },
              ].map((card, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase">
                      {card.prize}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-2">{card.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{card.category}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span>{card.timeLeft}</span>
                    <Link
                      to="/hackathons"
                      className="px-3 py-1 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg font-semibold transition-all"
                    >
                      Join
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Team Comms & Skill Forge */}
        <div className="space-y-8">
          {/* Team Comms */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Team Comms</h3>
            <div className="space-y-4 text-xs">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0">
                  SJ
                </div>
                <div>
                  <span className="font-bold text-slate-800">Sarah Jenkins</span>
                  <p className="text-slate-500 mt-0.5">Just pushed the updated ML model pipeline!</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0">
                  MZ
                </div>
                <div>
                  <span className="font-bold text-slate-800">Marcus Zhao</span>
                  <p className="text-slate-500 mt-0.5">Anyone reviewed the UI mockups on Stitch?</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center space-x-2">
              <input
                type="text"
                placeholder="Send a message..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500"
              />
              <button className="p-2 bg-blue-600 text-white rounded-lg text-xs">
                <FiSend />
              </button>
            </div>
          </div>

          {/* Skill Forge */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Skill Forge</h3>
            <p className="text-xs text-slate-500 mb-4">Recommended learning modules for your current stack.</p>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 text-xs block">Advanced Rust for WASM</span>
                  <span className="text-[10px] text-slate-400">2.5 hours • Advanced</span>
                </div>
                <FiBookOpen className="text-blue-600 text-base" />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 text-xs block">Vector DB Masterclass</span>
                  <span className="text-[10px] text-slate-400">4 hours • Intermediate</span>
                </div>
                <FiBookOpen className="text-blue-600 text-base" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
