
const db = require('../config/db');

exports.demanderConge = (req, res) => {
  const { type, debut, fin, commentaire } = req.body;
  const userId = req.user.id;

  const sql = `INSERT INTO conges (utilisateur_id, type, date_debut, date_fin, commentaire, statut)
               VALUES (?, ?, ?, ?, ?, 'en attente')`;
  db.query(sql, [userId, type, debut, fin, commentaire], (err) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la demande.' });
    res.json({ message: 'Demande envoyée.' });
  });
};

exports.listerConges = (req, res) => {
  db.query('SELECT * FROM conges', (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur.' });
    res.json(results);
  });
};

exports.validerConge = (req, res) => {
  const id = req.params.id;
  db.query('UPDATE conges SET statut = "validé" WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ message: 'Erreur.' });
    res.json({ message: 'Congé validé.' });
  });
};

exports.refuserConge = (req, res) => {
  const id = req.params.id;
  const { motif_refus } = req.body;
  db.query('UPDATE conges SET statut = "refusé", motif_refus = ? WHERE id = ?', [motif_refus, id], (err) => {
    if (err) return res.status(500).json({ message: 'Erreur.' });
    res.json({ message: 'Congé refusé.' });
  });
};

exports.consulterSoldes = (req, res) => {
  const userId = req.params.id;
  db.query('SELECT * FROM soldes WHERE utilisateur_id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur.' });
    res.json(results[0]);
  });
};
