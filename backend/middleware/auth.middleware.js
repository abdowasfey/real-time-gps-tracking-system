const jwt = require('jsonwebtoken');
require('dotenv').config();

// ================= AUTH =================
exports.auth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header)
    return res.status(401).json({ message: 'No token provided' });

  const token = header.split(' ')[1];

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();

  } catch (err) {
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
};


// ================= ROLES =================
exports.allowRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      message: `Access denied. Allowed roles: ${roles.join(', ')}`
    });
  }

  next();
};
