const connection = require('../config/db');

// Get all niveaux
const getAllNiveaux = (req, res) => {
    const sql = 'SELECT * FROM niveau ORDER BY created_at DESC';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get niveau by ID
const getNiveauById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM niveau WHERE ID_Niveau = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('Niveau not found');
        res.send(results[0]);
    });
};

// Create new niveau
const createNiveau = (req, res) => {
    const { ID_Classe, Niveau } = req.body;
    const sql = 'INSERT INTO niveau (ID_Classe, Niveau, created_at, updated_at) VALUES (?, ?, NOW(), NOW())';
    connection.query(sql, [ID_Classe, Niveau], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('Niveau created successfully!');
    });
};

// Update niveau by ID
const updateNiveauById = (req, res) => {
    const { id } = req.params;
    const { ID_Classe, Niveau } = req.body;
    const sql = 'UPDATE niveau SET ID_Classe = ?, Niveau = ?, updated_at = NOW() WHERE ID_Niveau = ?';
    connection.query(sql, [ID_Classe, Niveau, id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Niveau not found');
        res.send('Niveau updated successfully!');
    });
};

// Delete niveau by ID
const deleteNiveauById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM niveau WHERE ID_Niveau = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Niveau not found');
        res.send('Niveau deleted successfully!');
    });
};

module.exports = {
    getAllNiveaux,
    getNiveauById,
    createNiveau,
    updateNiveauById,
    deleteNiveauById
};
