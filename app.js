const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Importation des modèles.
const User = require('./models/User')
const Sauce = require('./models/Sauce')

let pswd = 'cm9vdA==';
mongoose.connect('mongodb+srv://root:'+pswd+'@database.j2bn4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
 {useNewUrlParser:true,
  useUnifiedTopology:true})
 .then(() =>console.log('Connexion à mongoDB réussie !'))
.catch(() =>console.log('Connexion à mongoDB échouée !!'));

app.use(express.json());

// -- HEADERS de requête pour prévenir les erreurs CORS 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// --- Début du middleWare 

// ----- Route user -----
app.post('/api/auth/signup',(req,res,next) => {
    delete req.body._id; 
    const user = new User({
        email: req.body.email,
        password : '123'+req.body.password
    });
    user.save()
     .then(() => res.status(201).json({message : 'Objet enregistré !'}))
    .catch( error => res.status(400).json({error}));
});

app.post('/api/auth/login',(req,res,next) =>{
    User.findOne({ email: req.body.email, password:'123'+req.body.password})
     .then((user) => {console.log(user._id);res.status(200).json({userId:user._id})})
    .catch(error => res.status(404).json({error:error.message}));
    
})


module.exports = app;