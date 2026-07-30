const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const User = require('../models/User.model');
const Hackathon = require('../models/Hackathon.model');
const Registration = require('../models/Registration.model');
const Team = require('../models/Team.model');
const Submission = require('../models/Submission.model');
const Review = require('../models/Review.model');

const seedData = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB for Seeding: ${conn.connection.host}`);

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Hackathon.deleteMany({}),
      Registration.deleteMany({}),
      Team.deleteMany({}),
      Submission.deleteMany({}),
      Review.deleteMany({}),
    ]);

    console.log('Cleared old database records.');

    // 1. Create Core Users for each role
    const admin = await User.create({
      name: 'System Admin',
      email: 'admin@hackforge.com',
      password: 'password123',
      role: 'admin',
      organization: 'HackForge Core',
      bio: 'Platform Lead Administrator',
    });

    const organizer = await User.create({
      name: 'Sarah Organizer',
      email: 'organizer@hackforge.com',
      password: 'password123',
      role: 'organizer',
      organization: 'DevForge Foundation',
      bio: 'Community Hackathon Director',
    });

    const participant1 = await User.create({
      name: 'Alex Participant',
      email: 'alex@hackforge.com',
      password: 'password123',
      role: 'participant',
      organization: 'MIT CS',
      skills: ['React', 'Node.js', 'Solidity'],
    });

    const participant2 = await User.create({
      name: 'Maya Lin',
      email: 'maya@hackforge.com',
      password: 'password123',
      role: 'participant',
      organization: 'Stanford Tech',
      skills: ['Python', 'PyTorch', 'Tailwind'],
    });

    const judge = await User.create({
      name: 'Dr. James Judge',
      email: 'judge@hackforge.com',
      password: 'password123',
      role: 'judge',
      organization: 'Venture Tech Capital',
      bio: 'Senior Technology Evaluator',
    });

    console.log('Seeded Users (Admin, Organizer, Participants, Judge).');

    // 2. Create Hackathons
    const hackathon1 = await Hackathon.create({
      title: 'Fintech Frontier Hackathon 2024',
      tagline: 'Build next-gen decentralized finance and algorithmic trading systems',
      description: 'Join developers worldwide for 48 hours of intense financial technology innovation.',
      organizer: organizer._id,
      organizationName: 'DevForge Foundation',
      mode: 'online',
      category: 'Web3 & DeFi',
      status: 'active',
      prizePool: 50000,
      currency: 'USD',
      maxTeamSize: 4,
      minTeamSize: 1,
      registrationDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      submissionDeadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      tracks: [
        { title: 'DeFi Savings & Yield', prize: '$20,000' },
        { title: 'Algorithmic Risk Management', prize: '$15,000' },
      ],
      rules: 'All code must be written during the event duration. Open-source frameworks allowed.',
      participantCount: 2,
      teamCount: 1,
      isFeatured: true,
      judges: [judge._id],
    });

    const hackathon2 = await Hackathon.create({
      title: 'AI Global Challenge 2024',
      tagline: 'Solve real-world challenges using Generative AI and LLMs',
      description: 'Build novel multi-modal AI agents and enterprise automation tools.',
      organizer: organizer._id,
      organizationName: 'DevForge Foundation',
      mode: 'hybrid',
      category: 'Gen AI',
      status: 'upcoming',
      prizePool: 75000,
      currency: 'USD',
      maxTeamSize: 4,
      registrationDeadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      startDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000),
      submissionDeadline: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000),
      isFeatured: true,
    });

    console.log('Seeded Hackathons.');

    // 3. Create Registrations & Team
    const reg1 = await Registration.create({
      hackathon: hackathon1._id,
      user: participant1._id,
      status: 'approved',
    });

    const reg2 = await Registration.create({
      hackathon: hackathon1._id,
      user: participant2._id,
      status: 'approved',
    });

    const team = await Team.create({
      name: 'CyberForge Squad',
      joinCode: 'FORGE-7A8B',
      hackathon: hackathon1._id,
      leader: participant1._id,
      members: [participant1._id, participant2._id],
      maxSize: 4,
    });

    reg1.team = team._id;
    reg2.team = team._id;
    await Promise.all([reg1.save(), reg2.save()]);

    console.log('Seeded Registrations & Team.');

    // 4. Create Sample Submission
    const submission = await Submission.create({
      title: 'NeoVault: DeFi Savings',
      tagline: 'Automated yield optimizer and risk-hedging vault for stablecoins',
      description: 'NeoVault leverages smart contracts to automatically route capital to highest-yield protocols while hedging market downside using decentralized options.',
      githubUrl: 'https://github.com/alex/neovault-defi',
      demoUrl: 'https://neovault-demo.vercel.app',
      videoUrl: 'https://youtube.com/watch?v=neovault-demo',
      techStack: ['Solidity', 'React', 'Ethers.js', 'Tailwind'],
      hackathon: hackathon1._id,
      team: team._id,
      submittedBy: participant1._id,
      status: 'under_review',
      averageScore: 9.0,
      reviewCount: 1,
    });

    // 5. Create Judge Review
    await Review.create({
      submission: submission._id,
      judge: judge._id,
      hackathon: hackathon1._id,
      technicalScore: 9,
      innovationScore: 9,
      designScore: 9,
      impactScore: 9,
      totalScore: 9.0,
      feedback: 'Outstanding technical implementation and clean code architecture. Impressive demo!',
    });

    console.log('Seeded Submission & Judge Review.');
    console.log('\n✅ Database Seeding Completed Successfully!');
    console.log('--------------------------------------------------');
    console.log('Test User Credentials (Password for all: password123):');
    console.log('  Admin:       admin@hackforge.com');
    console.log('  Organizer:   organizer@hackforge.com');
    console.log('  Participant: alex@hackforge.com');
    console.log('  Judge:       judge@hackforge.com');
    console.log('--------------------------------------------------');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedData();
