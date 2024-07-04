const connection = require('../config/db');
const path = require('path');
const multer = require('multer');

// Multer setup
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

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

// Create new student with photo upload
const createEtudiant = (req, res) => {
    const { NumEtudiant, PrenomEtudiant, NomEtudiant, Sexe, DateNaissance, LieuNaissance, Adresse, Tel, Nationalite, ID_Filiere } = req.body;
    const PhotoProfil = req.file.filename; // Assuming 'PhotoProfil' comes from form field name
    const sql = 'INSERT INTO Etudiants (NumEtudiant, PrenomEtudiant, NomEtudiant, Sexe, DateNaissance, LieuNaissance, Adresse, Tel, Nationalite, ID_Filiere, PhotoProfil, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';
    connection.query(sql, [NumEtudiant, PrenomEtudiant, NomEtudiant, Sexe, DateNaissance, LieuNaissance, Adresse, Tel, Nationalite, ID_Filiere, PhotoProfil], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('Student created successfully!');
    });
};

// Update student by ID with photo upload
const updateEtudiantById = (req, res) => {
    const { id } = req.params;
    const { NumEtudiant, PrenomEtudiant, NomEtudiant, Sexe, DateNaissance, LieuNaissance, Adresse, Tel, Nationalite, ID_Filiere } = req.body;
    const PhotoProfil = req.file.filename; // Assuming 'PhotoProfil' comes from form field name
    const sql = 'UPDATE Etudiants SET NumEtudiant = ?, PrenomEtudiant = ?, NomEtudiant = ?, Sexe = ?, DateNaissance = ?, LieuNaissance = ?, Adresse = ?, Tel = ?, Nationalite = ?, ID_Filiere = ?, PhotoProfil = ?, updated_at = NOW() WHERE ID_Etudiant = ?';
    connection.query(sql, [NumEtudiant, PrenomEtudiant, NomEtudiant, Sexe, DateNaissance, LieuNaissance, Adresse, Tel, Nationalite, ID_Filiere, PhotoProfil, id], (err, result) => {
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

module.exports = { getAllEtudiants, getEtudiantById, createEtudiant, updateEtudiantById, deleteEtudiantById, upload };
