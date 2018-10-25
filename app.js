const express = require('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true}));

app.use(bodyParser.json());

app.use(function(req, res, next)
{
  res.setHeader('Content-type','application/json');
  res.setHeader('Accept','application/json');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin');
  next();
});


mongoose.connect('mongodb://pota:clement21@ds131373.mlab.com:31373/projet',{
  useNewUrlParser: true
}).then(() => {
  console.log("Connecté à la base de donnée");
}).catch(err => {
  console.log('Echéc de connexion à la base de donnée. Cause ...', err);
});

require('./routes/projets.route.js')(app);
require('./routes/salaries.route.js')(app);
require('./routes/clients.route.js')(app);


app.listen(3000, () => {
  console.log("Serveur On");
});
