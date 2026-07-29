import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createHackathonApi } from '../api/hackathon.api';
import { FiPlusCircle, FiAlertCircle } from 'react-icons/fi';

/**
 * Create Hackathon Form Component (Organizers Only)
 */
const CreateHackathon = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    description: '',
    organizationName: '',
    category: 'General',
    mode: 'online',
    location: 'Global Online',
    prizePool: 5000,
    registrationDeadline: '',
    startDate: '',
    endDate: '',
    submissionDeadline: '',
    rules: '',
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
      const response = await createHackathonApi(formData);
      navigate(`/hackathons/${response.data.hackathon._id}`);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to create hackathon');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center space-x-2">
          <FiPlusCircle className="text-blue-600" />
          <span>Launch New Hackathon Event</span>
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          Set up your university or enterprise hackathon with rules, dates, and prize pools.
        </p>

        {errorMessage && (
          <div className="mb-6 p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-sm flex items-center space-x-2">
            <FiAlertCircle />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Hackathon Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="CyberSentinel AI 2024"
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Organization Name</label>
              <input
                type="text"
                name="organizationName"
                required
                value={formData.organizationName}
                onChange={handleChange}
                placeholder="Stanford Innovation Lab"
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Tagline / Short Summary</label>
            <input
              type="text"
              name="tagline"
              required
              value={formData.tagline}
              onChange={handleChange}
              placeholder="Final refinement of the neural engine for threat detection."
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="General">General</option>
                <option value="Web3 & DeFi">Web3 & DeFi</option>
                <option value="Gen AI">Gen AI</option>
                <option value="Green Tech">Green Tech</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Smart Cities">Smart Cities</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Format Mode</label>
              <select
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="online">Online</option>
                <option value="in-person">In-Person</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Prize Pool ($ USD)</label>
              <input
                type="number"
                name="prizePool"
                required
                min={0}
                value={formData.prizePool}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Registration Deadline</label>
              <input
                type="datetime-local"
                name="registrationDeadline"
                required
                value={formData.registrationDeadline}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Submission Deadline</label>
              <input
                type="datetime-local"
                name="submissionDeadline"
                required
                value={formData.submissionDeadline}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Start Date</label>
              <input
                type="date"
                name="startDate"
                required
                value={formData.startDate}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">End Date</label>
              <input
                type="date"
                name="endDate"
                required
                value={formData.endDate}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Detailed Description</label>
            <textarea
              name="description"
              rows={4}
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the challenges, objectives, and judging guidelines..."
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition-all"
          >
            {isSubmitting ? 'Creating Event...' : 'Publish Hackathon Event'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHackathon;
