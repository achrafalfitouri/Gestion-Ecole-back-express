const connection = require('../config/db');

// Get all inscriptions
const getAllInscriptions = (req, res) => {
    const sql = 'SELECT * FROM inscriptions';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get inscription by ID
const getInscriptionById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM inscriptions WHERE ID_Inscription = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('Inscription not found');
        res.send(results[0]);
    });
};

// Create new inscription
const createInscription = (req, res) => {
    const { ID_Etudiant, DateDebutInscription, DateFinInscription, FraisInscription, MontantInscription } = req.body;
    const sql = 'INSERT INTO inscriptions (ID_Etudiant, DateDebutInscription, DateFinInscription, FraisInscription, MontantInscription, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())';
    connection.query(sql, [ID_Etudiant, DateDebutInscription, DateFinInscription, FraisInscription, MontantInscription], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('Inscription created successfully!');
    });
};

// Update inscription by ID
const updateInscriptionById = (req, res) => {
    const { id } = req.params;
    const { ID_Etudiant, DateDebutInscription, DateFinInscription, FraisInscription, MontantInscription } = req.body;
    const sql = 'UPDATE inscriptions SET ID_Etudiant = ?, DateDebutInscription = ?, DateFinInscription = ?, FraisInscription = ?, MontantInscription = ?, updated_at = NOW() WHERE ID_Inscription = ?';
    connection.query(sql, [ID_Etudiant, DateDebutInscription, DateFinInscription, FraisInscription, MontantInscription, id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Inscription not found');
        res.send('Inscription updated successfully!');
    });
};

// Delete inscription by ID
const deleteInscriptionById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM inscriptions WHERE ID_Inscription = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Inscription not found');
        res.send('Inscription deleted successfully!');
    });
};

module.exports = {
    getAllInscriptions,
    getInscriptionById,
    createInscription,
    updateInscriptionById,
    deleteInscriptionById
};
