const connection = require('../config/db');

// Get all paiementpersonnel
const getAllPaiementPersonnel = (req, res) => {
    const sql = 'SELECT * FROM paiementpersonnel';
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
    const { ID_PaiementPersonnel, ID_Personnel, ID_TypePaiement, DatePaiementPersonnel, Montant } = req.body;
    const sql = 'INSERT INTO paiementpersonnel (ID_PaiementPersonnel, ID_Personnel, ID_TypePaiement, DatePaiementPersonnel, Montant) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [ID_PaiementPersonnel, ID_Personnel, ID_TypePaiement, DatePaiementPersonnel, Montant], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('PaiementPersonnel created successfully!');
    });
};

// Update paiementpersonnel by ID
const updatePaiementPersonnelById = (req, res) => {
    const { id } = req.params;
    const { ID_Personnel, ID_TypePaiement, DatePaiementPersonnel, Montant } = req.body;
    const sql = 'UPDATE paiementpersonnel SET ID_Personnel = ?, ID_TypePaiement = ?, DatePaiementPersonnel = ?, Montant = ? WHERE ID_PaiementPersonnel = ?';
    connection.query(sql, [ID_Personnel, ID_TypePaiement, DatePaiementPersonnel, Montant, id], (err, result) => {
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
