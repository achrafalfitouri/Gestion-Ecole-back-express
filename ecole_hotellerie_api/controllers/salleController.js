const connection = require('../config/db');

// Get all plannings
const getAllSalles = (req, res) => {
    const sql = 'SELECT * FROM Salle ORDER BY GREATEST(created_at, updated_at) DESC';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get planning by ID
const getSalleById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Salle WHERE ID_Salle = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('Planning not found');
        res.send(results[0]);
    });
};

// Create new planning
const createSalle = (req, res) => {
    const { Nom, Capacite } = req.body;
    const sql = 'INSERT INTO Salle (Nom, Capacite, created_at, updated_at) VALUES (?, ?, NOW(), NOW())';
    connection.query(sql, [Nom, Capacite], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('Planning created successfully!');
    });
};

// Update planning by ID
const updateSalleById = (req, res) => {
    const { id } = req.params;
    const { Nom, Capacite } = req.body;
    const sql = 'UPDATE Salle SET Nom= ?, Capacite = ?, updated_at = NOW() WHERE ID_Salle = ?';
    connection.query(sql, [Nom, Capacite, id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Planning not found');
        res.send('Planning updated successfully!');
    });
};

// Delete planning by ID
const deleteSalleById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Salle WHERE ID_Salle = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Planning not found');
        res.send('Planning deleted successfully!');
    });
};

module.exports = {
    getAllSalles,
    getSalleById,
    createSalle,
    updateSalleById,
    deleteSalleById
};
