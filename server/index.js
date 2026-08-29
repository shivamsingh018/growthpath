import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Uploaded Resumes & Files securely
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

// Root Route Handler - Redirect to Frontend App on http://localhost:3000
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>GrowthPath API Server</title>
        <meta http-equiv="refresh" content="2;url=http://localhost:3000" />
        <style>
          body { font-family: system-ui, sans-serif; background: #050816; color: #fff; display: flex; height: 100vh; align-items: center; justify-content: center; margin: 0; text-align: center; }
          .card { background: #0b1020; padding: 2.5rem; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); max-width: 480px; }
          .btn { display: inline-block; padding: 0.75rem 1.5rem; background: #4f46e5; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 700; margin-top: 1rem; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>🚀 GrowthPath API Server Running</h2>
          <p>Redirecting you to the main GrowthPath Web Application on <strong>http://localhost:3000</strong>...</p>
          <a href="http://localhost:3000" class="btn">Open GrowthPath Web Application →</a>
        </div>
      </body>
    </html>
  `);
});

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'GrowthPath Backend API Server Running', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/projects', projectRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled API Error:', err.stack);
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected server error occurred.'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 GrowthPath Backend API Server listening on http://localhost:${PORT}`);
});
