const connection = require('../config/db');

// Get all factures
const getAllfactures = (req, res) => {
    const sql = 'SELECT * FROM factures ORDER BY GREATEST(created_at, updated_at) DESC;';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get facture by ID
const getfacturesById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM factures WHERE ID_Facture = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('Facture not found');
        res.send(results[0]);
    });
};

// Create new facture
const createfactures = (req, res) => {
    const { TypeFacture, DateFacture, Montant, ID_Fournisseur,ID_Etudiant } = req.body;
    const sql = 'INSERT INTO factures (TypeFacture, DateFacture, Montant, ID_Fournisseur,,ID_Etudiant, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())';
    connection.query(sql, [TypeFacture, DateFacture, Montant, ID_Fournisseur,ID_Etudiant], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('Facture created successfully!');
    });
};

// Update facture by ID
const updatefacturesById = (req, res) => {
    const { id } = req.params;
    const { TypeFacture, DateFacture, Montant, ID_Fournisseur,ID_Etudiant } = req.body;
    const sql = 'UPDATE factures SET TypeFacture = ?, DateFacture = ?, Montant = ?, ID_Fournisseur = ?,,ID_Etudiant=?, updated_at = NOW() WHERE ID_Facture = ?';
    connection.query(sql, [TypeFacture, DateFacture, Montant, ID_Fournisseur,,ID_Etudiant, id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Facture not found');
        res.send('Facture updated successfully!');
    });
};

// Delete facture by ID
const deletefacturesById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM factures WHERE ID_Facture = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Facture not found');
        res.send('Facture deleted successfully!');
    });
};

module.exports = { getAllfactures, getfacturesById, createfactures, updatefacturesById, deletefacturesById };
