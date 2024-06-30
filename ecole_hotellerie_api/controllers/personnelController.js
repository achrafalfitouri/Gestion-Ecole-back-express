const connection = require('../config/db');

// Get all personnel
const getAllPersonnel = (req, res) => {
    const sql = 'SELECT * FROM personnel';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get personnel by ID
const getPersonnelById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM personnel WHERE ID_Personnel = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('Personnel not found');
        res.send(results[0]);
    });
};

// Create new personnel
const createPersonnel = (req, res) => {
    const {  EtatPersonnel, NomPersonnel, PrenomPersonnel, Titre, DateEmbauche, DateNaissance } = req.body;
    const sql = 'INSERT INTO personnel ( EtatPersonnel, NomPersonnel, PrenomPersonnel, Titre, DateEmbauche, DateNaissance) VALUES ( ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [EtatPersonnel, NomPersonnel, PrenomPersonnel, Titre, DateEmbauche, DateNaissance], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('Personnel created successfully!');
    });
};

// Update personnel by ID
const updatePersonnelById = (req, res) => {
    const { id } = req.params;
    const { EtatPersonnel, NomPersonnel, PrenomPersonnel, Titre, DateEmbauche, DateNaissance } = req.body;
    const sql = 'UPDATE personnel SET EtatPersonnel = ?, NomPersonnel = ?, PrenomPersonnel = ?, Titre = ?, DateEmbauche = ?, DateNaissance = ? WHERE ID_Personnel = ?';
    connection.query(sql, [EtatPersonnel, NomPersonnel, PrenomPersonnel, Titre, DateEmbauche, DateNaissance, id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Personnel not found');
        res.send('Personnel updated successfully!');
    });
};

// Delete personnel by ID
const deletePersonnelById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM personnel WHERE ID_Personnel = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Personnel not found');
        res.send('Personnel deleted successfully!');
    });
};

module.exports = {
    getAllPersonnel,
    getPersonnelById,
    createPersonnel,
    updatePersonnelById,
    deletePersonnelById
};
