const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_parfait_voyages_key_64_chars_min';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@parfaitvoyages.dz';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign(
      { id: 'admin123', role: 'admin', email: ADMIN_EMAIL },
      JWT_SECRET,
      { expiresIn: '12h' }
    );

    // Set HttpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 12 * 60 * 60 * 1000 // 12 hours
    });

    return res.status(200).json({ success: true, message: 'Connecté' });
  }

  res.status(401).json({ success: false, message: 'Identifiants incorrects' });
});

// GET /api/auth/me (Check if authenticated)
router.get('/me', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Non authentifié' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ success: true, user: decoded });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token invalide' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.status(200).json({ success: true, message: 'Déconnecté' });
});

module.exports = router;
