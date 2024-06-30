const connection = require('../config/db');

// Get all students
const getAllAnneeScolaire	 = (req, res) => {
    const sql = 'SELECT * FROM anneescolaire';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get student by ID
const getAnneeScolaireById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM anneescolaire WHERE ID_AnneeScolaire = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('not found');
        res.send(results[0]);
    });
};

// Create new student
const createAnneeScolaire = (req, res) => {
    const { ID_AnneeScolaire,AnneeScolaire } = req.body;
    const sql = 'INSERT INTO anneescolaire (AnneeScolaire) VALUES ( ?)';
    connection.query(sql, [ID_AnneeScolaire,AnneeScolaire], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('created successfully!');
    });
};

// Update student by ID
const updateAnneeScolaireById = (req, res) => {
    const { id } = req.params;
    const { AnneeScolaire} = req.body;
    const sql = 'UPDATE anneescolaire SET AnneeScolaire = ? WHERE ID_AnneeScolaire = ?';
    connection.query(sql, [AnneeScolaire,id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send(' not found');
        res.send('updated successfully!');
    });
};

// Delete student by ID
const deleteAnneeScolaireById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM AnneeScolaire WHERE ID_AnneeScolaire = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('not found');
        res.send('deleted successfully!');
    });
};

module.exports = { getAllAnneeScolaire, getAnneeScolaireById, createAnneeScolaire, updateAnneeScolaireById, deleteAnneeScolaireById };
