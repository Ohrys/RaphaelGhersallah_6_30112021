const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = (req, res, next) => {
    delete req.body._id;
    const user = new User({
        email: req.body.email,
        password: '123' + req.body.password
    });
    user.save()
     .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.loginUser = (req, res, next) => {
    User.findOne({ email: req.body.email, password: '123' + req.body.password })
    .then( user => {
        if(!user){
            return res.status(401).json({error : "Utilisateur non trouvé !"});
        }
        //ici ma promesse de cryptage + comparaison dans le then, si la comparaison échoue renvoyer une erreur 401 "mdp incorrect"
        res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
            )
        });
        //puiseque je fais une promesse de cryptage, ici un catch d'erreur 500 si une erreur se produit ici. 
    })
    .catch();
};