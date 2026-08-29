import express from 'express';
import { getQuery, runQuery, allQuery } from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get Submissions
router.get('/submissions', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const submissions = await allQuery('SELECT * FROM project_submissions WHERE user_id = ? ORDER BY created_at DESC', [userId]);

    res.json({ success: true, submissions });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch project submissions.' } });
  }
});

// Submit Project
router.post('/submit', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, category, github_url, live_url, description } = req.body;

    if (!title || !github_url) {
      return res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'Title and GitHub URL are required.' } });
    }

    const subId = 'sub_' + Date.now();
    const qualityScore = Math.floor(Math.random() * 10) + 88; // 88-98 quality score

    await runQuery(
      'INSERT INTO project_submissions (id, user_id, title, category, github_url, live_url, description, quality_score) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [subId, userId, title, category || 'Software Engineering', github_url, live_url || '', description || '', qualityScore]
    );

    res.json({
      success: true,
      submission: {
        id: subId,
        user_id: userId,
        title,
        category,
        github_url,
        live_url,
        description,
        quality_score: qualityScore,
        created_at: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error('Project submission error:', err);
    res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to submit project.' } });
  }
});

export default router;
