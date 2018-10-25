const Salarie = require('../models/salarie.model.js');

// Create and Save a new salarie
exports.create = (req, res) => {
    // Validate request
    if(!req.body.nom) {
        return res.status(400).send({
            message: "salarie content can not be empty"
        });
    }
    // Create a salarie
    const salarie = new Salarie({
      nom: req.body.nom,
      prenom: req.body.prenom,
      username: req.body.username,
      naissance:req.body.naissance,
      rue: req.body.rue,
      ville: req.body.ville,
      adresse: req.body.adresse,
      poste: req.body.poste

    });
    // Save user in the database
    salarie.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "erreur à la creation du salarie."
        });
    });
};

// Retrieve and return all User from the database.
exports.findAll = (req, res) => {

    Salarie.find()
    .then(salaries => {
        res.send(salaries);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "probléme a la recuperation des Salaries"
        });
    });
};

// Find a single user with a userid
exports.findOne = (req, res) => {
    Salarie.findById(req.params.id)
   .then(salarie => {
       if(!salarie) {
           return res.status(404).send({
               message: "salarie not found with id " + req.params.id
           });
       }
       res.send(salarie);
   }).catch(err => {
       if(err.kind === 'ObjectId') {
           return res.status(404).send({
               message: "salarie not found with id " + req.params.id
           });
       }
       return res.status(500).send({
           message: "Error retrieving salarie with id " + req.params.id
       });
   });
};

// Update a user identified by the userid in the request
exports.update = (req, res) => {

    // Validate Request
    if(!req.body.nom) {
        return res.status(400).send({
            message: "salarie content can not be empty"
        });
    }

    // Find user and update it with the request body
    Salarie.findByIdAndUpdate(req.params.id, {
      nom: req.body.nom,
      prenom: req.body.prenom,
      username: req.body.username,
      naissance:req.body.naissance,
      rue: req.body.rue,
      ville: req.body.ville,
      adresse: req.body.adresse,
      poste: req.body.poste
    }, {new: true})
    .then(salarie => {
        if(!salarie) {
            return res.status(404).send({
                message: "salarie not found with id " + req.params.id
            });
        }
        res.send(salarie);
    }).catch(err => {
        if(err.kind === 'id') {
            return res.status(404).send({
                message: "salarie not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating salarie with id " + req.params.id
        });
    });

};

// Delete a user with the specified userid in the request
exports.delete = (req, res) => {
    Salarie.findByIdAndRemove(req.params.id)
    .then(salarie => {
        if(!salarie) {
            return res.status(404).send({
                message: "salarie not found with id " + req.params.id
            });
        }
        res.send({message: "salarie deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "salarie not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete salarie with id " + req.params.id
        });
    });

};
