import express from 'express';
import { getQuery, runQuery, allQuery } from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get User Applications
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const applications = await allQuery('SELECT * FROM job_applications WHERE user_id = ? ORDER BY updated_at DESC', [userId]);

    res.json({ success: true, applications });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch applications.' } });
  }
});

// Create Application
router.post('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { company, role, status, notes } = req.body;

    if (!company || !role) {
      return res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'Company and role are required.' } });
    }

    const appId = 'app_' + Date.now();
    const appliedDate = new Date().toISOString().split('T')[0];
    const appStatus = status || 'Applied';

    await runQuery(
      'INSERT INTO job_applications (id, user_id, company, role, applied_date, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [appId, userId, company, role, appliedDate, appStatus, notes || '']
    );

    // Create Notification
    const notifId = 'notif_' + Date.now();
    await runQuery(
      'INSERT INTO notifications (id, user_id, title, text, view) VALUES (?, ?, ?, ?, ?)',
      [notifId, userId, 'Job Application Submitted', `Your application for ${role} at ${company} has been saved.`, 'jobs']
    );

    res.json({
      success: true,
      application: { id: appId, user_id: userId, company, role, applied_date: appliedDate, status: appStatus, notes }
    });
  } catch (err) {
    console.error('Create application error:', err);
    res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to submit application.' } });
  }
});

// Update Status
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const appId = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'Status is required.' } });
    }

    await runQuery('UPDATE job_applications SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [status, appId]);

    res.json({ success: true, message: `Application status updated to ${status}.` });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to update application.' } });
  }
});

// Delete Application
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const appId = req.params.id;
    await runQuery('DELETE FROM job_applications WHERE id = ?', [appId]);

    res.json({ success: true, message: 'Application deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to delete application.' } });
  }
});

export default router;
