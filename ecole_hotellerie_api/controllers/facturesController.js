const connection = require('../config/db');

// Get all factures
const getAllfactures = (req, res) => {
    const sql = `SELECT f.ID_Facture, f.TypeFacture, f.DateFacture,f.SousMontant, f.Montant, f.ID_Fournisseur,f.ID_Taxe,t.ID_Taxe,t.Nom,t.Valeur,fo.ID_Fournisseur, fo.NomFournisseur,fo.Adresse,fo.Tel,fo.Email, d.ID_DetailFacture,d.ID_Facture,d.Article , d.Description, d.Quantite, d.PrixUnitaire ,GROUP_CONCAT(d.Article ORDER BY d.ID_DetailFacture SEPARATOR '\n') AS Articles,GROUP_CONCAT(d.Quantite ORDER BY d.ID_DetailFacture SEPARATOR '\n') AS Quantites, GROUP_CONCAT(d.PrixUnitaire ORDER BY d.ID_DetailFacture SEPARATOR '\n') AS PrixUnitaires, GROUP_CONCAT(d.Description ORDER BY d.ID_DetailFacture SEPARATOR '\n') AS Descriptions FROM factures f 
    JOIN detailsfacture d ON d.ID_Facture = f.ID_Facture 
    JOIN fournisseurs fo ON fo.ID_Fournisseur = f.ID_Fournisseur
    JOIN taxes t on t.ID_Taxe = f.ID_Taxe
 GROUP BY f.ID_Facture, f.TypeFacture, f.DateFacture, f.Montant, f.ID_Fournisseur, fo.NomFournisseur ORDER BY GREATEST(f.created_at, f.updated_at) DESC;
`;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        
        res.send(results);
    });
};
const getAllfactures2 = (req, res) => {
    const sql = `SELECT f.ID_Facture, f.TypeFacture ,f.DateFacture,f.SousMontant, f.Montant ,p.ID_PaiementEtudiants , p.ID_Etudiant,p.Montant,p.Reste,p.MontantTotal  ,   f.ID_Etudiant,e.NomEtudiant,e.PrenomEtudiant,e.Email,e.Tel,e.Adresse,e.ID_Filiere,fi.NomFiliere FROM factures f 
    JOIN etudiants e on e.ID_Etudiant=f.ID_Etudiant 
    JOIN filiere fi on fi.ID_Filiere=e.ID_Etudiant 
    JOIN paiementetudiants p on p.ID_Etudiant=e.ID_Etudiant 
    ORDER BY GREATEST(f.created_at, f.updated_at) DESC;
`;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get facture by ID
const getfacturesById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM factures WHERE ID_Facture = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('Facture not found');
        res.send(results[0]);
    });
};

// Create new facture
const createfactures = (req, res) => {
    const { TypeFacture, DateFacture,SousMontant, Montant,ID_Taxe, ID_Fournisseur, ID_Etudiant } = req.body;
    const sql = 'INSERT INTO factures (TypeFacture, DateFacture,SousMontant, Montant,ID_Taxe, ID_Fournisseur, ID_Etudiant, created_at, updated_at) VALUES (?,?,?, ?, ?, ?, ?, NOW(), NOW())';
    connection.query(sql, [TypeFacture, DateFacture,SousMontant, Montant,ID_Taxe, ID_Fournisseur, ID_Etudiant], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        
        // Fetch the newly created facture's ID
        const newFactureId = result.insertId;
        res.send({ ID_Facture: newFactureId });
    });
};

// Update facture by ID
const updatefacturesById = (req, res) => {
    const { id } = req.params;
    const { TypeFacture, DateFacture,SousMontant, Montant,ID_Taxe, ID_Fournisseur, ID_Etudiant } = req.body;
    const sql = 'UPDATE factures SET TypeFacture = ?, DateFacture = ?,SousMontant= ?, Montant = ?,ID_Taxe=?, ID_Fournisseur = ?, ID_Etudiant = ?, updated_at = NOW() WHERE ID_Facture = ?';
    connection.query(sql, [TypeFacture, DateFacture,SousMontant, Montant,ID_Taxe, ID_Fournisseur, ID_Etudiant, id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Facture not found');
        res.send('Facture updated successfully!');
    });
};

// Delete facture by ID
const deletefacturesById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM factures WHERE ID_Facture = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Facture not found');
        res.send('Facture deleted successfully!');
    });
};

module.exports = { getAllfactures, getfacturesById, createfactures, updatefacturesById, deletefacturesById ,getAllfactures2};
