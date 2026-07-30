const Submission = require('../models/Submission.model');

const getLeaderboard = async (hackathonId) => {
  const filter = hackathonId ? { hackathon: hackathonId } : {};

  const leaderboard = await Submission.find(filter)
    .populate('submittedBy', 'name email avatar organization')
    .populate('team', 'name members')
    .sort({ averageScore: -1, reviewCount: -1 });

  return leaderboard.map((sub, index) => ({
    rank: index + 1,
    id: sub._id,
    title: sub.title,
    tagline: sub.tagline,
    averageScore: sub.averageScore,
    reviewCount: sub.reviewCount,
    submittedBy: sub.submittedBy,
    team: sub.team,
    githubUrl: sub.githubUrl,
    demoUrl: sub.demoUrl,
    techStack: sub.techStack,
  }));
};

module.exports = { getLeaderboard };
