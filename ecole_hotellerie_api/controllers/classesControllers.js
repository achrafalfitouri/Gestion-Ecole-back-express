const connection = require('../config/db');

// Get all students
const getAllclasses = (req, res) => {
    const sql = 'SELECT * FROM Etudiants';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.toString());
        res.send(results);
    });
};

// Get student by ID
const getclassesById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM classes WHERE ID_Etudiant = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.toString());
        if (results.length === 0) return res.status(404).send('Student not found');
        res.send(results[0]);
    });
};

// Create new student
const createclasses = (req, res) => {
    const { ID_Classe,NomClasse,ID_Filiere,AnneeScolaire,Remarques	
    } = req.body;
    const sql = 'INSERT INTO classes (ID_Classe,NomClasse,ID_Filiere,AnneeScolaire,Remarques	) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [ID_Classe,NomClasse,ID_Filiere,AnneeScolaire,Remarques	], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        res.send('Student created successfully!');
    });
};

// Update student by ID
const updateclassesById = (req, res) => {
    const { id } = req.params;
    const { ID_Classe,NomClasse,ID_Filiere,AnneeScolaire,Remarques	} = req.body;
    const sql = 'UPDATE classes SET ID_Classe = ?, NomClasse = ?, ID_Filiere = ?, AnneeScolaire = ?, Remarques = ? WHERE ID_Classe = ?';
    connection.query(sql, [ID_Classe,NomClasse,ID_Filiere,AnneeScolaire,Remarques	], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Student not found');
        res.send('Student updated successfully!');
    });
};

// Delete student by ID
const deleteclassesById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM classes WHERE ID_Classe = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.toString());
        if (result.affectedRows === 0) return res.status(404).send('Student not found');
        res.send('Student deleted successfully!');
    });
};

module.exports = { getAllclasses, getclassesById, createclasses, updateclassesById, deleteclassesById };