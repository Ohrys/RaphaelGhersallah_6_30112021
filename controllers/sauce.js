const Sauce = require('../models/Sauce');
const fs = require('fs');

// --- CRUD - Sauce : 

 exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes : 0,
        dislikes : 0,
        usersLike : [],
        usersDisliked : []
    });
    sauce.save()
        .then(() => res.status(201).json({message : "Sauce créé !"}))
        .catch(error => {res.status(400).json({ error })});
}; 

exports.getAllSauce = (req, res) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }))
};
exports.getOneSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
     .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }))
};

exports.modifySauce = (req, res, next) => {
    //on précise l'id avec l'id passé en paramètre car on ne peut pas créer un nouvel objet avec new : ça générerait une erreur 
    // car on essaye de modifier un champ immuable
    const sauceObject = req.file ? 
    {
        ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body};
    Sauce.updateOne({ _id: req.params.id }, { ... sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Sauce Modifiée !" }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id : req.params.id})
    .then((sauce) => {
        if(!sauce){
             res.status(404).json({
                 error: new Error('Sauce inconnue!')
             });
        }
        if(sauce.userId !== req.auth.userId){
             res.status(400).json({
                 error: new Error('Unauthorized Request !')
             });
         }
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, ()=>{
            Sauce.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
                .catch(error => res.status(400).json({ error }));
        })
        
    })
    .catch(error => res.status(500).json({ error }));
};

exports.likeSauce = (req, res, next) =>{
        Sauce.updateOne({ _id: req.params.id },
            {
                like : req.body.like,
                usersLiked : req.body.userId,
                _id:req.params.id
            })
         .then(() => res.status(200).json({message:'Sauce modifié !'}))
        .catch(error => res.status(400).json({ error }));
};