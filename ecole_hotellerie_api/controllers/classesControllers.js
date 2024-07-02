const connection = require('../config/db');

// Get all classes
const getAllclasses = (req, res) => {
    const sql = 'SELECT * FROM classes';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get class by ID
const getclassesById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM classes WHERE ID_Classe = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('Class not found');
        res.send(results[0]);
    });
};

// Create new class
const createclasses = (req, res) => {
    const { NomClasse, ID_Filiere, AnneeScolaire, Remarques } = req.body;
    const sql = 'INSERT INTO classes (NomClasse, ID_Filiere, AnneeScolaire, Remarques, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())';
    connection.query(sql, [NomClasse, ID_Filiere, AnneeScolaire, Remarques], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('Class created successfully!');
    });
};

// Update class by ID
const updateclassesById = (req, res) => {
    const { id } = req.params;
    const { NomClasse, ID_Filiere, AnneeScolaire, Remarques } = req.body;
    const sql = 'UPDATE classes SET NomClasse = ?, ID_Filiere = ?, AnneeScolaire = ?, Remarques = ?, updated_at = NOW() WHERE ID_Classe = ?';
    connection.query(sql, [NomClasse, ID_Filiere, AnneeScolaire, Remarques, id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Class not found');
        res.send('Class updated successfully!');
    });
};

// Delete class by ID
const deleteclassesById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM classes WHERE ID_Classe = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Class not found');
        res.send('Class deleted successfully!');
    });
};

module.exports = {
    getAllclasses,
    getclassesById,
    createclasses,
    updateclassesById,
    deleteclassesById
};
