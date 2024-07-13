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

const getAllEtudiants = (req, res) => {
    const sql = `
        SELECT 
            e.ID_Etudiant, 
            e.NumEtudiant, 
            e.PrenomEtudiant, 
            e.NomEtudiant, 
            e.CIN,
            e.Email,
            e.Sexe, 
            e.DateNaissance, 
            e.LieuNaissance, 
            e.Adresse, 
            e.Tel, 
            e.Nationalite, 
            e.ID_Filiere, 
            e.PhotoProfil, 
            f.NomFiliere 
        FROM Etudiants e 
        JOIN Filiere f ON f.ID_Filiere = e.ID_Filiere  
ORDER BY GREATEST(e.created_at, e.updated_at) DESC;    `;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('An error occurred while retrieving the data.');
        }
        res.status(200).json(results);
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
    const { NumEtudiant, PrenomEtudiant, NomEtudiant,CIN,Email, Sexe, DateNaissance, LieuNaissance, Adresse, Tel, Nationalite, ID_Filiere } = req.body;
    const PhotoProfil = req.file ? req.file.filename : null;

    if (PhotoProfil) {    
            
    let sql = 'INSERT INTO Etudiants (NumEtudiant, PrenomEtudiant, NomEtudiant,CIN,Email, Sexe, DateNaissance, LieuNaissance, Adresse, Tel, Nationalite, ID_Filiere, PhotoProfil, created_at, updated_at) VALUES (?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';  
        connection.query(sql, [NumEtudiant, PrenomEtudiant, NomEtudiant,CIN,Email, Sexe, DateNaissance, LieuNaissance, Adresse, Tel, Nationalite, ID_Filiere, PhotoProfil], (err, result) => {
            if (err) return res.status(500).send(err.toString());
            res.send('Student created successfully!');
        });
      }
    else {    let sql = 'INSERT INTO Etudiants (NumEtudiant, PrenomEtudiant, NomEtudiant,CIN,Email, Sexe, DateNaissance, LieuNaissance, Adresse, Tel, Nationalite, ID_Filiere, created_at, updated_at) VALUES ( ?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';
   
        connection.query(sql, [NumEtudiant, PrenomEtudiant, NomEtudiant,CIN,Email, Sexe, DateNaissance, LieuNaissance, Adresse, Tel, Nationalite, ID_Filiere], (err, result) => {
            if (err) return res.status(500).send(err.toString());
            res.send('Student created successfully!');
        });
   
   
   
    }

};

// Update student by ID with photo upload
const updateEtudiantById = (req, res) => {
    const { id } = req.params;
    const { NumEtudiant, PrenomEtudiant, NomEtudiant,CIN,Email, Sexe, DateNaissance, LieuNaissance, Adresse, Tel, Nationalite, ID_Filiere } = req.body;
    const PhotoProfil = req.file ? req.file.filename : null;

    let sql;
    let params;

    if (PhotoProfil) {
        sql = 'UPDATE Etudiants SET NumEtudiant = ?, PrenomEtudiant = ?, NomEtudiant = ?,CIN= ?,Email= ?, Sexe = ?, DateNaissance = ?, LieuNaissance = ?, Adresse = ?, Tel = ?, Nationalite = ?, ID_Filiere = ?, PhotoProfil = ?, updated_at = NOW() WHERE ID_Etudiant = ?';
        params = [NumEtudiant, PrenomEtudiant, NomEtudiant,CIN,Email, Sexe, DateNaissance, LieuNaissance, Adresse, Tel, Nationalite, ID_Filiere, PhotoProfil, id];
        connection.query(sql, params, (err, result) => {
            if (err) return res.status(500).send(err.toString());
            if (result.affectedRows === 0) return res.status(404).send('Student not found');
            res.send('Student updated successfully!');
        });
    } else {
        sql = 'UPDATE Etudiants SET NumEtudiant = ?, PrenomEtudiant = ?, NomEtudiant = ?,CIN= ?,Email= ?, Sexe = ?, DateNaissance = ?, LieuNaissance = ?, Adresse = ?, Tel = ?, Nationalite = ?, ID_Filiere = ?, updated_at = NOW() WHERE ID_Etudiant = ?';
        params = [NumEtudiant, PrenomEtudiant, NomEtudiant,CIN,Email, Sexe, DateNaissance, LieuNaissance, Adresse, Tel, Nationalite, ID_Filiere, id];
        connection.query(sql, params, (err, result) => {
            if (err) return res.status(500).send(err.toString());
            if (result.affectedRows === 0) return res.status(404).send('Student not found');
            res.send('Student updated successfully!');
        });
    }

  
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
