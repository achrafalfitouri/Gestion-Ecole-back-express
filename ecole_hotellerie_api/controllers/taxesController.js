const connection = require('../config/db');

// Get all typepaiement
const getAllTaxes = (req, res) => {
    const sql = 'SELECT * FROM taxes ORDER BY GREATEST(created_at, updated_at) DESC';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get typepaiement by ID
const getTaxesById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM taxes WHERE ID_TypePaiement = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('TypePaiement not found');
        res.send(results[0]);
    });
};

// Create new typepaiement
const createTaxes = (req, res) => {
    const { Nom,Valeur ,created_at, updated_at} = req.body;
    const sql = 'INSERT INTO taxes (Nom,Valeur ,created_at, updated_at) VALUES (?,?,NOW(), NOW())';
    connection.query(sql, [Nom,Valeur ,created_at, updated_at], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('TypePaiement created successfully!');
    });
};

// Update typepaiement by ID
const updateTaxesById = (req, res) => {
    const { id } = req.params;
    const { Nom,Valeur} = req.body;
    const sql = 'UPDATE taxes SET Nom =?,Valeur =?, updated_at = NOW() WHERE ID_TypePaiement = ?';
    connection.query(sql, [Nom,Valeur,  id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('TypePaiement not found');
        res.send('TypePaiement updated successfully!');
    });
};

// Delete typepaiement by ID
const deleteTaxesById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM taxes WHERE ID_Taxe = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('TypePaiement not found');
        res.send('TypePaiement deleted successfully!');
    });
};

module.exports = {
    getAllTaxes,
    getTaxesById,
    createTaxes,
    updateTaxesById,
    deleteTaxesById
};
