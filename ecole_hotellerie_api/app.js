const express = require('express');
const cors = require('cors');
const connection = require('./config/db');

const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');  // Ensure this path is correct
const etudiantRoutes = require('./routes/etudiantsRoutes');  // Ensure this path is correct
const absenceRoutes = require('./routes/absenceRoutes');  // Ensure this path is correct
const personnelRoutes = require('./routes/personnelRoutes');  // Ensure this path is correct
const anneescolaireRoutes = require('./routes/anneescolaireRoutes');  // Ensure this path is correct
const classeRoutes = require('./routes/classeRoutes');  // Ensure this path is correct
const detailsfactureRoutes = require('./routes/detailsfactureRoutes');  // Ensure this path is correct
const evaluationetudiantstageRoutes = require('./routes/evaluationetudiantstageRoutes');  // Ensure this path is correct
const facturesRoutes = require('./routes/facturesRoutes');  // Ensure this path is correct
const filiereRoutes = require('./routes/filiereRoutes');  // Ensure this path is correct
const fournisseursRoutes = require('./routes/fournisseursRoutes');  // Ensure this path is correct
const inscriptionRoutes = require('./routes/inscriptionRoutes');  // Ensure this path is correct
const matiereRoutes = require('./routes/matiereRoutes');  // Ensure this path is correct
const modepaiementRoutes = require('./routes/modepaiementRoutes');  // Ensure this path is correct
const formateursRoutes = require('./routes/formateursRoutes');  // Ensure this path is correct
const niveauRoutes = require('./routes/niveauRoutes');  // Ensure this path is correct
const paiementetudiantRoutes = require('./routes/paiementetudiantRoutes');  // Ensure this path is correct
const stagesRoutes = require('./routes/stagesRoutes');  // Ensure this path is correct
const typepaiementRoutes = require('./routes/typepaiementRoutes');  // Ensure this path is correct
const utilisateursRoutes = require('./routes/utilisateursRoutes');  // Ensure this path is correct
const paiementpersonnelRoutes = require('./routes/paiementpersonnelRoutes');  // Ensure this path is correct
const planingRoutes = require('./routes/planingRoutes');  // Ensure this path is correct
const rendezvousRoutes = require('./routes/rendezvousRoutes');  // Ensure this path is correct

const authenticateJWT = require('./middleware/auth');  // Ensure this path is correct
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})


const upload = multer({ storage: storage });






const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());


app.post('/api/etud/:id' ,upload.single('PhotoProfil'),(req,res)=>{
    const { id } = req.params;
    const PhotoProfil = req.file.filename;
    const sql = "UPDATE etudiants SET PhotoProfil = ? WHERE ID_Etudiant = ? ";
    connection.query(sql, [PhotoProfil,id], (err, result) => {
    if(err) return res.json({Message: "Error"});
    return res.json({Status: "Success"});
})
})




app.use('/api/absence', absenceRoutes);
app.use('/api/anneescolaire', anneescolaireRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/classes', classeRoutes);
app.use('/api/detailsfacture', detailsfactureRoutes);
app.use('/api/etudiants', etudiantRoutes);
app.use('/api/evaluationetudiantstage', evaluationetudiantstageRoutes);
app.use('/api/factures', facturesRoutes);
app.use('/api/filiere', filiereRoutes);
app.use('/api/formateurs', formateursRoutes);
app.use('/api/fournisseurs', fournisseursRoutes);
app.use('/api/inscription', inscriptionRoutes);
app.use('/api/matiere', matiereRoutes);
app.use('/api/modepaiement', modepaiementRoutes);
app.use('/api/niveau', niveauRoutes);
app.use('/api/paiementetudiant', paiementetudiantRoutes);
app.use('/api/paiementpersonnel', paiementpersonnelRoutes);
app.use('/api/personnels', personnelRoutes);
app.use('/api/stages', stagesRoutes);
app.use('/api/typepaiement', typepaiementRoutes);
app.use('/api/utilisateurs', utilisateursRoutes);
app.use('/api/planing', planingRoutes);
app.use('/api/rendezvous', rendezvousRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
