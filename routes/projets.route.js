module.exports = (app) => {
    const projet = require('../controllers/projet.controller.js');

    // Create a new user
    app.post('/projets', projet.create);

    // Retrieve all users
    app.get('/projets', projet.findAll);

    // Retrieve a single user with noteId
    app.get('/projets/:id', projet.findOne);

    // Update a user with userid
    app.put('/projets/:id', projet.update);

    // Delete a user with userid
    app.delete('/projets/:id', projet.delete);
}
