const connection = require('../config/db');

// Get all rendezvous
const getAllRendezvous = (req, res) => {
    const sql = 'SELECT * FROM rendezvous';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get rendezvous by ID
const getRendezvousById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM rendezvous WHERE ID_RendezVous = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('Rendezvous not found');
        res.send(results[0]);
    });
};

// Create new rendezvous
const createRendezvous = (req, res) => {
    const { ID_Utilisateur, Date, HeureDebut, HeureFin, Sujet, Description } = req.body;
    const sql = 'INSERT INTO rendezvous (ID_Utilisateur, Date, HeureDebut, HeureFin, Sujet, Description, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())';
    connection.query(sql, [ID_Utilisateur, Date, HeureDebut, HeureFin, Sujet, Description], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('Rendezvous created successfully!');
    });
};

// Update rendezvous by ID
const updateRendezvousById = (req, res) => {
    const { id } = req.params;
    const { ID_Utilisateur, Date, HeureDebut, HeureFin, Sujet, Description } = req.body;
    const sql = 'UPDATE rendezvous SET ID_Utilisateur = ?, Date = ?, HeureDebut = ?, HeureFin = ?, Sujet = ?, Description = ?, updated_at = NOW() WHERE ID_RendezVous = ?';
    connection.query(sql, [ID_Utilisateur, Date, HeureDebut, HeureFin, Sujet, Description, id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Rendezvous not found');
        res.send('Rendezvous updated successfully!');
    });
};

// Delete rendezvous by ID
const deleteRendezvousById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM rendezvous WHERE ID_RendezVous = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Rendezvous not found');
        res.send('Rendezvous deleted successfully!');
    });
};

module.exports = {
    getAllRendezvous,
    getRendezvousById,
    createRendezvous,
    updateRendezvousById,
    deleteRendezvousById
};
