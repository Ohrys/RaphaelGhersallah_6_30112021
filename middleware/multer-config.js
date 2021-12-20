const multer = require('multer');

const MIME_TYPES = {
    'image/jpg':'jpg',
    'image/jpeg':'jpg',
    'image/png':'png'
};

const storage = multer.diskStorage({
    destination:(req,file,callback) =>{
        callback(null,'images');
    },
    filename:(req, file, callback) =>{
        const name = file.originalname.split(' ').join('_').split('.').join('_');
        const extension = MIME_TYPES[file.mimetype];
        //crée un fichier de la forme : truc_machinXXXXX.png|jpg|jpeg où XXXX est l'heure et date d'upload.
        callback(null,name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage}).single('image');