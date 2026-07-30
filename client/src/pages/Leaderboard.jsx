import React, { useEffect, useState } from 'react';
import { getLeaderboardApi } from '../api/leaderboard.api';
import { FiAward, FiGithub, FiExternalLink, FiStar } from 'react-icons/fi';

/**
 * Leaderboard Component
 */
const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await getLeaderboardApi();
        setLeaderboard(response.data.leaderboard);
      } catch (err) {
        console.error('Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8 flex items-center space-x-3">
        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
          <FiAward className="text-3xl" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Official Leaderboard</h1>
          <p className="text-slate-600 text-sm">Rankings computed from verified judge rubric scores.</p>
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : leaderboard.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-slate-200 text-center">
          <h3 className="text-lg font-bold text-slate-800">Leaderboard Pending</h3>
          <p className="text-sm text-slate-500 mt-1">Evaluated projects will rank here once judge reviews are logged.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase text-slate-400">
                <th className="py-3 px-6">Rank</th>
                <th className="py-3 px-6">Project Title</th>
                <th className="py-3 px-6">Submitted By</th>
                <th className="py-3 px-6">Average Score</th>
                <th className="py-3 px-6">Reviews</th>
                <th className="py-3 px-6">Links</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leaderboard.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-extrabold text-slate-900 text-base">
                    {item.rank === 1 ? (
                      <span className="inline-flex items-center space-x-1 text-amber-500">
                        <FiStar /> <span>#1</span>
                      </span>
                    ) : (
                      `#${item.rank}`
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900">{item.title}</div>
                    <div className="text-xs text-slate-500 line-clamp-1">{item.tagline}</div>
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-700">
                    {item.submittedBy?.name || 'Developer'}
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-extrabold text-xs rounded-full border border-blue-200">
                      {item.averageScore} / 10
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-500 text-xs">{item.reviewCount} Reviews</td>
                  <td className="py-4 px-6">
                    <a href={item.githubUrl} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-blue-600 text-base">
                      <FiGithub />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
