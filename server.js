require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const congeRoutes = require('./routes/congeRoutes');
const db = require('./config/db');

const app = express();

// ✅ CORS doit être appliqué directement avec les bonnes options
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ✅ Gère les requêtes préflight (OPTIONS)
app.options('*', cors());

// ✅ Middleware pour parser le JSON
app.use(bodyParser.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/conges', congeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur démarré sur le port ${PORT}`));
