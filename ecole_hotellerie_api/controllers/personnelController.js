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

// Get all personnel
const getAllPersonnel = (req, res) => {
    const sql = 'SELECT * FROM personnel ORDER BY GREATEST(created_at, updated_at) DESC';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('An error occurred while retrieving the data.');
        }
        res.status(200).json(results);
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

// Create new personnel with photo upload
const createPersonnel = (req, res) => {
    const { EtatPersonnel, NomPersonnel, PrenomPersonnel, CIN, Email, Titre, Salaire, Contrat, DateEmbauche, DateNaissance } = req.body;
    const PhotoProfil = req.file ? req.file.filename : null;

    let sql;
    let params;

    if (PhotoProfil) {
        sql = 'INSERT INTO personnel (EtatPersonnel, NomPersonnel, PrenomPersonnel, CIN, Email, Titre, Salaire, Contrat, DateEmbauche, DateNaissance, PhotoProfil, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';
        params = [EtatPersonnel, NomPersonnel, PrenomPersonnel, CIN, Email, Titre, Salaire, Contrat, DateEmbauche, DateNaissance, PhotoProfil];
    } else {
        sql = 'INSERT INTO personnel (EtatPersonnel, NomPersonnel, PrenomPersonnel, CIN, Email, Titre, Salaire, Contrat, DateEmbauche, DateNaissance, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';
        params = [EtatPersonnel, NomPersonnel, PrenomPersonnel, CIN, Email, Titre, Salaire, Contrat, DateEmbauche, DateNaissance];
    }

    connection.query(sql, params, (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('Personnel created successfully!');
    });
};

// Update personnel by ID with photo upload
const updatePersonnelById = (req, res) => {
    const { id } = req.params;
    const { EtatPersonnel, NomPersonnel, PrenomPersonnel, CIN, Email, Titre, Salaire, Contrat, DateEmbauche, DateNaissance } = req.body;
    const PhotoProfil = req.file ? req.file.filename : null;

    let sql;
    let params;

    if (PhotoProfil) {
        sql = 'UPDATE personnel SET EtatPersonnel = ?, NomPersonnel = ?, PrenomPersonnel = ?, CIN = ?, Email = ?, Titre = ?, Salaire = ?, Contrat = ?, DateEmbauche = ?, DateNaissance = ?, PhotoProfil = ?, updated_at = NOW() WHERE ID_Personnel = ?';
        params = [EtatPersonnel, NomPersonnel, PrenomPersonnel, CIN, Email, Titre, Salaire, Contrat, DateEmbauche, DateNaissance, PhotoProfil, id];
    } else {
        sql = 'UPDATE personnel SET EtatPersonnel = ?, NomPersonnel = ?, PrenomPersonnel = ?, CIN = ?, Email = ?, Titre = ?, Salaire = ?, Contrat = ?, DateEmbauche = ?, DateNaissance = ?, updated_at = NOW() WHERE ID_Personnel = ?';
        params = [EtatPersonnel, NomPersonnel, PrenomPersonnel, CIN, Email, Titre, Salaire, Contrat, DateEmbauche, DateNaissance, id];
    }

    connection.query(sql, params, (err, result) => {
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
    deletePersonnelById,
    upload
};
