const db = require('../config/db');

const CongeModel = {
  demanderConge: (data, callback) => {
    const query = 'INSERT INTO conges SET ?';
    db.query(query, data, callback);
  },

  getCongesEnAttente: (callback) => {
    db.query('SELECT * FROM conges WHERE statut = "en attente"', callback);
  },

  mettreAJourConge: (id, data, callback) => {
    db.query('UPDATE conges SET ? WHERE id = ?', [data, id], callback);
  },

  getSoldes: (userId, callback) => {
    db.query('SELECT solde_annuel, solde_maladie FROM utilisateurs WHERE id = ?', [userId], callback);
  },

  majSoldes: (userId, champ, montant, callback) => {
    db.query(`UPDATE utilisateurs SET ${champ} = ${champ} - ? WHERE id = ?`, [montant, userId], callback);
  }
};

module.exports = CongeModel;
