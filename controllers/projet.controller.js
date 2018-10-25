const Projet = require('../models/projet.model.js');

// Create and Save a new projet
exports.create = (req, res) => {
    // Validate request
    if(!req.body.nom) {
        return res.status(400).send({
            message: "projet content can not be empty"
        });
    }
    // Create a projet
    const projet = new Projet({
      nom: req.body.nom,
      description: req.body.description,
      debut: req.body.debut,
      fin:req.body.fin,
      status: req.body.status

    });
    // Save user in the database
    projet.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "erreur à la creation du projet."
        });
    });
};

// Retrieve and return all User from the database.
exports.findAll = (req, res) => {

    Projet.find()
    .then(projets => {
        res.send(projets);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "probléme a la recuperation des projets"
        });
    });
};

// Find a single user with a userid
exports.findOne = (req, res) => {
    Projet.findById(req.params.id)
   .then(projet => {
       if(!projet) {
           return res.status(404).send({
               message: "projet not found with id " + req.params.id
           });
       }
       res.send(projet);
   }).catch(err => {
       if(err.kind === 'ObjectId') {
           return res.status(404).send({
               message: "Projet not found with id " + req.params.id
           });
       }
       return res.status(500).send({
           message: "Error retrieving projet with id " + req.params.id
       });
   });
};

// Update a user identified by the userid in the request
exports.update = (req, res) => {

    // Validate Request
    if(!req.body.nom) {
        return res.status(400).send({
            message: "Projet content can not be empty"
        });
    }

    // Find user and update it with the request body
    Projet.findByIdAndUpdate(req.params.id, {
      nom: req.body.nom,
      description: req.body.description,
      debut: req.body.debut,
      fin:req.body.fin,
      status: req.body.status
    }, {new: true})
    .then(projet => {
        if(!projet) {
            return res.status(404).send({
                message: "Projet not found with id " + req.params.id
            });
        }
        res.send(projet);
    }).catch(err => {
        if(err.kind === 'id') {
            return res.status(404).send({
                message: "projet not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating projet with id " + req.params.id
        });
    });

};

// Delete a user with the specified userid in the request
exports.delete = (req, res) => {
    Projet.findByIdAndRemove(req.params.id)
    .then(projet => {
        if(!projet) {
            return res.status(404).send({
                message: "Projet not found with id " + req.params.id
            });
        }
        res.send({message: "Projet deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Projet not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete projet with id " + req.params.id
        });
    });

};
