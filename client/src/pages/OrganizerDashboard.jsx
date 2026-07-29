import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyEventsApi } from '../api/hackathon.api';
import { useAuth } from '../context/AuthContext';
import { FiPlusCircle, FiCalendar, FiUsers, FiClock, FiCheckCircle } from 'react-icons/fi';

/**
 * Organizer Dashboard Component
 */
const OrganizerDashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getMyEventsApi();
        setEvents(response.data.hackathons);
      } catch (err) {
        setError('Failed to fetch hosted hackathons');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-blue-600">
            WELCOME BACK, {user?.name}
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Organizer Console</h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage your active events, track participant registrations, and publish submission deadlines.
          </p>
        </div>

        <Link
          to="/organizer/create-hackathon"
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg flex items-center space-x-2 shadow-sm shrink-0 transition-all"
        >
          <FiPlusCircle />
          <span>Launch New Event</span>
        </Link>
      </div>

      {/* Events Grid */}
      <h2 className="text-xl font-bold text-slate-900 mb-4">Your Hosted Hackathons</h2>

      {loading ? (
        <div className="py-12 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="p-4 bg-rose-50 text-rose-700 rounded-lg text-sm">{error}</div>
      ) : events.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-slate-200 text-center">
          <h3 className="text-lg font-bold text-slate-800">No hosted hackathons yet</h3>
          <p className="text-sm text-slate-500 mt-1">Click "Launch New Event" to publish your first hackathon.</p>
          <Link
            to="/organizer/create-hackathon"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg"
          >
            Create Hackathon
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 font-semibold text-xs rounded-full">
                    {event.status}
                  </span>
                  <span className="text-xs text-slate-400">
                    Created {new Date(event.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">{event.title}</h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{event.tagline}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Prize: ${event.prizePool.toLocaleString()}</span>
                <Link to={`/hackathons/${event._id}`} className="font-semibold text-blue-600 hover:text-blue-700">
                  View Public Page →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrganizerDashboard;
