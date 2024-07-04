const connection = require('../config/db');

// Get all filiere
const getAllFiliere = (req, res) => {
    const sql = 'SELECT * FROM filiere ORDER BY created_at DESC';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};



// Get filiere by ID
const getFiliereById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM filiere WHERE ID_Filiere = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('Filiere not found');
        res.send(results[0]);
    });
};

// Create new filiere
const createFiliere = (req, res) => {
    const { NomFiliere } = req.body;
    const sql = 'INSERT INTO filiere (NomFiliere, created_at, updated_at) VALUES (?, NOW(), NOW())';
    connection.query(sql, [NomFiliere], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('Filiere created successfully!');
    });
};

// Update filiere by ID
const updateFiliereById = (req, res) => {
    const { id } = req.params;
    const { NomFiliere } = req.body;
    const sql = 'UPDATE filiere SET NomFiliere = ?, updated_at = NOW() WHERE ID_Filiere = ?';
    connection.query(sql, [NomFiliere, id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Filiere not found');
        res.send('Filiere updated successfully!');
    });
};

// Delete filiere by ID
const deleteFiliereById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM filiere WHERE ID_Filiere = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Filiere not found');
        res.send('Filiere deleted successfully!');
    });
};

module.exports = {
    getAllFiliere,
    getFiliereById,
    createFiliere,
    updateFiliereById,
    deleteFiliereById,
    
};
