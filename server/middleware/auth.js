import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'growthpath_secret_key_2026';

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // Default fallback user ID for demo seamless experience if unauthenticated
    req.user = { id: 'usr_shivam_default', role: 'STUDENT', email: 'shivam@growthpath.com' };
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      req.user = { id: 'usr_shivam_default', role: 'STUDENT', email: 'shivam@growthpath.com' };
      return next();
    }
    req.user = user;
    next();
  });
};

export const requireRole = (roles = []) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: { code: 'UNAUTHORIZED_ROLE', message: 'You do not have access to this resource.' }
      });
    }
    next();
  };
};
