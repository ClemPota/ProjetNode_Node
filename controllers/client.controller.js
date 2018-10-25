const Client = require('../models/client.model.js');

// Create and Save a new projet
exports.create = (req, res) => {
    // Validate request
    if(!req.body.nom_entreprise) {
        return res.status(400).send({
            message: "client content can not be empty"
        });
    }
    // Create a projet
    const client = new Client({
      nom_entreprise: req.body.nom_entreprise,
      rue: req.body.rue,
      adresse: req.body.adresse,
      ville: req.body.ville,
      code_postal: req.body.code_postal,
      nom: req.body.nom,
      prenom: req.body.prenom,
      tel: req.body.tel,
      mail: req.body.mail,
      secteur: req.body.secteur
    });
    // Save user in the database
    client.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "erreur à la creation du client."
        });
    });
};

// Retrieve and return all User from the database.
exports.findAll = (req, res) => {

    Client.find()
    .then(clients => {
        res.send(clients);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "probléme a la recuperation des clients"
        });
    });
};

// Find a single user with a userid
exports.findOne = (req, res) => {
    Client.findById(req.params.id)
   .then(client => {
       if(!client) {
           return res.status(404).send({
               message: "projet not found with id " + req.params.id
           });
       }
       res.send(client);
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
    if(!req.body.nom_entreprise) {
        return res.status(400).send({
            message: "Projet content can not be empty"
        });
    }

    // Find user and update it with the request body
    Client.findByIdAndUpdate(req.params.id, {
      nom_entreprise: req.body.nom_entreprise,
      rue: req.body.rue,
      adresse: req.body.adresse,
      ville: req.body.ville,
      code_postal: req.body.code_postal,
      nom: req.body.nom,
      prenom: req.body.prenom,
      tel: req.body.tel,
      mail: req.body.mail,
      secteur: req.body.secteur
    }, {new: true})
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "Client not found with id " + req.params.id
            });
        }
        res.send(client);
    }).catch(err => {
        if(err.kind === 'id') {
            return res.status(404).send({
                message: "Client not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating client with id " + req.params.id
        });
    });

};

// Delete a user with the specified userid in the request
exports.delete = (req, res) => {
    Client.findByIdAndRemove(req.params.id)
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "Client not found with id " + req.params.id
            });
        }
        res.send({message: "Client deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Projet not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete client with id " + req.params.id
        });
    });

};
