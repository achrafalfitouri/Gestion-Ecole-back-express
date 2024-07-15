const connection = require('../config/db');

// Get Etudiants par Classe by id classe

const getEtudiantClasse = (req, res) => {
    const { id } = req.params;
    const sql = `
      SELECT e.NomEtudiant, e.PrenomEtudiant, c.ID_Classe,e.ID_Etudiant,e.ID_Classe
      FROM etudiants e
      JOIN classes c ON e.ID_Classe = c.ID_Classe
      WHERE e.ID_Classe = ?
      ORDER BY e.created_at DESC;
    `;
    
    connection.query(sql, [id], (err, results) => {
      if (err) {
        return res.status(500).send(err.toString());
      }
      if (results.length === 0) {
        return res.status(404).send('No students found for the given class');
      }
      res.send(results);
    });
  };
 
  // Get Matieres par Classe by id classe

const getMatiereClasse = (req, res) => {
    const { id } = req.params;
    const sql = `
      SELECT m.NomMatiere,  c.ID_Classe,m.ID_Matiere,m.ID_Classe
      FROM matieres m
      JOIN classes c ON m.ID_Classe = c.ID_Classe
      WHERE m.ID_Classe = ?
      ORDER BY m.created_at DESC;
    `;
    
    connection.query(sql, [id], (err, results) => {
      if (err) {
        return res.status(500).send(err.toString());
      }
      if (results.length === 0) {
        return res.status(404).send('No students found for the given class');
      }
      res.send(results);
    });
  };

    // Get Formateur par Matiere by id formateur

const getFormateurMatiere = (req, res) => {
    const { id } = req.params;
    const sql = `
SELECT m.NomMatiere,f.ID_Formateur, m.ID_Matiere,f.NomFormateur,f.PrenomFormateur
 FROM formateurs f JOIN matieres m ON m.ID_Formateur = f.ID_Formateur 
 WHERE f.ID_Formateur=?
  ORDER BY f.created_at DESC;
    `;
    
    connection.query(sql, [id], (err, results) => {
      if (err) {
        return res.status(500).send(err.toString());
      }
      if (results.length === 0) {
        return res.status(404).send('No students found for the given class');
      }
      res.send(results);
    });
  };
    // Get Inscription par Etudiant by id Etudiant

const getInscriptionEtudiant = (req, res) => {
    const { id } = req.params;
    const sql = `
SELECT e.NomEtudiant,e.PrenomEtudiant,e.ID_Etudiant, i.ID_Inscription , i.ID_Etudiant
 FROM inscription i  JOIN etudiants e ON e.ID_Etudiant = i.ID_Etudiant
 WHERE i.ID_Etudiant=?
  ORDER BY i.created_at DESC;
    `;
    
    connection.query(sql, [id], (err, results) => {
      if (err) {
        return res.status(500).send(err.toString());
      }
      if (results.length === 0) {
        return res.status(404).send('No students found for the given class');
      }
      res.send(results);
    });
  };
    // Get Inscription par Etudiant by id Etudiant

const getPaiementparEtudiant = (req, res) => {
    const { id } = req.params;
    const sql = `
SELECT e.NomEtudiant,e.PrenomEtudiant,e.ID_Etudiant, p.ID_PaiementEtudiants , p.ID_Etudiant,p.Montant,p.Reste,p.MontantTotal FROM paiementetudiants p 
JOIN etudiants e ON e.ID_Etudiant = p.ID_Etudiant 
WHERE p.ID_Etudiant=? 
ORDER BY p.created_at DESC;
    `;
    
    connection.query(sql, [id], (err, results) => {
      if (err) {
        return res.status(500).send(err.toString());
      }
      if (results.length === 0) {
        return res.status(404).send('No students found for the given class');
      }
      res.send(results);
    });
  };



module.exports = {
    getEtudiantClasse,
    getMatiereClasse,
    getFormateurMatiere,
    getPaiementparEtudiant,
    getInscriptionEtudiant
};
