const bodyparser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const mysql = require('mysql');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));




app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hackathon"
});

connection.connect((error) => {
  if (error) {
    console.error('Erreur de connexion à la base de données:', error);
  } else {
    console.log('Connexion à la base de données établie');
  }
});

module.exports = {
  connection: connection
};


app.use('/', require('./routes/etudiant.routes'));

app.listen(port, () => {
  console.log(`le serveur a démarré sur le port ${port}`);
});

