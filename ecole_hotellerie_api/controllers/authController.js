const connection = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
    const { NomUtilisateur, PrenomUtilisateur, Email, MotDePasse, ID_Role } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(MotDePasse, salt);

        const sql = 'INSERT INTO Utilisateurs (NomUtilisateur, PrenomUtilisateur, Email, MotDePasse, ID_Role) VALUES (?, ?, ?, ?, ?)';
        connection.query(sql, [NomUtilisateur, PrenomUtilisateur, Email, hashedPassword, ID_Role], (err, result) => {
            if (err) throw err;
            res.send('User registered!');
        });
    } catch (err) {
        res.status(500).send(err.toString());
    }
};

const login = (req, res) => {
    const { Email, MotDePasse } = req.body;

    const sql = 'SELECT * FROM Utilisateurs WHERE Email = ?';
    connection.query(sql, [Email], async (err, results) => {
        if (err) throw err;
        if (results.length === 0) return res.status(400).send('Email or password is wrong');

        const user = results[0];
        const validPass = await bcrypt.compare(MotDePasse, user.MotDePasse);
        if (!validPass) return res.status(400).send('Invalid password');

        const token = jwt.sign({ id: user.ID_Utilisateur, role: user.ID_Role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.header('Authorization', token).json({ token });
    });
};

const getAuthenticatedUser = (req, res) => {
    const userId = req.user.id;

    const sql = 'SELECT ID_Utilisateur, NomUtilisateur, PrenomUtilisateur, Email, ID_Role FROM Utilisateurs WHERE ID_Utilisateur = ?';
    connection.query(sql, [userId], (err, results) => {
        if (err) throw err;
        if (results.length === 0) return res.status(404).send('User not found');
        res.json(results[0]);
    });
};

module.exports = { register, login, getAuthenticatedUser };
