const connection = require('../config/db');

// Get all students
const getAllPersonnels = (req, res) => {
    const sql = 'SELECT * FROM Personnel';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get student by ID
const getPersonnelById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Personnel WHERE ID_Personnel = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('Student not found');
        res.send(results[0]);
    });
};

// Create new student
const createPersonnel = (req, res) => {
    const { EtatPersonnel, NomPersonnel, PrenomPersonnel, Titre, DateEmbauche, DateNaissance} = req.body;
    const sql = 'INSERT INTO Personnel (EtatPersonnel, NomPersonnel, PrenomPersonnel, Titre, DateEmbauche, DateNaissance) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(sql, [EtatPersonnel, NomPersonnel, PrenomPersonnel, Titre, DateEmbauche, DateNaissance], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('Student created successfully!');
    });
};

// Update student by ID
const updatePersonnelsById = (req, res) => {
    const { id } = req.params;
    const {EtatPersonnel, NomPersonnel, PrenomPersonnel, Titre, DateEmbauche, DateNaissance } = req.body;
    const sql = 'UPDATE Personnel SET EtatPersonnel = ?, NomPersonnel = ?, PrenomPersonnel = ?, Titre = ?, DateEmbauche = ?, DateNaissance = ? WHERE ID_Personnel = ?';
    connection.query(sql, [EtatPersonnel, NomPersonnel, PrenomPersonnel, Titre, DateEmbauche, DateNaissance, id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Student not found');
        res.send('Student updated successfully!');
    });
};

// Delete student by ID
const deletePersonnelById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Personnel WHERE ID_Personnel = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Student not found');
        res.send('Student deleted successfully!');
    });
};

module.exports = { getAllPersonnels, getPersonnelById, createPersonnel, updatePersonnelsById, deletePersonnelById };
