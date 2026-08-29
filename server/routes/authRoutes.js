import express from 'express';
import bcrypt from 'bcryptjs';
import { getQuery, runQuery } from '../db/database.js';
import { generateToken, authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Username availability check
router.get('/check-username', async (req, res) => {
  try {
    const { username } = req.query;
    if (!username || typeof username !== 'string') {
      return res.json({ available: false, message: 'Invalid username format.' });
    }
    const cleanUsername = username.trim().toLowerCase();
    if (cleanUsername.length < 3) {
      return res.json({ available: false, message: 'Username must be at least 3 characters.' });
    }

    const existing = await getQuery('SELECT id FROM users WHERE LOWER(username) = ?', [cleanUsername]);
    if (existing) {
      return res.json({ available: false, message: '✕ Username already taken' });
    }
    res.json({ available: true, message: '✓ Username available' });
  } catch (err) {
    res.status(500).json({ available: false, message: 'Server check error.' });
  }
});

// Register / Sign up
router.post('/register', async (req, res) => {
  try {
    const { email, username, phone, password, name, role } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'Email, password, and name are required.' } });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanUsername = username ? username.toLowerCase().trim() : 'user_' + Math.floor(Math.random() * 10000);

    const existingEmail = await getQuery('SELECT id FROM users WHERE email = ?', [cleanEmail]);
    if (existingEmail) {
      return res.status(400).json({ success: false, error: { code: 'USER_EXISTS', message: 'An account with this email already exists.' } });
    }

    if (username) {
      const existingUser = await getQuery('SELECT id FROM users WHERE LOWER(username) = ?', [cleanUsername]);
      if (existingUser) {
        return res.status(400).json({ success: false, error: { code: 'USERNAME_TAKEN', message: 'Username already taken.' } });
      }
    }

    const userId = 'usr_' + Date.now();
    const hash = await bcrypt.hash(password, 10);
    const userRole = role === 'MENTOR' || role === 'RECRUITER' ? role : 'STUDENT';

    await runQuery(
      'INSERT INTO users (id, username, email, phone, password_hash, role) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, cleanUsername, cleanEmail, phone || null, hash, userRole]
    );

    await runQuery(
      'INSERT INTO profiles (user_id, name, avatar, target_role, target_company) VALUES (?, ?, ?, ?, ?)',
      [userId, name, '/shivam-singh.png', 'Full Stack Developer', 'Accenture']
    );

    const token = generateToken({ id: userId, email: cleanEmail, role: userRole });
    res.json({
      success: true,
      token,
      user: { id: userId, username: cleanUsername, email: cleanEmail, role: userRole, name, avatar: '/shivam-singh.png' }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Registration failed.' } });
  }
});

// Login (Email or Username)
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'Email/Username and password required.' } });
    }

    const cleanId = identifier.toLowerCase().trim();
    const user = await getQuery('SELECT * FROM users WHERE LOWER(email) = ? OR LOWER(username) = ?', [cleanId, cleanId]);

    if (!user || !user.password_hash) {
      return res.status(401).json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Email/username or password is incorrect.' } });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Email/username or password is incorrect.' } });
    }

    const profile = await getQuery('SELECT name, avatar FROM profiles WHERE user_id = ?', [user.id]);
    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        name: profile ? profile.name : 'Shivam Singh',
        avatar: profile ? profile.avatar : '/shivam-singh.png'
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Login server error.' } });
  }
});

// Google OAuth Handler
router.post('/google', async (req, res) => {
  try {
    const { googleToken, email, name } = req.body;
    const userEmail = (email || 'shivam.google@example.com').toLowerCase();
    const userName = name || 'Shivam Singh';

    let user = await getQuery('SELECT * FROM users WHERE email = ?', [userEmail]);
    if (!user) {
      const userId = 'usr_g_' + Date.now();
      await runQuery('INSERT INTO users (id, username, email, role, email_verified) VALUES (?, ?, ?, ?, 1)', [userId, 'shivam_g', userEmail, 'STUDENT']);
      await runQuery('INSERT INTO profiles (user_id, name, avatar) VALUES (?, ?, ?)', [userId, userName, '/shivam-singh.png']);
      user = { id: userId, email: userEmail, role: 'STUDENT', username: 'shivam_g' };
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    res.json({
      success: true,
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role, name: userName, avatar: '/shivam-singh.png' }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: 'GOOGLE_AUTH_ERROR', message: 'Google authentication failed.' } });
  }
});

// Send Mobile OTP
router.post('/otp/send', async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'Mobile number is required.' } });
    }

    const otpCode = '123456'; // Development test OTP mode
    const hash = await bcrypt.hash(otpCode, 10);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 min expiry

    await runQuery('INSERT INTO otps (id, phone, code_hash, expires_at) VALUES (?, ?, ?, ?)', ['otp_' + Date.now(), phone, hash, expiresAt]);

    res.json({
      success: true,
      message: `OTP sent to ${phone}. (Dev test OTP: 123456)`,
      cooldown: 30
    });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: 'OTP_ERROR', message: 'Failed to send OTP.' } });
  }
});

// Verify Mobile OTP & Login
router.post('/otp/verify', async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) {
      return res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'Phone and OTP code are required.' } });
    }

    if (otp !== '123456') {
      return res.status(400).json({ success: false, error: { code: 'INVALID_OTP', message: 'That OTP is incorrect or expired.' } });
    }

    let user = await getQuery('SELECT * FROM users WHERE phone = ?', [phone]);
    if (!user) {
      const userId = 'usr_p_' + Date.now();
      const userEmail = `phone_${phone}@growthpath.com`;
      await runQuery('INSERT INTO users (id, phone, email, role, phone_verified) VALUES (?, ?, ?, ?, 1)', [userId, phone, userEmail, 'STUDENT']);
      await runQuery('INSERT INTO profiles (user_id, name, avatar) VALUES (?, ?, ?)', [userId, 'Shivam Singh', '/shivam-singh.png']);
      user = { id: userId, email: userEmail, role: 'STUDENT', phone };
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    res.json({
      success: true,
      token,
      user: { id: user.id, phone: user.phone, email: user.email, role: user.role, name: 'Shivam Singh', avatar: '/shivam-singh.png' }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: 'OTP_VERIFY_ERROR', message: 'OTP verification failed.' } });
  }
});

// Get Current Authenticated User
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await getQuery('SELECT id, username, email, phone, role FROM users WHERE id = ?', [req.user.id]);
    const profile = await getQuery('SELECT * FROM profiles WHERE user_id = ?', [req.user.id]);

    res.json({
      success: true,
      user: {
        id: req.user.id,
        username: user ? user.username : 'shivamsingh',
        email: user ? user.email : req.user.email,
        phone: user ? user.phone : '+91 98765 43210',
        role: user ? user.role : req.user.role,
        name: profile ? profile.name : 'Shivam Singh',
        avatar: profile ? profile.avatar : '/shivam-singh.png',
        headline: profile ? profile.headline : 'Senior Fullstack Software Engineer',
        target_role: profile ? profile.target_role : 'Full Stack Developer',
        target_company: profile ? profile.target_company : 'Accenture'
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Auth check error.' } });
  }
});

// Logout
router.post('/logout', authenticateToken, async (req, res) => {
  res.json({ success: true, message: 'Logged out successfully.' });
});

export default router;
