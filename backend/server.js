require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bookingRoutes = require('./routes/booking');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bookings', bookingRoutes);

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/parfait-voyages-demo';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connecté à MongoDB');
  })
  .catch((err) => {
    console.error('Erreur de connexion MongoDB:', err.message);
  });

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
