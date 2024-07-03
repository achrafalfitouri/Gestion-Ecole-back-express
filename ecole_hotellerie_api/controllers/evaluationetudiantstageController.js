const connection = require('../config/db');

// Get all evaluations stage
const getAllevaluationsstage = (req, res) => {
    const sql = 'SELECT * FROM evaluationsstage ORDER BY created_at DESC';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get evaluation stage by ID
const getevaluationsstageById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM evaluationsstage WHERE ID_Evaluation = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('Evaluation stage not found');
        res.send(results[0]);
    });
};

// Create new evaluation stage
const createevaluationsstage = (req, res) => {
    const { ID_Stage, Commentaires, Note } = req.body;
    const sql = 'INSERT INTO evaluationsstage (ID_Stage, Commentaires, Note, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())';
    connection.query(sql, [ID_Stage, Commentaires, Note], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('Evaluation stage created successfully!');
    });
};

// Update evaluation stage by ID
const updateevaluationsstageById = (req, res) => {
    const { id } = req.params;
    const { ID_Stage, Commentaires, Note } = req.body;
    const sql = 'UPDATE evaluationsstage SET ID_Stage = ?, Commentaires = ?, Note = ?, updated_at = NOW() WHERE ID_Evaluation = ?';
    connection.query(sql, [ID_Stage, Commentaires, Note, id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Evaluation stage not found');
        res.send('Evaluation stage updated successfully!');
    });
};

// Delete evaluation stage by ID
const deleteevaluationsstageById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM evaluationsstage WHERE ID_Evaluation = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Evaluation stage not found');
        res.send('Evaluation stage deleted successfully!');
    });
};

module.exports = { getAllevaluationsstage, getevaluationsstageById, createevaluationsstage, updateevaluationsstageById, deleteevaluationsstageById };
