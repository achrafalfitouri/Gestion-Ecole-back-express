const connection = require('../config/db');

// Get all students
const getAllevaluationsstage = (req, res) => {
    const sql = 'SELECT * FROM evaluationsstage';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get student by ID
const getevaluationsstageById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM evaluationsstage WHERE ID_Evaluation = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('Student not found');
        res.send(results[0]);
    });
};

// Create new student
const createevaluationsstage = (req, res) => {
    const { ID_Evaluation,ID_Stage,Commentaires,Note} = req.body;
    const sql = 'INSERT INTO evaluationsstage ( ID_Evaluation,ID_Stage,Commentaires,Note) VALUES (?, ?, ?, ?)';
    connection.query(sql, [ ID_Evaluation,ID_Stage,Commentaires,Note], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('Student created successfully!');
    });
};

// Update student by ID
const updateevaluationsstageById = (req, res) => {
    const { id } = req.params;
    const {  ID_Evaluation,ID_Stage,Commentaires,Note} = req.body;
    const sql = 'UPDATE evaluationsstage SET ID_Evaluation = ?, ID_Stage = ?, Commentaires = ?, Note = ? where ID_Evaluation = ? ';
    connection.query(sql, [ ID_Evaluation,ID_Stage,Commentaires,Note], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Student not found');
        res.send('Student updated successfully!');
    });
};

// Delete student by ID
const deleteevaluationsstageById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM evaluationsstage WHERE ID_Evaluation = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Student not found');
        res.send('Student deleted successfully!');
    });
};

module.exports = { getAllevaluationsstage, getevaluationsstageById, createevaluationsstage, updateevaluationsstageById, deleteevaluationsstageById };
