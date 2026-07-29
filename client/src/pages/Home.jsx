import React, { useEffect, useState } from 'react';
import { checkHealth } from '../api/health.api';
import { FiArrowRight, FiCheckCircle, FiAlertCircle, FiCpu, FiAward, FiUsers, FiGlobe } from 'react-icons/fi';

/**
 * Home Page Component
 *
 * Designed to mirror the landing page UI screenshot with hero section, statistics,
 * active hackathon preview cards, and live API connectivity indicator.
 */
const Home = () => {
  const [healthStatus, setHealthStatus] = useState({ loading: true, data: null, error: null });

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await checkHealth();
        setHealthStatus({ loading: false, data: response.data, error: null });
      } catch (err) {
        setHealthStatus({
          loading: false,
          data: null,
          error: err.response?.data?.message || 'Backend connection failed',
        });
      }
    };

    fetchHealth();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* API Connection Banner */}
      <div className="bg-slate-900 text-white py-2 px-4 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>SYSTEM HEALTH CHECK:</span>
          </span>
          {healthStatus.loading ? (
            <span className="text-slate-400">Pinging backend...</span>
          ) : healthStatus.error ? (
            <span className="text-rose-400 flex items-center space-x-1">
              <FiAlertCircle /> <span>{healthStatus.error}</span>
            </span>
          ) : (
            <span className="text-emerald-400 flex items-center space-x-2">
              <FiCheckCircle />
              <span>
                Backend: {healthStatus.data.status} | DB: {healthStatus.data.mongodb} | Mode: {healthStatus.data.environment}
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-xs font-semibold uppercase tracking-wider mb-6">
          <FiCpu className="text-sm" />
          <span>NEXT-GEN HACKATHON PLATFORM</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
          Where Elite Talent Meets <br />
          <span className="text-blue-600">Radical Innovation.</span>
        </h1>

        <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
          The institutional-grade platform for universities and enterprise companies to host high-stakes hackathons, manage intellectual property, and discover world-class engineering talent.
        </p>

        <div className="mt-8 flex justify-center space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center space-x-2">
            <span>Get Started</span>
            <FiArrowRight />
          </button>
          <button className="bg-white hover:bg-slate-100 text-slate-700 font-semibold px-6 py-3 rounded-lg border border-slate-300 transition-all">
            View Demo
          </button>
        </div>
      </section>

      {/* Platform Stats Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <FiUsers className="text-2xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">50k+</div>
              <div className="text-xs uppercase font-medium text-slate-500">Active Developers</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
              <FiGlobe className="text-2xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">200+</div>
              <div className="text-xs uppercase font-medium text-slate-500">Partner Universities</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
              <FiAward className="text-2xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">$1.2M</div>
              <div className="text-xs uppercase font-medium text-slate-500">Prizes Distributed</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
              <FiCpu className="text-2xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">15k+</div>
              <div className="text-xs uppercase font-medium text-slate-500">Projects Built</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
