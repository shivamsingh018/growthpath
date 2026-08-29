import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { getQuery, runQuery, allQuery } from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.resolve(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `avatar_${Date.now()}_${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`)
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    const valid = ['.jpg', '.jpeg', '.png', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (valid.includes(ext)) cb(null, true);
    else cb(new Error('Only JPG, JPEG, PNG, and WEBP image files are allowed.'));
  }
});

const router = express.Router();

// Get Current Authenticated Profile
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await getQuery('SELECT id, username, email, phone, role, email_verified, phone_verified FROM users WHERE id = ?', [userId]);
    let profile = await getQuery('SELECT * FROM profiles WHERE user_id = ?', [userId]);

    if (!profile) {
      profile = {
        name: 'Shivam Singh',
        headline: 'Software Engineering Aspirant',
        bio: 'Computer Science Engineering student at Galgotias University focused on software development, problem solving, DSA, data analysis, and building real-world projects.',
        location: 'Gorakhpur, Uttar Pradesh',
        college: 'Galgotias University',
        degree: 'B.Tech Computer Science Engineering',
        graduation_year: 2027,
        target_role: 'Software Engineer',
        target_company: 'Accenture',
        skills: 'Java, Python, SQL, Data Analysis, Power BI, DSA, JavaScript, React, Node.js, Git, GitHub',
        github: 'https://github.com/shivamsingh',
        linkedin: 'https://linkedin.com/in/shivamsingh',
        portfolio: 'https://growthpath.com',
        avatar: '/shivam-singh.png'
      };
    }

    // Get statistics
    const applications = await allQuery('SELECT id FROM job_applications WHERE user_id = ?', [userId]);
    const projects = await allQuery('SELECT id FROM project_submissions WHERE user_id = ?', [userId]);

    // Calculate Completion %
    const fields = [
      profile.name,
      user ? user.username : '',
      user ? user.email : '',
      profile.location,
      profile.college,
      profile.degree,
      profile.skills,
      profile.github,
      profile.linkedin,
      profile.avatar
    ];
    const completedCount = fields.filter(f => f && String(f).trim().length > 0).length;
    const completionPercentage = Math.round((completedCount / fields.length) * 100);

    res.json({
      success: true,
      profile: {
        user_id: userId,
        name: profile.name || 'Shivam Singh',
        username: user ? user.username : 'shivam',
        email: user ? user.email : req.user.email,
        phone: user ? user.phone : '+91 98765 43210',
        role: user ? user.role : 'STUDENT',
        email_verified: user ? Boolean(user.email_verified) : true,
        phone_verified: user ? Boolean(user.phone_verified) : true,
        headline: profile.headline || 'Software Engineering Aspirant',
        bio: profile.bio || 'Computer Science Engineering student at Galgotias University focused on software development, problem solving, DSA, data analysis, and building real-world projects.',
        location: profile.location || 'Gorakhpur, Uttar Pradesh',
        college: profile.college || 'Galgotias University',
        degree: profile.degree || 'B.Tech Computer Science Engineering',
        graduation_year: profile.graduation_year || 2027,
        target_role: profile.target_role || 'Software Engineer',
        target_company: profile.target_company || 'Accenture',
        skills: profile.skills || 'Java, Python, SQL, Data Analysis, Power BI, DSA, JavaScript, React, Node.js, Git, GitHub',
        github: profile.github || 'https://github.com/shivamsingh',
        linkedin: profile.linkedin || 'https://linkedin.com/in/shivamsingh',
        portfolio: profile.portfolio || 'https://growthpath.com',
        avatar: profile.avatar || '/shivam-singh.png',
        completionPercentage,
        stats: {
          readinessScore: 84,
          atsScore: 82,
          dsaProgress: 76,
          projectsCount: projects.length || 8,
          applicationsCount: applications.length || 12
        }
      }
    });
  } catch (err) {
    console.error('Fetch profile error:', err);
    res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch profile.' } });
  }
});

// Update Profile
router.patch('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { 
      name, 
      username, 
      headline, 
      bio, 
      location, 
      college, 
      degree, 
      graduation_year, 
      target_role, 
      target_company, 
      skills, 
      github, 
      linkedin, 
      portfolio 
    } = req.body;

    // Check unique username if changing
    if (username) {
      const cleanUsername = username.trim().toLowerCase();
      const existingUser = await getQuery('SELECT id FROM users WHERE LOWER(username) = ? AND id != ?', [cleanUsername, userId]);
      if (existingUser) {
        return res.status(400).json({ success: false, error: { code: 'USERNAME_TAKEN', message: 'Username is already taken.' } });
      }
      await runQuery('UPDATE users SET username = ? WHERE id = ?', [cleanUsername, userId]);
    }

    // Check if profile exists
    const existingProfile = await getQuery('SELECT user_id FROM profiles WHERE user_id = ?', [userId]);

    if (!existingProfile) {
      await runQuery(
        'INSERT INTO profiles (user_id, name, headline, bio, location, college, degree, graduation_year, target_role, target_company, github, linkedin, portfolio, avatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [userId, name || 'Shivam Singh', headline || '', bio || '', location || '', college || '', degree || '', graduation_year || 2026, target_role || '', target_company || '', github || '', linkedin || '', portfolio || '', '/shivam-singh.png']
      );
    } else {
      await runQuery(
        'UPDATE profiles SET name = ?, headline = ?, bio = ?, location = ?, college = ?, degree = ?, graduation_year = ?, target_role = ?, target_company = ?, github = ?, linkedin = ?, portfolio = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?',
        [name, headline, bio, location, college, degree, graduation_year, target_role, target_company, github, linkedin, portfolio, userId]
      );
    }

    res.json({ success: true, message: 'Profile updated successfully ✓' });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to update profile.' } });
  }
});

// Upload Profile Photo
router.post('/photo', authenticateToken, (req, res) => {
  upload.single('photo')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: { code: 'UPLOAD_ERROR', message: err.message } });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, error: { code: 'NO_FILE', message: 'Please select an image file.' } });
    }

    try {
      const userId = req.user.id;
      const avatarUrl = `/uploads/${req.file.filename}`;

      await runQuery('UPDATE profiles SET avatar = ? WHERE user_id = ?', [avatarUrl, userId]);

      res.json({ success: true, avatar: avatarUrl, message: 'Profile photo updated ✓' });
    } catch (dbErr) {
      res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to update profile photo.' } });
    }
  });
});

// Public Profile Endpoint
router.get('/u/:username', async (req, res) => {
  try {
    const username = req.params.username.toLowerCase();
    const user = await getQuery('SELECT id, username, role FROM users WHERE LOWER(username) = ?', [username]);

    if (!user) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'User profile not found.' } });
    }

    const profile = await getQuery('SELECT name, headline, bio, college, degree, graduation_year, target_role, github, linkedin, portfolio, avatar FROM profiles WHERE user_id = ?', [user.id]);

    res.json({
      success: true,
      publicProfile: {
        name: profile ? profile.name : 'Shivam Singh',
        username: user.username,
        role: user.role,
        headline: profile ? profile.headline : 'Senior Fullstack Engineer',
        bio: profile ? profile.bio : '',
        college: profile ? profile.college : '',
        degree: profile ? profile.degree : '',
        target_role: profile ? profile.target_role : '',
        github: profile ? profile.github : '',
        linkedin: profile ? profile.linkedin : '',
        portfolio: profile ? profile.portfolio : '',
        avatar: profile ? profile.avatar : '/shivam-singh.png'
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch public profile.' } });
  }
});

export default router;
