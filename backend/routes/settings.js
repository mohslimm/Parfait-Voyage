const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/test-email', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email est requis' });
  }

  // Vérifier si le SMTP est configuré (par défaut c'est 'votre_email@gmail.com' dans .env)
  if (process.env.SMTP_USER === 'votre_email@gmail.com' || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return res.status(400).json({ 
      success: false, 
      message: 'SMTP non configuré. Veuillez ajouter votre email et mot de passe d\'application dans le fichier backend/.env'
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Parfait Voyages Dashboard" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Test de Notification - Parfait Voyages",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #111827; border-bottom: 2px solid #C9A96E; padding-bottom: 10px;">Système de Notification Configuré ✓</h2>
          <p style="color: #4b5563; font-size: 16px;">Bonjour,</p>
          <p style="color: #4b5563; font-size: 16px;">
            Cet email confirme que votre système d'envoi de notification fonctionne correctement avec Parfait Voyages.
          </p>
          <p style="color: #4b5563; font-size: 16px;">
            Désormais, les alertes concernant les nouvelles réservations et clients seront envoyées à cette adresse.
          </p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; text-align: center;">
            <p>Message généré automatiquement depuis votre Dashboard Admin Parfait Voyages.</p>
          </div>
        </div>
      `,
    });

    res.json({ success: true, message: 'Email de test envoyé', messageId: info.messageId });
  } catch (error) {
    console.error('Erreur SMTP:', error);
    res.status(500).json({ success: false, message: 'Échec de l\'envoi. Vérifiez vos identifiants SMTP (Mot de passe d\'application Google requis).', error: error.message });
  }
});

module.exports = router;
