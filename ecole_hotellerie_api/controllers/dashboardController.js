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
    const { id } = req.params;
    const sql = `
        SELECT f.ID_Filiere, f.NomFiliere,f.ID_Filiere, c.ID_Filiere, COUNT(e.ID_Etudiant) AS NombreEtudiants FROM filiere f JOIN classes c ON f.ID_Filiere = c.ID_Filiere JOIN etudiants e ON c.ID_Classe = e.ID_Classe WHERE c.ID_AnneeScolaire = ? GROUP BY f.ID_Filiere, f.NomFiliere;
    `;
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

const getYears = (req, res) => {
    const sql = 'SELECT DISTINCT AnneeScolaire, ID_AnneeScolaire FROM anneescolaire ORDER BY created_at DESC';
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
const getinscriToday = (req, res) => {
    const sql = `
SELECT COUNT(*) AS total_inscription_today
FROM inscription
WHERE DATE(created_at) = CURDATE() OR DATE(updated_at) = CURDATE();
`;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};
const getpersonelNb = (req, res) => {
    const sql = `
SELECT count(*) as total_personnel from personnel;

`;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};
const getformateurNb = (req, res) => {
    const sql = `
SELECT count(*) as total_formateurs from formateurs;

`;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};
const getfactureNb = (req, res) => {
    const sql = `
SELECT count(*) AS total_factures from factures;

`;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

const getexpence = (req, res) => {
    const { start_date, end_date } = req.query;

    if (!start_date || !end_date) {
        return res.status(400).send("Missing start_date or end_date query parameters");
    }

    const sql = `
        SELECT Mois_Paie, SUM(Salaire) AS Total_Salaire 
        FROM (
            SELECT ID_Formateur AS ID, NomFormateur AS Nom, PrenomFormateur AS Prenom, Salaire, Mois_Paie, created_at 
            FROM formateurs 
            WHERE created_at >= ? AND created_at <= ?
            UNION ALL 
            SELECT ID_Personnel AS ID, NomPersonnel AS Nom, PrenomPersonnel AS Prenom, Salaire, Mois_Paie, created_at 
            FROM personnel 
            WHERE created_at >= ? AND created_at <= ?
        ) AS combined 
        GROUP BY Mois_Paie 
        ORDER BY Mois_Paie;
    `;

    connection.query(sql, [start_date, end_date, start_date, end_date], (err, results) => {
        if (err) {
            return res.status(500).send(err.toString());
        }
        res.send(results);
    });
};



const getgain = (req, res) => {
    const { start_date, end_date } = req.query;

    if (!start_date || !end_date) {
        return res.status(400).send("Missing start_date or end_date query parameters");
    }

    const sql = `
        SELECT 
            Mois_Paie,
            SUM(i.FraisInscription) AS TotalRevenue
        FROM 
            inscription i
        WHERE 
            i.created_at >= ? AND i.created_at <= ?
        GROUP BY 
            Mois_Paie
        ORDER BY 
            FIELD(Mois_Paie, 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre');
    `;

    connection.query(sql, [start_date, end_date], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.status(200).send(results);
    });
};
const getexpenceFour = (req, res) => {
    const { start_date, end_date } = req.query;

    if (!start_date || !end_date) {
        return res.status(400).send("Missing start_date or end_date query parameters");
    }

    const sql = `
        SELECT f.NomFournisseur, SUM(fc.Montant) AS TotalMontant FROM fournisseurs f JOIN factures fc ON f.ID_Fournisseur = fc.ID_Fournisseur


 WHERE 
            f.created_at >= ? AND f.created_at <= ?

 GROUP BY f.NomFournisseur;
    `;

    connection.query(sql, [start_date, end_date], (err, results) => {
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
    getnouveaurendezvous,
    getYears,
    getexpenceFour,
    getinscriToday,
    getfactureNb,getformateurNb,
    getpersonelNb
};

















