import express from 'express';
import { allQuery, runQuery } from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    let notifications = await allQuery('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC', [userId]);

    if (notifications.length === 0) {
      notifications = [
        { id: 'n1', title: 'AI Project Review completed', text: 'Quality Score: 92/100 for your Fullstack Dashboard.', view: 'project-lab', is_read: 0, created_at: '10m ago' },
        { id: 'n2', title: 'Mentor feedback received', text: 'Shivam Singh posted pin feedback on your COA sheet.', view: 'dashboard', is_read: 0, created_at: '1h ago' },
        { id: 'n3', title: 'Resume score updated', text: 'ATS Score increased to 84/100 after keyword optimization.', view: 'ats', is_read: 0, created_at: '2h ago' },
        { id: 'n4', title: 'New project recommendation', text: 'Eco-Pavilion Architectural Sheet is available in Project Lab.', view: 'project-lab', is_read: 0, created_at: '1d ago' }
      ];
    }

    res.json({ success: true, notifications });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch notifications.' } });
  }
});

router.patch('/read-all', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    await runQuery('UPDATE notifications SET is_read = 1 WHERE user_id = ?', [userId]);
    res.json({ success: true, message: 'All notifications marked as read.' });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to update notifications.' } });
  }
});

export default router;
