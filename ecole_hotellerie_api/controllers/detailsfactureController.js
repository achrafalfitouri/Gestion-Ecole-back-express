const connection = require('../config/db');

// Get all students
const getAlldetailsfacture = (req, res) => {
    const sql = 'SELECT * FROM detailsfacture';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get student by ID
const getdetailsfactureById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM detailsfacture WHERE ID_DetailFacture = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('Student not found');
        res.send(results[0]);
    });
};

// Create new student
const createdetailsfacture = (req, res) => {
    const { ID_DetailFacture,ID_Facture,Description,Quantite,PrixUnitaire } = req.body;
    const sql = 'INSERT INTO detailsfacture ( ID_DetailFacture,ID_Facture,Description,Quantite,PrixUnitaire) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [ ID_DetailFacture,ID_Facture,Description,Quantite,PrixUnitaire], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('Student created successfully!');
    });
};

// Update student by ID
const updatedetailsfactureById = (req, res) => {
    const { id } = req.params;
    const { ID_DetailFacture,ID_Facture,Description,Quantite,PrixUnitaire} = req.body;
    const sql = 'UPDATE detailsfacture SET ID_DetailFacture = ?, ID_Facture = ?, Description = ?, Quantite = ?, PrixUnitaire = ? where ID_DetailFacture = ? ';
    connection.query(sql, [ ID_DetailFacture,ID_Facture,Description,Quantite,PrixUnitaire], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Student not found');
        res.send('Student updated successfully!');
    });
};

// Delete student by ID
const deletedetailsfactureById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM detailsfacture WHERE ID_DetailFacture = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Student not found');
        res.send('Student deleted successfully!');
    });
};

module.exports = { getAlldetailsfacture, getdetailsfactureById, createdetailsfacture, updatedetailsfactureById, deletedetailsfactureById };
