const connection = require('../config/db');

// Get all formateurs
const getAllFormateurs = (req, res) => {
    const sql = 'SELECT * FROM formateurs';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get formateur by ID
const getFormateurById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM formateurs WHERE ID_Formateur = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('Formateur not found');
        res.send(results[0]);
    });
};

// Create new formateur
const createFormateur = (req, res) => {
    const { ID_Formateur, NomFormateur, PrenomFormateur, Titre, EtatFormateur, Adresse, Tel, ID_Filiere } = req.body;
    const sql = 'INSERT INTO formateurs (ID_Formateur, NomFormateur, PrenomFormateur, Titre, EtatFormateur, Adresse, Tel, ID_Filiere) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [ID_Formateur, NomFormateur, PrenomFormateur, Titre, EtatFormateur, Adresse, Tel, ID_Filiere], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('Formateur created successfully!');
    });
};

// Update formateur by ID
const updateFormateurById = (req, res) => {
    const { id } = req.params;
    const { ID_Formateur, NomFormateur, PrenomFormateur, Titre, EtatFormateur, Adresse, Tel, ID_Filiere } = req.body;
    const sql = 'UPDATE formateurs SET ID_Formateur = ?, NomFormateur = ?, PrenomFormateur = ?, Titre = ?, EtatFormateur = ?, Adresse = ?, Tel = ?, ID_Filiere = ? WHERE ID_Formateur = ?';
    connection.query(sql, [ID_Formateur, NomFormateur, PrenomFormateur, Titre, EtatFormateur, Adresse, Tel, ID_Filiere, id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Formateur not found');
        res.send('Formateur updated successfully!');
    });
};

// Delete formateur by ID
const deleteFormateurById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM formateurs WHERE ID_Formateur = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Formateur not found');
        res.send('Formateur deleted successfully!');
    });
};

module.exports = {
    getAllFormateurs,
    getFormateurById,
    createFormateur,
    updateFormateurById,
    deleteFormateurById
};
