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

module.exports = {
    getEtudiantClasse,
   
};
