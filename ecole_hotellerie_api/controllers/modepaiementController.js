const connection = require('../config/db');

// Get all modepaiement
const getAllModePaiement = (req, res) => {
    const sql = 'SELECT * FROM modepaiement';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get modepaiement by ID
const getModePaiementById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM modepaiement WHERE ID_ModePaiement = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('Mode de paiement not found');
        res.send(results[0]);
    });
};

// Create new modepaiement
const createModePaiement = (req, res) => {
    const { ID_ModePaiement, ModePaiement } = req.body;
    const sql = 'INSERT INTO modepaiement (ID_ModePaiement, ModePaiement) VALUES (?, ?)';
    connection.query(sql, [ID_ModePaiement, ModePaiement], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('Mode de paiement created successfully!');
    });
};

// Update modepaiement by ID
const updateModePaiementById = (req, res) => {
    const { id } = req.params;
    const { ModePaiement } = req.body;
    const sql = 'UPDATE modepaiement SET ModePaiement = ? WHERE ID_ModePaiement = ?';
    connection.query(sql, [ModePaiement, id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Mode de paiement not found');
        res.send('Mode de paiement updated successfully!');
    });
};

// Delete modepaiement by ID
const deleteModePaiementById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM modepaiement WHERE ID_ModePaiement = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Mode de paiement not found');
        res.send('Mode de paiement deleted successfully!');
    });
};

module.exports = {
    getAllModePaiement,
    getModePaiementById,
    createModePaiement,
    updateModePaiementById,
    deleteModePaiementById
};
