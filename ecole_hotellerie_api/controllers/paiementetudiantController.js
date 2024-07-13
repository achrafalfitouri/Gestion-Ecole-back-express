const connection = require('../config/db');

// Get all paiementetudiants
const getAllPaiementEtudiants = (req, res) => {
    const sql = `SELECT p.ID_PaiementEtudiants, p.ID_Inscription, p.ID_TypePaiement, p.ID_Etudiant, p.DatePaiementEtudiants, p.Montant, p.Reste, p.MontantTotal, e.NomEtudiant, e.PrenomEtudiant,e.Email,e.CIN, t.TypePaiement,e.ID_Etudiant 
    FROM paiementetudiants p JOIN etudiants e on p.ID_Etudiant=e.ID_Etudiant 
    JOIN typepaiement t on t.ID_TypePaiement = p.ID_TypePaiement
     ORDER by p.created_at DESC;`;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get paiementetudiants by ID
const getPaiementEtudiantsById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM paiementetudiants WHERE ID_PaiementEtudiants = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('PaiementEtudiants not found');
        res.send(results[0]);
    });
};

// Create new paiementetudiants
const createPaiementEtudiants = (req, res) => {
    const { ID_Inscription, ID_TypePaiement,ID_Etudiant, DatePaiementEtudiants, Montant } = req.body;
    const sql = 'INSERT INTO paiementetudiants (ID_Inscription, ID_TypePaiement,ID_Etudiant, DatePaiementEtudiants, Montant, created_at, updated_at) VALUES (?,?, ?, ?, ?, NOW(), NOW())';
    connection.query(sql, [ID_Inscription, ID_TypePaiement,ID_Etudiant, DatePaiementEtudiants, Montant], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('PaiementEtudiants created successfully!');
    });
};

// Update paiementetudiants by ID
const updatePaiementEtudiantsById = (req, res) => {
    const { id } = req.params;
    const { ID_Inscription, ID_TypePaiement,ID_Etudiant, DatePaiementEtudiants, Montant } = req.body;
    const sql = 'UPDATE paiementetudiants SET ID_Inscription = ?, ID_TypePaiement = ?,ID_Etudiant=?, DatePaiementEtudiants = ?, Montant = ?, updated_at = NOW() WHERE ID_PaiementEtudiants = ?';
    connection.query(sql, [ID_Inscription, ID_TypePaiement,ID_Etudiant, DatePaiementEtudiants, Montant, id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('PaiementEtudiants not found');
        res.send('PaiementEtudiants updated successfully!');
    });
};

// Delete paiementetudiants by ID
const deletePaiementEtudiantsById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM paiementetudiants WHERE ID_PaiementEtudiants = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('PaiementEtudiants not found');
        res.send('PaiementEtudiants deleted successfully!');
    });
};

module.exports = {
    getAllPaiementEtudiants,
    getPaiementEtudiantsById,
    createPaiementEtudiants,
    updatePaiementEtudiantsById,
    deletePaiementEtudiantsById
};
