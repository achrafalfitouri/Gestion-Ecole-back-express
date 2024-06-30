const connection = require('../config/db');

// Get all stages
const getAllStages = (req, res) => {
    const sql = 'SELECT * FROM stages';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get stage by ID
const getStageById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM stages WHERE ID_Stage = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('Stage not found');
        res.send(results[0]);
    });
};

// Create new stage
const createStage = (req, res) => {
    const { ID_Stage, ID_Etudiant, Entreprise, DateDebut, DateFin, Tuteur } = req.body;
    const sql = 'INSERT INTO stages (ID_Stage, ID_Etudiant, Entreprise, DateDebut, DateFin, Tuteur) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(sql, [ID_Stage, ID_Etudiant, Entreprise, DateDebut, DateFin, Tuteur], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('Stage created successfully!');
    });
};

// Update stage by ID
const updateStageById = (req, res) => {
    const { id } = req.params;
    const { ID_Etudiant, Entreprise, DateDebut, DateFin, Tuteur } = req.body;
    const sql = 'UPDATE stages SET ID_Etudiant = ?, Entreprise = ?, DateDebut = ?, DateFin = ?, Tuteur = ? WHERE ID_Stage = ?';
    connection.query(sql, [ID_Etudiant, Entreprise, DateDebut, DateFin, Tuteur, id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Stage not found');
        res.send('Stage updated successfully!');
    });
};

// Delete stage by ID
const deleteStageById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM stages WHERE ID_Stage = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Stage not found');
        res.send('Stage deleted successfully!');
    });
};

module.exports = {
    getAllStages,
    getStageById,
    createStage,
    updateStageById,
    deleteStageById
};
