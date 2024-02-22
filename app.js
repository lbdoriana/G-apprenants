const bodyparser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
// const port = 3306;
const mysql = require('mysql');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));




app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());

const connection = mysql.createConnection({
  Server: "mysql-basededonnee.alwaysdata.net",
  user: "349032_root",
  password: "#CEb3JXC9dwAC7K",
  Database: "basededonnee_test"

});

connection.connect((error) => {
  if (error) {
    console.error('Erreur de connexion à la base de données:', error);
  } else {
    console.log('Connexion à la base de données établie avec succes');
  }
});

module.exports = {
  connection: connection
};


app.use('/', require('./routes/etudiant.routes'));

app.listen(port, () => {
  console.log(`le serveur a démarré sur le port ${port}`);
});

