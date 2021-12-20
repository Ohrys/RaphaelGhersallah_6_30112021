const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// -- Connexion à la base MongoDB
let pswd = 'cm9vdA=='; // process.env.DB_PSWD
mongoose.connect('mongodb+srv://root:'+pswd+'@database.j2bn4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
 {useNewUrlParser:true,
  useUnifiedTopology:true})
 .then(() =>console.log('Connexion à mongoDB réussie !'))
.catch(() =>console.log('Connexion à mongoDB échouée !!'));

// -- HEADERS de requête pour prévenir les erreurs CORS 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permet de créer un filtre sur qui peut requêter le back. 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// -- Le corps des requête doit être lu en json. 
app.use(express.json());

// -- permet de résoudre la requete vers /images pour pointer sur le dossier d'image.
app.use('/images', express.static(path.join(__dirname, 'images')));

//Importation des routes.
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
// ----- Route user -----

app.use('/api/auth', userRoutes);

// ----- Route sauce -----

app.use('/api/sauces', sauceRoutes);


module.exports = app;