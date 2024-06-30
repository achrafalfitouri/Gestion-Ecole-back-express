const connection = require('../config/db');

// Get all students
const getAllfactures = (req, res) => {
    const sql = 'SELECT * FROM factures';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get student by ID
const getfacturesById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM factures WHERE ID_Facture = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('not found');
        res.send(results[0]);
    });
};

// Create new student
const createfactures = (req, res) => {
    const {ID_Facture,TypeFacture,DateFacture,Montant,ID_Fournisseur} = req.body;
    const sql = 'INSERT INTO factures (TypeFacture,DateFacture,Montant,ID_Fournisseur) VALUES ( ?, ?, ?, ?)';
    connection.query(sql, [ID_Facture,TypeFacture,DateFacture,Montant,ID_Fournisseur], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('created successfully!');
    });
};

// Update student by ID
const updatefacturesById = (req, res) => {
    const { id } = req.params;
    const { TypeFacture,DateFacture,Montant,ID_Fournisseur } = req.body;
    const sql = 'UPDATE factures SET TypeFacture = ?, DateFacture = ?, Montant = ?, ID_Fournisseur = ? where ID_Facture = ? ';
    connection.query(sql, [id,TypeFacture,DateFacture,Montant,ID_Fournisseur], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send(' not found');
        res.send('updated successfully!');
    });
};

// Delete student by ID
const deletefacturesById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM factures WHERE ID_Facture = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('not found');
        res.send('deleted successfully!');
    });
};

module.exports = { getAllfactures, getfacturesById, createfactures, updatefacturesById, deletefacturesById };
