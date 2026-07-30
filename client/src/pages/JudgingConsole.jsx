import React, { useState } from 'react';
import { FiCheckCircle, FiClock, FiZap, FiSliders, FiFileText } from 'react-icons/fi';

/**
 * Judging Console Component
 *
 * Implements the Judging Console design from the Stitch UI screenshots.
 */
const JudgingConsole = () => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const mockSubmissions = [
    {
      id: 'sub-1',
      title: 'NeoVault: DeFi Savings',
      tags: ['WEB APP', 'FINTECH'],
      metrics: '3/5 Metrics',
      status: 'Partially Completed',
      action: 'Resume',
    },
    {
      id: 'sub-2',
      title: 'EcoTrace API',
      tags: ['BACKEND', 'ESG'],
      metrics: '0/5 Metrics',
      status: 'Not Started',
      action: 'Start Review',
    },
    {
      id: 'sub-3',
      title: 'PulseGuard AI',
      tags: ['MOBILE', 'HEALTH'],
      metrics: '0/5 Metrics',
      status: 'Not Started',
      action: 'Start Review',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Judging Console</h1>
          <p className="text-sm text-slate-600 mt-1">
            Welcome back, Judge. You have 12 projects remaining for the "Fintech Frontier" hackathon.
          </p>
        </div>

        {/* Progress Widget */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm w-full md:w-64">
          <div className="flex justify-between items-center text-xs font-bold mb-1">
            <span className="text-slate-400">PROGRESS</span>
            <span className="text-blue-600">64%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full w-[64%]"></div>
          </div>
        </div>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">STATUS: LIVE</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-2">24</div>
            <div className="text-xs text-slate-500">Completed Evaluations</div>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <FiCheckCircle className="text-2xl" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">DUE IN 4H</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-2">12</div>
            <div className="text-xs text-slate-500">Pending Queue</div>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <FiClock className="text-2xl" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">EFFICIENCY</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-2">8.5m</div>
            <div className="text-xs text-slate-500">Avg. Review Time</div>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <FiZap className="text-2xl" />
          </div>
        </div>
      </div>

      {/* Active Evaluation Queue & Rubric */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Evaluation Queue */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-lg font-bold text-slate-900">Active Evaluation Queue</h3>
              <div className="flex items-center space-x-2 text-slate-400">
                <FiSliders />
              </div>
            </div>

            <div className="space-y-4">
              {mockSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 bg-slate-50/50 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-500">
                      <FiFileText className="text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{sub.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        {sub.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-slate-200 text-slate-700 font-semibold text-[10px] rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-800">{sub.metrics}</div>
                      <div className="text-[10px] text-slate-400">{sub.status}</div>
                    </div>

                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-sm transition-all">
                      {sub.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                View All 12 Projects
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Judging Rubric Card */}
        <div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
              <FiSliders className="text-blue-600" />
              <span>Judging Rubric</span>
            </h3>

            <div className="space-y-4">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-xs font-bold text-slate-800">1. Technical Execution</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Complexity, code quality, and stack usage.</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-xs font-bold text-slate-800">2. Innovation</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Novelty of solution and unique approach.</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-xs font-bold text-slate-800">3. Design & UX</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Usability, aesthetics, and accessibility.</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-xs font-bold text-slate-800">4. Impact</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Scalability and real-world applicability.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgingConsole;
