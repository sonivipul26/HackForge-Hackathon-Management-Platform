import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHackathonByIdApi } from '../api/hackathon.api';
import { FiCalendar, FiMapPin, FiAward, FiUsers, FiCheckCircle, FiShield, FiArrowRight } from 'react-icons/fi';

/**
 * Hackathon Detail Page Component
 */
const HackathonDetail = () => {
  const { id } = useParams();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await getHackathonByIdApi(id);
        setHackathon(response.data.hackathon);
      } catch (err) {
        setError(err.response?.data?.message || 'Hackathon details not found');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-slate-500 text-sm">Loading event details...</p>
      </div>
    );
  }

  if (error || !hackathon) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Event Not Found</h2>
        <p className="mt-2 text-slate-600">{error || 'The requested hackathon does not exist.'}</p>
        <Link to="/hackathons" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold">
          Back to All Hackathons
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-8 text-white shadow-lg mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <span className="px-3 py-1 bg-blue-600/30 border border-blue-400/30 text-blue-300 font-semibold text-xs rounded-full uppercase tracking-wider">
            {hackathon.category} • {hackathon.mode}
          </span>
          <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-semibold text-xs rounded-full uppercase tracking-wider">
            Status: {hackathon.status}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">{hackathon.title}</h1>
        <p className="mt-3 text-lg text-slate-300 max-w-3xl">{hackathon.tagline}</p>

        <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-300 pt-6 border-t border-white/10">
          <div className="flex items-center space-x-2">
            <FiAward className="text-amber-400 text-lg" />
            <span className="font-bold text-white">${hackathon.prizePool.toLocaleString()} USD</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiMapPin className="text-blue-400 text-lg" />
            <span>{hackathon.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiUsers className="text-emerald-400 text-lg" />
            <span>{hackathon.participantCount} Developers Joined</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">About the Hackathon</h2>
            <div className="prose text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {hackathon.description}
            </div>
          </div>

          {hackathon.tracks?.length > 0 && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Tracks & Bounties</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hackathon.tracks.map((track, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <h3 className="font-bold text-slate-900 text-base">{track.title}</h3>
                    <p className="text-xs text-slate-600 mt-1">{track.description}</p>
                    {track.prize && (
                      <span className="mt-2 inline-block px-2.5 py-0.5 bg-amber-50 text-amber-700 font-semibold text-xs rounded border border-amber-200">
                        Prize: {track.prize}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {hackathon.rules && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center space-x-2">
                <FiShield className="text-blue-600" />
                <span>Rules & Submission Requirements</span>
              </h2>
              <p className="text-sm text-slate-600 whitespace-pre-line">{hackathon.rules}</p>
            </div>
          )}
        </div>

        {/* Sidebar Info & Register Card */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-lg mb-4">Event Timeline</h3>
            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-500">Registration Closes</span>
                <span className="font-semibold text-slate-800">{new Date(hackathon.registrationDeadline).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-500">Event Start</span>
                <span className="font-semibold text-slate-800">{new Date(hackathon.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-500">Submission Deadline</span>
                <span className="font-semibold text-slate-800">{new Date(hackathon.submissionDeadline).toLocaleDateString()}</span>
              </div>
            </div>

            <button className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm flex items-center justify-center space-x-2 shadow-sm transition-all">
              <span>Register for Event</span>
              <FiArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonDetail;
