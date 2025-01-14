const connection = require('../config/db');

// Get all typepaiement
const getAllTypePaiement = (req, res) => {
    const sql = 'SELECT * FROM typepaiement ORDER BY GREATEST(created_at, updated_at) DESC';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get typepaiement by ID
const getTypePaiementById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM typepaiement WHERE ID_TypePaiement = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('TypePaiement not found');
        res.send(results[0]);
    });
};

// Create new typepaiement
const createTypePaiement = (req, res) => {
    const { TypePaiement ,created_at, updated_at} = req.body;
    const sql = 'INSERT INTO typepaiement (TypePaiement,created_at, updated_at) VALUES (?,NOW(), NOW())';
    connection.query(sql, [TypePaiement,created_at, updated_at], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('TypePaiement created successfully!');
    });
};

// Update typepaiement by ID
const updateTypePaiementById = (req, res) => {
    const { id } = req.params;
    const { TypePaiement} = req.body;
    const sql = 'UPDATE typepaiement SET TypePaiement = ?, updated_at = NOW() WHERE ID_TypePaiement = ?';
    connection.query(sql, [TypePaiement,  id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('TypePaiement not found');
        res.send('TypePaiement updated successfully!');
    });
};

// Delete typepaiement by ID
const deleteTypePaiementById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM typepaiement WHERE ID_TypePaiement = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('TypePaiement not found');
        res.send('TypePaiement deleted successfully!');
    });
};

module.exports = {
    getAllTypePaiement,
    getTypePaiementById,
    createTypePaiement,
    updateTypePaiementById,
    deleteTypePaiementById
};
