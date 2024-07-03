const connection = require('../config/db');

// Get all students
const getAllEtudiants = (req, res) => {
    const sql = 'SELECT * FROM Etudiants ORDER BY created_at DESC';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get student by ID
const getEtudiantById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Etudiants WHERE ID_Etudiant = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('Student not found');
        res.send(results[0]);
    });
};

// Create new student
const createEtudiant = (req, res) => {
    const { NumEtudiant, PrenomEtudiant, NomEtudiant, Sexe, DateNaissance, LieuNaissance, Adresse, Tel, Nationalite, ID_Filiere } = req.body;
    const sql = 'INSERT INTO Etudiants (NumEtudiant, PrenomEtudiant, NomEtudiant, Sexe, DateNaissance, LieuNaissance, Adresse, Tel, Nationalite, ID_Filiere, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';
    connection.query(sql, [NumEtudiant, PrenomEtudiant, NomEtudiant, Sexe, DateNaissance, LieuNaissance, Adresse, Tel, Nationalite, ID_Filiere], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('Student created successfully!');
    });
};

// Update student by ID
const updateEtudiantById = (req, res) => {
    const { id } = req.params;
    const { NumEtudiant, PrenomEtudiant, NomEtudiant, Sexe, DateNaissance, LieuNaissance, Adresse, Tel, Nationalite, ID_Filiere } = req.body;
    const sql = 'UPDATE Etudiants SET NumEtudiant = ?, PrenomEtudiant = ?, NomEtudiant = ?, Sexe = ?, DateNaissance = ?, LieuNaissance = ?, Adresse = ?, Tel = ?, Nationalite = ?, ID_Filiere = ?, updated_at = NOW() WHERE ID_Etudiant = ?';
    connection.query(sql, [NumEtudiant, PrenomEtudiant, NomEtudiant, Sexe, DateNaissance, LieuNaissance, Adresse, Tel, Nationalite, ID_Filiere, id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Student not found');
        res.send('Student updated successfully!');
    });
};

// Delete student by ID
const deleteEtudiantById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Etudiants WHERE ID_Etudiant = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Student not found');
        res.send('Student deleted successfully!');
    });
};

module.exports = { getAllEtudiants, getEtudiantById, createEtudiant, updateEtudiantById, deleteEtudiantById };
