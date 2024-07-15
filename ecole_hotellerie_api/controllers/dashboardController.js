const connection = require('../config/db');

const getNbrendezvous = (req, res) => {
    const sql = `select count(ID_RendezVous) from rendezvous
`;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};
const getnouveaurendezvous = (req, res) => {
    const sql = `SELECT Sujet, COUNT(ID_RendezVous) AS NombreRendezvous
FROM rendezvous
GROUP BY Sujet
ORDER BY daterendezvous desc
LIMIT 10;
`;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

const getinscri = (req, res) => {
    const sql = `select i.DateDebutInscription , e.NomEtudiant , e.PrenomEtudiant, f.ID_Filiere , e.sexe , f.NomFiliere, e.ID_Etudiant from inscription i join etudiants e on e.ID_Etudiant=i.ID_Inscription join filiere f on f.ID_Filiere = e.ID_Filiere;
order by i.DateDebutInscription desc
`;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

const getetudparfiliere = (req, res) => {
    const sql = `select NombreEtudiant , NomFiliere from filiere GROUP BY NomFiliere;

`;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};


const getnbetudiantnv = (req, res) => {
    const sql = `
select n.Niveau ,  c.NomClasse , count(e.ID_Etudiant) 
from niveau 
join classes on c.ID_Classe=n.ID_Classe 
join etudiants on e.ID_Classe=c.ID_Classe

`;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

const getnombreparniveau = (req, res) => {
    const sql = `
select n.Niveau ,  c.NomClasse , count(e.ID_Etudiant) 
from niveau 
join classes on c.ID_Classe=n.ID_Classe 
join etudiants on e.ID_Classe=c.ID_Classe

`;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};


const getformateurinfo = (req, res) => {
    const sql = `
SELECT 
    f.ID_Formateur,
    f.NomFormateur,
    f.PrenomFormateur,
    f.Diplome,
    COUNT(DISTINCT c.ID_Classe) AS NombreClasses,
    COUNT(DISTINCT m.ID_Matiere) AS NombreMatieres
FROM 
    formateurs f
LEFT JOIN 
    classes c ON f.ID_Filiere = c.ID_Filiere
LEFT JOIN 
    matieres m ON f.ID_Formateur = m.ID_Formateur
GROUP BY 
    f.ID_Formateur, f.NomFormateur, f.PrenomFormateur, f.Diplome;
`;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};



const getabsenceinfo = (req, res) => {
    const sql = `
SELECT e.PrenomEtudiant, e.NomEtudiant, a.ID_Etudiant, f.NomFiliere, c.NomClasse, SUM(DATEDIFF(a.DateFinAbsence, a.DateDebutAbsence) + 1) AS TotalHeuresAbsence,
 COUNT(a.ID_Absence) AS NombreAbsences FROM etudiants 
e JOIN absence a ON e.ID_Etudiant = a.ID_Etudiant JOIN classes c ON e.ID_Classe = c.ID_Classe 
JOIN filiere f ON c.ID_Filiere = f.ID_Filiere GROUP BY e.ID_Etudiant, e.PrenomEtudiant, e.NomEtudiant, f.NomFiliere, c.NomClasse;
`;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};


const getexpence = (req, res) => {
    const sql = `
SELECT 
    'Formateur' AS Type, 
    f.Salaire AS Salaire, 
    f.DateEmbauche AS DateDepense
FROM 
    formateurs f
    

UNION ALL

SELECT 
    'Personnel' AS Type, 
    p.Salaire AS Salaire, 
    p.DateEmbauche AS DateDepense
FROM 
    personnel p

UNION ALL

-- Total salary expense
SELECT 
    'Total' AS Type, 
    SUM(f.Salaire) + SUM(p.Salaire) AS Salaire, 
    NULL AS DateDepense
FROM 
    formateurs f
JOIN 
    personnel p ON 1=1;
where (f.created_at,p.created_at) as datecre = ?

;
`;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};



const getgain = (req, res) => {
    const sql = `

SELECT 
    f.ID_Filiere,
    f.NomFiliere,
    SUM(i.FraisInscription) AS TotalRevenue
FROM 
    inscriptions i
JOIN 
    etudiants e ON i.ID_Etudiant = e.ID_Etudiant
JOIN 
    filiere f ON e.ID_Filiere = f.ID_Filiere
GROUP BY 
    f.ID_Filiere, f.NomFiliere
ORDER BY 
    TotalRevenue DESC;



;
`;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.status(200).send(results);
    });
};

module.exports = {
    getgain,
    getexpence,
    getabsenceinfo,
    getformateurinfo,
    getnombreparniveau,
    getnbetudiantnv,
    getetudparfiliere,
    getinscri,
    getNbrendezvous,
    getnouveaurendezvous
};

















