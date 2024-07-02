const bcrypt = require('bcrypt');
const connection = require('../config/db');

// Get all utilisateurs
const getAllUtilisateurs = (req, res) => {
    const sql = `
        SELECT u.ID_Utilisateur, u.NomUtilisateur, u.PrenomUtilisateur, u.Email, u.ID_Role, r.NomRole 
        FROM utilisateurs u 
        JOIN roles r ON u.ID_Role = r.ID_Role
        ORDER BY u.created_at DESC
    `;
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching utilisateurs:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.send(results);
    });
};


// Get utilisateur by ID
const getUtilisateurById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM utilisateurs WHERE ID_Utilisateur = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error(`Error fetching utilisateur with ID ${id}:`, err);
            return res.status(500).send('Internal Server Error');
        }
        if (results.length === 0) {
            return res.status(404).send('Utilisateur not found');
        }
        res.send(results[0]);
    });
};

// Create new utilisateur
const createUtilisateur = async (req, res) => {
    const { NomUtilisateur, PrenomUtilisateur, Email, MotDePasse, ID_Role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(MotDePasse, 10);
        const sql = 'INSERT INTO utilisateurs (NomUtilisateur, PrenomUtilisateur, Email, MotDePasse, ID_Role) VALUES (?, ?, ?, ?, ?)';
        connection.query(sql, [NomUtilisateur, PrenomUtilisateur, Email, hashedPassword, ID_Role], (err, result) => {
            if (err) {
                console.error('Error creating utilisateur:', err);
                return res.status(500).send('Internal Server Error');
            }
            res.send('Utilisateur created successfully!');
        });
    } catch (err) {
        console.error('Error hashing password:', err);
        res.status(500).send('Internal Server Error');
    }
};

// Update utilisateur by ID
const updateUtilisateurById = async (req, res) => {
    const { id } = req.params;
    const { NomUtilisateur, PrenomUtilisateur, Email, MotDePasse, ID_Role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(MotDePasse, 10);
        const sql = 'UPDATE utilisateurs SET NomUtilisateur = ?, PrenomUtilisateur = ?, Email = ?, MotDePasse = ?, ID_Role = ? WHERE ID_Utilisateur = ?';
        connection.query(sql, [NomUtilisateur, PrenomUtilisateur, Email, hashedPassword, ID_Role, id], (err, result) => {
            if (err) {
                console.error(`Error updating utilisateur with ID ${id}:`, err);
                return res.status(500).send('Internal Server Error');
            }
            if (result.affectedRows === 0) {
                return res.status(404).send('Utilisateur not found');
            }
            res.send('Utilisateur updated successfully!');
        });
    } catch (err) {
        console.error('Error hashing password:', err);
        res.status(500).send('Internal Server Error');
    }
};

// Delete utilisateur by ID
const deleteUtilisateurById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM utilisateurs WHERE ID_Utilisateur = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error(`Error deleting utilisateur with ID ${id}:`, err);
            return res.status(500).send('Internal Server Error');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Utilisateur not found');
        }
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
