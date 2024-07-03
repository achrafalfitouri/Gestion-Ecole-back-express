const connection = require('../config/db');

// Get all detailsfacture
const getAlldetailsfacture = (req, res) => {
    const sql = 'SELECT * FROM detailsfacture ORDER BY created_at DESC';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get detailsfacture by ID
const getdetailsfactureById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM detailsfacture WHERE ID_DetailFacture = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('Not found');
        res.send(results[0]);
    });
};

// Create new detailsfacture
const createdetailsfacture = (req, res) => {
    const { ID_Facture, Description, Quantite, PrixUnitaire } = req.body;
    const sql = 'INSERT INTO detailsfacture (ID_Facture, Description, Quantite, PrixUnitaire, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())';
    connection.query(sql, [ID_Facture, Description, Quantite, PrixUnitaire], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('Created successfully!');
    });
};

// Update detailsfacture by ID
const updatedetailsfactureById = (req, res) => {
    const { id } = req.params;
    const { ID_Facture, Description, Quantite, PrixUnitaire } = req.body;
    const sql = 'UPDATE detailsfacture SET ID_Facture = ?, Description = ?, Quantite = ?, PrixUnitaire = ?, updated_at = NOW() WHERE ID_DetailFacture = ?';
    connection.query(sql, [ID_Facture, Description, Quantite, PrixUnitaire, id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Not found');
        res.send('Updated successfully!');
    });
};

// Delete detailsfacture by ID
const deletedetailsfactureById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM detailsfacture WHERE ID_DetailFacture = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Not found');
        res.send('Deleted successfully!');
    });
};

module.exports = { getAlldetailsfacture, getdetailsfactureById, createdetailsfacture, updatedetailsfactureById, deletedetailsfactureById };
