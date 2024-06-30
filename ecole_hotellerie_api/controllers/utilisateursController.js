const connection = require('../config/db');

// Get all utilisateurs
const getAllUtilisateurs = (req, res) => {
    const sql = 'SELECT * FROM utilisateurs';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get utilisateur by ID
const getUtilisateurById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM utilisateurs WHERE ID_Utilisateur = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('Utilisateur not found');
        res.send(results[0]);
    });
};

// Create new utilisateur
const createUtilisateur = (req, res) => {
    const { ID_Utilisateur, NomUtilisateur, PrenomUtilisateur, Email, MotDePasse, ID_Role } = req.body;
    const sql = 'INSERT INTO utilisateurs (ID_Utilisateur, NomUtilisateur, PrenomUtilisateur, Email, MotDePasse, ID_Role) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(sql, [ID_Utilisateur, NomUtilisateur, PrenomUtilisateur, Email, MotDePasse, ID_Role], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('Utilisateur created successfully!');
    });
};

// Update utilisateur by ID
const updateUtilisateurById = (req, res) => {
    const { id } = req.params;
    const { NomUtilisateur, PrenomUtilisateur, Email, MotDePasse, ID_Role } = req.body;
    const sql = 'UPDATE utilisateurs SET NomUtilisateur = ?, PrenomUtilisateur = ?, Email = ?, MotDePasse = ?, ID_Role = ? WHERE ID_Utilisateur = ?';
    connection.query(sql, [NomUtilisateur, PrenomUtilisateur, Email, MotDePasse, ID_Role, id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Utilisateur not found');
        res.send('Utilisateur updated successfully!');
    });
};

// Delete utilisateur by ID
const deleteUtilisateurById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM utilisateurs WHERE ID_Utilisateur = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Utilisateur not found');
        res.send('Utilisateur deleted successfully!');
    });
};

module.exports = {
    getAllUtilisateurs,
    getUtilisateurById,
    createUtilisateur,
    updateUtilisateurById,
    deleteUtilisateurById
};
