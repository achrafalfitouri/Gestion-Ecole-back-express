const connection = require('../config/db');
const path = require('path');
const multer = require('multer');

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Get all formateurs
const getAllFormateurs = (req, res) => {
    const sql = `
        SELECT 
            f.ID_Formateur, 
            f.NomFormateur, 
            f.PrenomFormateur, 
            f.CIN,
            f.Email,
            f.Titre, 
            f.Diplome,
            f.EtatFormateur, 
            f.Adresse, 
            f.Tel, 
            f.ID_Filiere, 
            f.PhotoProfil, 
            fil.NomFiliere, 
            f.created_at, 
            f.updated_at 
        FROM formateurs f 
        JOIN filiere fil ON fil.ID_Filiere = f.ID_Filiere  
        ORDER BY f.created_at DESC
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('An error occurred while retrieving the data.');
        }
        res.status(200).json(results);
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

// Create new formateur with photo upload
const createFormateur = (req, res) => {
    const { NomFormateur, PrenomFormateur,CIN,Email, Titre,Diplome, EtatFormateur, Adresse, Tel, ID_Filiere } = req.body;
    const PhotoProfil = req.file ? req.file.filename : null;

    if (PhotoProfil) {
        let sql = 'INSERT INTO formateurs (NomFormateur, PrenomFormateur,CIN,Email, Titre,Diplome, EtatFormateur, Adresse, Tel, ID_Filiere, PhotoProfil, created_at, updated_at) VALUES (?,?,?,?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';
        connection.query(sql, [NomFormateur, PrenomFormateur, CIN,Email, Titre,Diplome, EtatFormateur, Adresse, Tel, ID_Filiere, PhotoProfil], (err, result) => {
            if (err) return res.status(500).send(err.toString());
            res.send('Formateur created successfully!');
        });
    } else {
        let sql = 'INSERT INTO formateurs (NomFormateur, PrenomFormateur, CIN,Email, Titre,Diplome, EtatFormateur, Adresse, Tel, ID_Filiere, created_at, updated_at) VALUES (?,?,?,?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';
        connection.query(sql, [NomFormateur, PrenomFormateur, CIN,Email, Titre,Diplome, EtatFormateur, Adresse, Tel, ID_Filiere], (err, result) => {
            if (err) return res.status(500).send(err.toString());
            res.send('Formateur created successfully!');
        });
    }
};

// Update formateur by ID with photo upload
const updateFormateurById = (req, res) => {
    const { id } = req.params;
    const { NomFormateur, PrenomFormateur, CIN,Email, Titre,Diplome, EtatFormateur, Adresse, Tel, ID_Filiere } = req.body;
    const PhotoProfil = req.file ? req.file.filename : null;

    let sql;
    let params;

    if (PhotoProfil) {
        sql = 'UPDATE formateurs SET NomFormateur = ?, PrenomFormateur = ?, CIN= ?,Email= ?, Titre= ?,Diplome= ?, EtatFormateur = ?, Adresse = ?, Tel = ?, ID_Filiere = ?, PhotoProfil = ?, updated_at = NOW() WHERE ID_Formateur = ?';
        params = [NomFormateur, PrenomFormateur, CIN,Email, Titre,Diplome, EtatFormateur, Adresse, Tel, ID_Filiere, PhotoProfil, id];
        connection.query(sql, params, (err, result) => {
            if (err) return res.status(500).send(err.toString());
            if (result.affectedRows === 0) return res.status(404).send('Formateur not found');
            res.send('Formateur updated successfully!');
        });
    } else {
        sql = 'UPDATE formateurs SET NomFormateur = ?, PrenomFormateur = ?,  CIN= ?,Email= ?, Titre= ?,Diplome= ?, EtatFormateur = ?, Adresse = ?, Tel = ?, ID_Filiere = ?, updated_at = NOW() WHERE ID_Formateur = ?';
        params = [NomFormateur, PrenomFormateur, CIN,Email, Titre,Diplome, EtatFormateur, Adresse, Tel, ID_Filiere, id];
        connection.query(sql, params, (err, result) => {
            if (err) return res.status(500).send(err.toString());
            if (result.affectedRows === 0) return res.status(404).send('Formateur not found');
            res.send('Formateur updated successfully!');
        });
    }
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

module.exports = { getAllFormateurs, getFormateurById, createFormateur, updateFormateurById, deleteFormateurById, upload };
