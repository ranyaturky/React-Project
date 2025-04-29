const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = (req, res) => {
  const { nom, email, password, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = 'INSERT INTO utilisateurs (nom, email, password, role) VALUES (?, ?, ?, ?)';
  db.query(sql, [nom, email, hashedPassword, role], (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la création du compte.' });
    res.status(201).json({ message: 'Compte créé avec succès' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM utilisateurs WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ message: 'Utilisateur non trouvé.' });

    const user = results[0];
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Mot de passe incorrect.' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, nom: user.nom, role: user.role } });
  });
};
