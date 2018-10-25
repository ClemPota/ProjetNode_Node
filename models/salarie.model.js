const mongoose = require('mongoose');

const SalarieSchema = mongoose.Schema({
    nom: String,
    prenom: String,
    username: String,
    naissance: Date,
    rue : Number,
    ville : String,
    adresse : String,
    poste : String

}, {
    timestamps: true
});

module.exports = mongoose.model('Salarie', SalarieSchema);
