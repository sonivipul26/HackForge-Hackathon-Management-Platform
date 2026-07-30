import React, { useEffect, useState } from 'react';
import { getSubmissionsApi } from '../api/submission.api';
import { FiGithub, FiExternalLink, FiAward, FiCode } from 'react-icons/fi';

/**
 * Projects Gallery Component
 */
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getSubmissionsApi();
        setProjects(response.data.submissions);
      } catch (err) {
        console.error('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Project Gallery</h1>
        <p className="text-slate-600 text-sm mt-1">Explore innovations built by developers worldwide.</p>
      </div>

      {loading ? (
        <div className="py-16 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-slate-200 text-center">
          <h3 className="text-lg font-bold text-slate-800">No submissions found</h3>
          <p className="text-sm text-slate-500 mt-1">Projects will appear here once participants submit their work.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div key={proj._id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-bold text-xs rounded">
                    Score: {proj.averageScore || 'N/A'} / 10
                  </span>
                  <span className="text-[10px] uppercase text-slate-400 font-semibold">{proj.status}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">{proj.title}</h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{proj.tagline}</p>

                {proj.techStack?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {proj.techStack.map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1 text-slate-700 hover:text-blue-600 font-semibold"
                >
                  <FiGithub /> <span>Code</span>
                </a>

                {proj.demoUrl && (
                  <a
                    href={proj.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1 text-blue-600 font-semibold"
                  >
                    <FiExternalLink /> <span>Demo</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
