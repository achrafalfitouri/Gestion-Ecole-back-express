const connection = require('../config/db');

// Get all absence
const getAllAbsence = (req, res) => {
    const sql = 'SELECT * FROM absence ORDER BY created_at DESC';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get absence by ID
const getAbsence = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM absence WHERE ID_Absence = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('Absence record not found');
        res.send(results[0]);
    });
};

// Create new absence
const createAbsence = (req, res) => {
    const { ID_Absence, ID_Etudiant, ID_Inscription, DateDebutAbsence, DateFinAbsence ,created_at,updated_at} = req.body;
    const sql = 'INSERT INTO absence (ID_Absence, ID_Etudiant, ID_Inscription, DateDebutAbsence, DateFinAbsence,created_at,updated_at) VALUES (?,?,?, ?, ?, ?, ?)';
    connection.query(sql, [ID_Absence, ID_Etudiant, ID_Inscription, DateDebutAbsence, DateFinAbsence,created_at,updated_at], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('Absence record created successfully!');
    });
};

// Update absence by ID
const updateAbsenceById = (req, res) => {
    const { id } = req.params;
    const { ID_Absence, ID_Etudiant, ID_Inscription, DateDebutAbsence, DateFinAbsence,created_at,updated_at } = req.body;
    const sql = 'UPDATE absence SET ID_Absence = ?, ID_Etudiant = ?, ID_Inscription = ?, DateDebutAbsence = ?, DateFinAbsence = ?, created_at=?,updated_at=NOW() WHERE ID_Absence = ?';
    connection.query(sql, [ID_Absence, ID_Etudiant, ID_Inscription, DateDebutAbsence, DateFinAbsence,created_at,updated_at, id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Absence record not found');
        res.send('Absence record updated successfully!');
    });
};

// Delete absence by ID
const deleteAbsenceById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM absence WHERE ID_Absence = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Absence record not found');
        res.send('Absence record deleted successfully!');
    });
};

module.exports = {
    getAllAbsence,
    getAbsence,
    createAbsence,
    updateAbsenceById,
    deleteAbsenceById
};
