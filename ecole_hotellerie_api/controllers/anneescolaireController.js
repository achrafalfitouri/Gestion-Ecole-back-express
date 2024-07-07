const connection = require('../config/db');

// Get all school years
const getAllAnneeScolaire = (req, res) => {
    const sql = 'SELECT * FROM anneescolaire ORDER BY created_at DESC';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get school year by ID
const getAnneeScolaireById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM anneescolaire WHERE ID_AnneeScolaire = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('School year not found');
        res.send(results[0]);
    });
};

// Create new school year
const createAnneeScolaire = (req, res) => {
    const { ID_AnneeScolaire, AnneeScolaire,DateDebut,DateFin } = req.body;
    const sql = 'INSERT INTO anneescolaire (ID_AnneeScolaire, AnneeScolaire,DateDebut,DateFin created_at, updated_at) VALUES (?,?,?, ?, NOW(), NOW())';
    connection.query(sql, [ID_AnneeScolaire, AnneeScolaire,DateDebut,DateFin], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('School year created successfully!');
    });
};

// Update school year by ID
const updateAnneeScolaireById = (req, res) => {
    const { id } = req.params;
    const { AnneeScolaire,DateDebut,DateFin } = req.body;
    const sql = 'UPDATE anneescolaire SET AnneeScolaire = ?,,DateDebut= ?,DateFin= ? updated_at = NOW() WHERE ID_AnneeScolaire = ?';
    connection.query(sql, [AnneeScolaire,,DateDebut,DateFin, id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('School year not found');
        res.send('School year updated successfully!');
    });
};

// Delete school year by ID
const deleteAnneeScolaireById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM anneescolaire WHERE ID_AnneeScolaire = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('School year not found');
        res.send('School year deleted successfully!');
    });
};

module.exports = {
    getAllAnneeScolaire,
    getAnneeScolaireById,
    createAnneeScolaire,
    updateAnneeScolaireById,
    deleteAnneeScolaireById
};
