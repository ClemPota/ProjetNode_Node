const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    nom_entreprise: String,
      rue : Number,
      adresse : String,
      ville : String,
      code_postal : Number,
      nom : String,
      prenom : String,
      tel : Number,
      mail : String,
    secteur : String,

}, {
    timestamps: true
});

module.exports = mongoose.model('Client', ClientSchema);
