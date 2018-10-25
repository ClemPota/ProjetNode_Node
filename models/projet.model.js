const mongoose = require('mongoose');

const ProjetSchema = mongoose.Schema({
    nom: String,
    description: String,
    debut: Date,
    fin: Date,
    status: String

}, {
    timestamps: true
});

module.exports = mongoose.model('Projet', ProjetSchema);
