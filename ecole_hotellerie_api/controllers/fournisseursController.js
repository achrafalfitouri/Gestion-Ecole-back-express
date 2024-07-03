const connection = require('../config/db');

// Get all fournisseurs
const getAllFournisseurs = (req, res) => {
    const sql = 'SELECT * FROM fournisseurs ORDER BY created_at DESC';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get fournisseur by ID
const getFournisseurById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM fournisseurs WHERE ID_Fournisseur = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('Fournisseur not found');
        res.send(results[0]);
    });
};

// Create new fournisseur
const createFournisseur = (req, res) => {
    const { NomFournisseur, Adresse, Tel, Email } = req.body;
    const sql = 'INSERT INTO fournisseurs (NomFournisseur, Adresse, Tel, Email, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())';
    connection.query(sql, [NomFournisseur, Adresse, Tel, Email], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('Fournisseur created successfully!');
    });
};

// Update fournisseur by ID
const updateFournisseurById = (req, res) => {
    const { id } = req.params;
    const { NomFournisseur, Adresse, Tel, Email } = req.body;
    const sql = 'UPDATE fournisseurs SET NomFournisseur = ?, Adresse = ?, Tel = ?, Email = ?, updated_at = NOW() WHERE ID_Fournisseur = ?';
    connection.query(sql, [NomFournisseur, Adresse, Tel, Email, id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Fournisseur not found');
        res.send('Fournisseur updated successfully!');
    });
};

// Delete fournisseur by ID
const deleteFournisseurById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM fournisseurs WHERE ID_Fournisseur = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Fournisseur not found');
        res.send('Fournisseur deleted successfully!');
    });
};

module.exports = {
    getAllFournisseurs,
    getFournisseurById,
    createFournisseur,
    updateFournisseurById,
    deleteFournisseurById
};
