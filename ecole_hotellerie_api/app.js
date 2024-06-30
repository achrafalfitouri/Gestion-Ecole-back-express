const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');  // Ensure this path is correct
const etudiantRoutes = require('./routes/etudiantsRoutes');  // Ensure this path is correct
const personnelRoutes = require('./routes/personnelRoutes');  // Ensure this path is correct
const authenticateJWT = require('./middleware/auth');  // Ensure this path is correct

const app = express();

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/etudiants', etudiantRoutes);
app.use('/api/personnels', personnelRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
