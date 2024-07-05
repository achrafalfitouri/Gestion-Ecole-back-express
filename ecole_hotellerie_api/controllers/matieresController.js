const connection = require('../config/db');

// Get all matieres
const getAllMatieres = (req, res) => {
    const sql = `SELECT m.ID_Matiere, m.NomMatiere, m.ID_Classe, m.ID_Formateur, c.NomClasse, f.NomFormateur 
FROM matieres m
JOIN classes c ON m.ID_Classe = c.ID_Classe
JOIN formateurs f ON m.ID_Formateur = f.ID_Formateur
ORDER BY m.created_at DESC;
`;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get matiere by ID
const getMatiereById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM matieres WHERE ID_Matiere = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('Matiere not found');
        res.send(results[0]);
    });
};

// Create new matiere
const createMatiere = (req, res) => {
    const { NomMatiere, ID_Classe, ID_Formateur } = req.body;
    const sql = 'INSERT INTO matieres (NomMatiere, ID_Classe, ID_Formateur, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())';
    connection.query(sql, [NomMatiere, ID_Classe, ID_Formateur], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('Matiere created successfully!');
    });
};

// Update matiere by ID
const updateMatiereById = (req, res) => {
    const { id } = req.params;
    const { NomMatiere, ID_Classe, ID_Formateur } = req.body;
    const sql = 'UPDATE matieres SET NomMatiere = ?, ID_Classe = ?, ID_Formateur = ?, updated_at = NOW() WHERE ID_Matiere = ?';
    connection.query(sql, [NomMatiere, ID_Classe, ID_Formateur, id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Matiere not found');
        res.send('Matiere updated successfully!');
    });
};

// Delete matiere by ID
const deleteMatiereById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM matieres WHERE ID_Matiere = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Matiere not found');
        res.send('Matiere deleted successfully!');
    });
};

module.exports = {
    getAllMatieres,
    getMatiereById,
    createMatiere,
    updateMatiereById,
    deleteMatiereById
};
