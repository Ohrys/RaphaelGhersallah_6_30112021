const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});
//ajout d'un plugin pour l'interprétation du "unique : true" du champ email.
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',userSchema);