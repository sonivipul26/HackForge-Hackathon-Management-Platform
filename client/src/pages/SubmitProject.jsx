import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSubmissionApi } from '../api/submission.api';
import { FiSend, FiGithub, FiExternalLink, FiVideo, FiAlertCircle } from 'react-icons/fi';

/**
 * Submit Project Form Component
 */
const SubmitProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hackathonId: '',
    title: '',
    tagline: '',
    description: '',
    githubUrl: '',
    demoUrl: '',
    videoUrl: '',
    techStack: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const formattedTech = formData.techStack.split(',').map((t) => t.trim()).filter(Boolean);
      await createSubmissionApi({ ...formData, techStack: formattedTech });
      navigate('/projects');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to submit project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center space-x-2">
          <FiSend className="text-blue-600" />
          <span>Submit Project</span>
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          Submit your repository link, live demo URL, and pitch video for judge evaluation.
        </p>

        {errorMessage && (
          <div className="mb-6 p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-sm flex items-center space-x-2">
            <FiAlertCircle />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Hackathon ObjectId</label>
            <input
              type="text"
              name="hackathonId"
              required
              value={formData.hackathonId}
              onChange={handleChange}
              placeholder="Enter Hackathon Mongo ID"
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Project Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="NeoVault: DeFi Savings"
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Tagline / Short Summary</label>
              <input
                type="text"
                name="tagline"
                required
                value={formData.tagline}
                onChange={handleChange}
                placeholder="Automated yield optimizer for stablecoins"
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">GitHub Repository URL</label>
            <input
              type="url"
              name="githubUrl"
              required
              value={formData.githubUrl}
              onChange={handleChange}
              placeholder="https://github.com/username/project"
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Live Demo URL (Optional)</label>
              <input
                type="url"
                name="demoUrl"
                value={formData.demoUrl}
                onChange={handleChange}
                placeholder="https://myproject.vercel.app"
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Video Pitch URL (Optional)</label>
              <input
                type="url"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                placeholder="https://youtube.com/watch?v=..."
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Technologies Used (Comma-separated)</label>
            <input
              type="text"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              placeholder="Solidity, React, Tailwind, Node.js"
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Detailed Description & Readme</label>
            <textarea
              name="description"
              rows={4}
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Explain how your project works, problem solved, architecture, and installation..."
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-all"
          >
            {isSubmitting ? 'Submitting Project...' : 'Submit Final Project'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitProject;
