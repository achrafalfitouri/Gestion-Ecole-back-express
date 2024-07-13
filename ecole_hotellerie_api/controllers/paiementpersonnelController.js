const connection = require('../config/db');

// Get all paiementpersonnel
const getAllPaiementPersonnel = (req, res) => {
    const sql = `SELECT 
      pp.ID_PaiementPersonnel, 
    pp.DatePaiementPersonnel, 
    pp.Montant, 
    pp.Reste, 
    pp.MontantTotal,
    pp.created_at AS tempsvirement,
    p.NomPersonnel, 
    p.PrenomPersonnel, 
    p.CIN, 
    p.Email, 
    p.Salaire, 
    p.EtatPersonnel, 
    p.ID_Personnel,
    t.TypePaiement,
    t.ID_TypePaiement
  
FROM 
    paiementpersonnel pp
JOIN 
    Personnel p ON p.ID_Personnel = pp.ID_Personnel
JOIN 
    typepaiement t ON t.ID_TypePaiement = pp.ID_TypePaiement
ORDER BY GREATEST(pp.created_at, pp.updated_at) DESC;

     ;`;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get paiementpersonnel by ID
const getPaiementPersonnelById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM paiementpersonnel WHERE ID_PaiementPersonnel = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('PaiementPersonnel not found');
        res.send(results[0]);
    });
};

// Create new paiementpersonnel
const createPaiementPersonnel = (req, res) => {
    const { ID_Personnel, ID_TypePaiement, DatePaiementPersonnel, Montant,Reste,MontantTotal } = req.body;
    const sql = 'INSERT INTO paiementpersonnel (ID_Personnel, ID_TypePaiement, DatePaiementPersonnel, Montant,Reste,MontantTotal ,created_at, updated_at) VALUES (?,?,?, ?, ?, ?, NOW(), NOW())';
    connection.query(sql, [ID_Personnel, ID_TypePaiement, DatePaiementPersonnel, Montant,Reste,MontantTotal], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('PaiementPersonnel created successfully!');
    });
};

// Update paiementpersonnel by ID
const updatePaiementPersonnelById = (req, res) => {
    const { id } = req.params;
    const { ID_Personnel, ID_TypePaiement, DatePaiementPersonnel, Montant,Reste,MontantTotal } = req.body;
    const sql = 'UPDATE paiementpersonnel SET ID_Personnel = ?, ID_TypePaiement = ?, DatePaiementPersonnel = ?, Montant = ?,Reste= ?,MontantTotal= ?, updated_at = NOW() WHERE ID_PaiementPersonnel = ?';
    connection.query(sql, [ID_Personnel, ID_TypePaiement, DatePaiementPersonnel, Montant,Reste,MontantTotal, id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('PaiementPersonnel not found');
        res.send('PaiementPersonnel updated successfully!');
    });
};

// Delete paiementpersonnel by ID
const deletePaiementPersonnelById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM paiementpersonnel WHERE ID_PaiementPersonnel = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('PaiementPersonnel not found');
        res.send('PaiementPersonnel deleted successfully!');
    });
};

module.exports = {
    getAllPaiementPersonnel,
    getPaiementPersonnelById,
    createPaiementPersonnel,
    updatePaiementPersonnelById,
    deletePaiementPersonnelById
};
