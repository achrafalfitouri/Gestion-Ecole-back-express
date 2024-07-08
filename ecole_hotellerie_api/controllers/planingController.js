const connection = require('../config/db');

// Get all plannings
const getAllPlannings = (req, res) => {
    const sql = `SELECT p.ID_Planning, p.ID_Classe, p.ID_Matiere, p.ID_Salle,p.ID_Formateur, p.Jour, p.HeureDebut, p.HeureFin, p.Nb_Heure,c.NomClasse,m.NomMatiere,s.Nom,f.NomFormateur,f.PrenomFormateur  
    FROM planning p Join classes c on p.ID_Classe=c.ID_Classe
     Join matieres m on p.ID_Matiere=m.ID_Matiere 
     Join salle s on p.ID_Salle=s.ID_Salle 
     Join formateurs f on p.ID_Formateur=f.ID_Formateur
     ORDER BY p.created_at DESC;`;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get planning by ID
const getPlanningById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM planning WHERE ID_Planning = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('Planning not found');
        res.send(results[0]);
    });
};

// Create new planning
const createPlanning = (req, res) => {
    const { ID_Classe, ID_Matiere, ID_Salle,ID_Formateur, Jour, HeureDebut, HeureFin,Nb_Heure } = req.body;
    
    // Vérifiez que ID_Salle existe dans la table salle
    const checkSalleSql = 'SELECT ID_Salle FROM salle WHERE ID_Salle = ?';
    connection.query(checkSalleSql, [ID_Salle], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(400).send('ID_Salle invalide');
        
        // Si ID_Salle existe, créez le planning
        const sql = 'INSERT INTO planning (ID_Classe, ID_Matiere, ID_Salle,ID_Formateur, Jour, HeureDebut, HeureFin,Nb_Heure, created_at, updated_at) VALUES (?,?,?, ?, ?, ?, ?, ?, NOW(), NOW())';
        connection.query(sql, [ID_Classe, ID_Matiere, ID_Salle,ID_Formateur, Jour, HeureDebut, HeureFin,Nb_Heure ], (err, result) => {
            if (err) return res.status(500).send(err.toString());
            res.send('Planning created successfully!');
        });
    });
};


// Update planning by ID
const updatePlanningById = (req, res) => {
    const { id } = req.params;
    const { ID_Classe, ID_Matiere, ID_Salle,ID_Formateur, Jour, HeureDebut, HeureFin,Nb_Heure  } = req.body;

    // Vérifiez que ID_Salle existe dans la table salle
    const checkSalleSql = 'SELECT ID_Salle FROM salle WHERE ID_Salle = ?';
    connection.query(checkSalleSql, [ID_Salle], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(400).send('ID_Salle invalide');

        // Si ID_Salle existe, mettez à jour le planning
        const sql = 'UPDATE planning SET ID_Classe = ?, ID_Matiere = ?,ID_Salle = ?,ID_Formateur= ?,  Jour = ?, HeureDebut = ?, HeureFin = ?,Nb_Heure= ?,  updated_at = NOW() WHERE ID_Planning = ?';
        connection.query(sql, [ID_Classe, ID_Matiere, ID_Salle,ID_Formateur, Jour, HeureDebut, HeureFin,,Nb_Heure , id], (err, result) => {
            if (err) return res.status(500).send(err.toString());
            if (result.affectedRows === 0) return res.status(404).send('Planning not found');
            res.send('Planning updated successfully!');
        });
    });
};


// Delete planning by ID
const deletePlanningById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM planning WHERE ID_Planning = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Planning not found');
        res.send('Planning deleted successfully!');
    });
};

module.exports = {
    getAllPlannings,
    getPlanningById,
    createPlanning,
    updatePlanningById,
    deletePlanningById
};
