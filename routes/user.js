const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user');

router.post('/signup', ctrlUser.registerUser);
router.post('/login', ctrlUser.loginUser);

module.exports = router;