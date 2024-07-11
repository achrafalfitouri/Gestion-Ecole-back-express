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
  //info de pay de personnel
  
  const getinfopaypeso = (req, res) => {
    const sql = `
     SELECT 
    p.NomPersonnel,
    p.PrenomPersonnel,
    p.CIN,
    p.Email,
    p.Salaire,
    p.EtatPersonnel,
    t.TypePaiement,
    pp.DatePaiementPersonnel,
    pp.Montant,
    pp.created_at as tempsvirment,
    (p.Salaire - SUM(pp.Montant) OVER (PARTITION BY pp.ID_Personnel)) AS resteSalaire
FROM 
    paiementpersonnel pp
JOIN 
    Personnel p ON p.ID_Personnel = pp.ID_Personnel 
JOIN  
    typepaiement t ON t.ID_TypePaiement = pp.ID_TypePaiement;

    `;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
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
//info de pay de etudiant
  
const getinfopay = (req, res) => {
  const sql = `
  select e.NomEtudiant ,e.PrenomEtudiant,e.Email,e.Sexe,e.CIN,f.NomFiliere , i.DateDebutInscription,i.FraisInscription,t.TypePaiement,p.DatePaiementEtudiants,p.Montant 
  from paiementetudiants p 
  join etudiants e on e.ID_Etudiant = p.ID_Etudiant 
  join filiere f on f.ID_Filiere = e.ID_Filiere 
  join inscription i on e.ID_Etudiant = i.ID_Etudiant
   join typepaiement t on t.ID_TypePaiement = p.ID_TypePaiement;
      `;
  connection.query(sql, (err, results) => {
      if (err) return res.status(500).send(err.toString());
      res.send(results);
  });
};


module.exports = {
    getEtudiantClasse,
    getMatiereClasse,
    getFormateurMatiere,
    getinfopay,
    getinfopaypeso
};
