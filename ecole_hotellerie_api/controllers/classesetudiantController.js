const connection = require('../config/db');

// Get all students
const getAllclassesetudiants = (req, res) => {
    const sql = 'SELECT * FROM classesetudiants';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get student by ID
const getclassesetudiantsById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM classesetudiants WHERE ID_Classe = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('Student not found');
        res.send(results[0]);
    });
};

// Create new student
const createclassesetudiants = (req, res) => {
    const { ID_Classe,ID_Etudiant } = req.body;
    const sql = 'INSERT INTO classesetudiants (ID_Classe,ID_Etudiant) VALUES (?, ?)';
    connection.query(sql, [ID_Classe,ID_Etudiant], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('Student created successfully!');
    });
};

// Update student by ID
const updateclassesetudiantsById = (req, res) => {
    const { id } = req.params;
    const { ID_Classe,ID_Etudiant } = req.body;
    const sql = 'UPDATE classesetudiants SET ID_Classe = ?, ID_Etudiant = ?  where ID_Classe = ?';
    connection.query(sql, [ID_Classe,ID_Etudiant], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Student not found');
        res.send('Student updated successfully!');
    });
};

// Delete student by ID
const deleteclassesetudiantsById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM classesetudiants WHERE ID_Classe = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Student not found');
        res.send('Student deleted successfully!');
    });
};

module.exports = { getAllclassesetudiants, getclassesetudiantsById, createclassesetudiants, updateclassesetudiantsById, deleteclassesetudiantsById };
