const connection = require('../config/db');

// Get all paiementetudiants
const getAllPaiementEtudiants = (req, res) => {
    const sql = 'SELECT * FROM paiementetudiants';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get paiementetudiants by ID
const getPaiementEtudiantsById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM paiementetudiants WHERE ID_PaiementEtudiants = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('PaiementEtudiants not found');
        res.send(results[0]);
    });
};

// Create new paiementetudiants
const createPaiementEtudiants = (req, res) => {
    const { ID_PaiementEtudiants, ID_Inscription, ID_TypePaiement, DatePaiementEtudiants, Montant } = req.body;
    const sql = 'INSERT INTO paiementetudiants (ID_PaiementEtudiants, ID_Inscription, ID_TypePaiement, DatePaiementEtudiants, Montant) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [ID_PaiementEtudiants, ID_Inscription, ID_TypePaiement, DatePaiementEtudiants, Montant], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('PaiementEtudiants created successfully!');
    });
};

// Update paiementetudiants by ID
const updatePaiementEtudiantsById = (req, res) => {
    const { id } = req.params;
    const { ID_Inscription, ID_TypePaiement, DatePaiementEtudiants, Montant } = req.body;
    const sql = 'UPDATE paiementetudiants SET ID_Inscription = ?, ID_TypePaiement = ?, DatePaiementEtudiants = ?, Montant = ? WHERE ID_PaiementEtudiants = ?';
    connection.query(sql, [ID_Inscription, ID_TypePaiement, DatePaiementEtudiants, Montant, id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('PaiementEtudiants not found');
        res.send('PaiementEtudiants updated successfully!');
    });
};

// Delete paiementetudiants by ID
const deletePaiementEtudiantsById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM paiementetudiants WHERE ID_PaiementEtudiants = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('PaiementEtudiants not found');
        res.send('PaiementEtudiants deleted successfully!');
    });
};

module.exports = {
    getAllPaiementEtudiants,
    getPaiementEtudiantsById,
    createPaiementEtudiants,
    updatePaiementEtudiantsById,
    deletePaiementEtudiantsById
};
