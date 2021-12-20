const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const ctrlSauce = require('../controllers/sauce');

/*L'ordre des middlewares est important !
 * Si nous devons placer multer avant le middleware d'authentification,
 * même les images des requêtes non authentifiées seront enregistrées dans le serveur.
 *  Veillez à placer multer après auth !
*/

// CREATE

router.post('/', auth, multer, ctrlSauce.createSauce);
router.post('/:id/like', auth, ctrlSauce.likeSauce);
router.get('/', auth, ctrlSauce.getAllSauce);
router.get('/:id', auth, ctrlSauce.getOneSauce);
router.put('/:id', auth, multer, ctrlSauce.modifySauce);
router.delete('/:id', auth, ctrlSauce.deleteSauce);

module.exports = router;