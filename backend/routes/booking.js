const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Booking = require('../models/Booking');

// Nodemailer transport setup
// Use a test account or environment variables for real credentials
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, destination, date, passengers, message } = req.body;

    // Save to database
    const newBooking = new Booking({
      firstName,
      lastName,
      email,
      phone,
      destination,
      date,
      passengers,
      message
    });
    
    await newBooking.save();

    // Create Admin Notification
    const Notification = require('../models/Notification');
    await Notification.create({
      title: 'Nouvelle réservation',
      message: `${firstName} ${lastName} a réservé pour ${destination}`,
      type: 'reservation',
      link: `/admin/reservations`
    });

    // Send confirmation email
    if (process.env.SMTP_USER) {
      const mailOptions = {
        from: '"Parfait Voyages" <noreply@parfaitvoyages.dz>',
        to: email,
        subject: 'Confirmation de votre demande de réservation',
        html: `
          <h1>Merci ${firstName} !</h1>
          <p>Nous avons bien reçu votre demande de réservation pour <strong>${destination}</strong>.</p>
          <p>Notre équipe vous contactera très prochainement au ${phone} pour finaliser les détails.</p>
          <br/>
          <p>L'équipe Parfait Voyages</p>
        `
      };
      
      await transporter.sendMail(mailOptions).catch(console.error);

      // Send admin notification
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@parfaitvoyages.dz';
      const adminMailOptions = {
        from: '"Parfait Voyages" <noreply@parfaitvoyages.dz>',
        to: adminEmail,
        subject: `Nouvelle réservation : ${destination}`,
        html: `
          <h1>Nouvelle réservation</h1>
          <p><strong>Client :</strong> ${firstName} ${lastName}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Téléphone :</strong> ${phone}</p>
          <p><strong>Destination :</strong> ${destination}</p>
          <p><strong>Passagers :</strong> ${passengers}</p>
          <p><strong>Date :</strong> ${date}</p>
        `
      };
      await transporter.sendMail(adminMailOptions).catch(console.error);
    }

    res.status(201).json({ success: true, booking: newBooking });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la réservation' });
  }
});

// GET /api/bookings (Admin route to fetch all bookings)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error('Fetch bookings error:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des réservations' });
  }
});

// PUT /api/bookings/:id/status (Admin route to update booking status)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Statut invalide' });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Réservation non trouvée' });
    }

    res.status(200).json({ success: true, booking });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour du statut' });
  }
});

module.exports = router;
