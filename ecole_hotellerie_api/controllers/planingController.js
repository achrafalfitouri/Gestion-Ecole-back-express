const connection = require('../config/db');

// Get all plannings
const getAllPlannings = (req, res) => {
    const sql = 'SELECT * FROM planning ORDER BY created_at DESC';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get planning by ID
const getPlanningById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM planning WHERE ID_Planning = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('Planning not found');
        res.send(results[0]);
    });
};

// Create new planning
const createPlanning = (req, res) => {
    const { ID_Classe, ID_Matiere, Jour, HeureDebut, HeureFin } = req.body;
    const sql = 'INSERT INTO planning (ID_Classe, ID_Matiere, Jour, HeureDebut, HeureFin, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())';
    connection.query(sql, [ID_Classe, ID_Matiere, Jour, HeureDebut, HeureFin], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('Planning created successfully!');
    });
};

// Update planning by ID
const updatePlanningById = (req, res) => {
    const { id } = req.params;
    const { ID_Classe, ID_Matiere, Jour, HeureDebut, HeureFin } = req.body;
    const sql = 'UPDATE planning SET ID_Classe = ?, ID_Matiere = ?, Jour = ?, HeureDebut = ?, HeureFin = ?, updated_at = NOW() WHERE ID_Planning = ?';
    connection.query(sql, [ID_Classe, ID_Matiere, Jour, HeureDebut, HeureFin, id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Planning not found');
        res.send('Planning updated successfully!');
    });
};

// Delete planning by ID
const deletePlanningById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM planning WHERE ID_Planning = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Planning not found');
        res.send('Planning deleted successfully!');
    });
};

module.exports = {
    getAllPlannings,
    getPlanningById,
    createPlanning,
    updatePlanningById,
    deletePlanningById
};
