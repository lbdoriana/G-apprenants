const bodyparser= require('body-parser');
const express=require('express');
const app = express();
const cors=require('cors');
const port=3000;
const mysql=require('mysql')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'http://localhost:3000/etudiants',
      version: '1.0.0',
    },
  },
  apis: ['app.js'],
};

const swaggerSpec = swaggerJsDoc(options);
const swaggerJSDoc = require('swagger-jsdoc');



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false}))
app.use(cors());

 const connection = mysql.createConnection({  
  host: "localhost",
  user:"root",
  password:"",
  database:"hackathon"
 });
 connection.connect((error)=>{
  if (error){
   console.error(error)
  }else{
   console.log('connexion à la base de données établie');
  }
 })
 // Etablir les routes


 /**
 * @swagger
 * /etudiants:
 *   get:
 *     description: Récupère la liste des étudiants
 *     responses:
 *       200:
 *         description: Succès
 *       500:
 *         description: Erreur serveur
 */
 
//  afficher tous les etudiants
 app.get('/etudiants', (req, res) => {
  connection.query('SELECT * FROM etudiants', (error, data)=>{
   if(error){
    res.status(500);
    console.log("recupération de données impossible");
   }else{
    res.json(data).status(200);
    
   }
  })
  
 });

 /**
 * @swagger
 * /etudiants/{Matricule}:
 *   get:
 *     description: Récupère un étudiant par son Matricule
 *     parameters:
 *       - name: Matricule
 *         in: path
 *         required: true
 *         description: Matricule de l'étudiant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès
 *       500:
 *         description: Erreur serveur
 */
//  Afficher un etudiant

app.get('/etudiants/:Matricule', (req, res) => {
    connection.query('SELECT * FROM etudiants WHERE Matricule= ?', [req.params.Matricule], (error, data)=>{
     if(error){
      res.status(500);
      console.log("recupération de données impossible");
     }else{
      res.json(data).status(200);
      
     }
    })
  })

  /**
 * @swagger
 * /etudiants:
 *   post:
 *     description: Ajoute un nouvel étudiant
 *     requestBody:
 *       description: Données de l'étudiant à ajouter
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nom:
 *                 type: string
 *               Prenoms:
 *                 type: string
 *               sexe:
 *                 type: string
 *               Date_de_naissance:
 *                 type: string
 *               Adresse_mail:
 *                 type: string
 *               Num_tel:
 *                 type: string
 *               Filiere:
 *                 type: string
 *               Niveau:
 *                 type: string
 *               Activite_extrascolaire:
 *                 type: string
 *     responses:
 *       200:
 *         description: Succès
 *       500:
 *         description: Erreur serveur
 */
 
//  ajouter un etudiant
  app.post('/etudiants', (req, res) => {
   const { Matricule,Nom, Prenoms, sexe, Date_de_naissance, Adresse_mail, Num_tel, Filiere, Niveau, Activite_extrascolaire } = req.body;
   connection.query('INSERT INTO etudiants ( Matricule, Nom, Prenoms, sexe, Date_de_naissance, Adresse_mail, Num_tel, Filiere, Niveau, Activite_extrascolaire) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?,?)', [ null, Nom, Prenoms, sexe, Date_de_naissance, Adresse_mail, Num_tel, Filiere, Niveau, Activite_extrascolaire ], (error) => {
    if (error) {
     console.log(error);
     res.status(500).send("post echoué");
    } else {
     res.status(200).json({message:'post réussi'});

    }
  });

 });



 /**
 * @swagger
 * /etudiants/{Matricule}:
 *   put:
 *     description: Modifie les informations d'un étudiant par son Matricule
 *     parameters:
 *       - name: Matricule
 *         in: path
 *         required: true
 *         description: Matricule de l'étudiant
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Nouvelles données de l'étudiant
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Adresse_mail:
 *                 type: string
 *               Filiere:
 *                 type: string
 *     responses:
 *       200:
 *         description: Succès
 *       500:
 *         description: Erreur serveur
 */

// modifier un etudiant
 app.put('/etudiants/:Matricule', (req, res) => {

  const Matricule = req.params.Matricule;
  const { Adresse_mail, Filiere} = req.body;
  connection.query('UPDATE etudiants SET Adresse_mail= ?, Filiere = ? WHERE Matricule = ?', [Adresse_mail, Filiere, Matricule], (error) => {
      if (error) {
          console.error(error);
          res.status(500).send("Mise à jour échouée");
      } else {
          res.sendStatus(200).send("Modification effectué avec succès"); 
      } 
  });
});


/**
 * @swagger
 * /etudiants/{Matricule}:
 *   delete:
 *     description: Supprime un étudiant par son Matricule
 *     parameters:
 *       - name: Matricule
 *         in: path
 *         required: true
 *         description: Matricule de l'étudiant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès
 *       500:
 *         description: Erreur serveur
 */
//  Supprimer un etudiant
app.delete('/etudiants/:Matricule', (req, res) => {
 const { Matricule} = req.params;
 connection.query('DELETE FROM etudiants WHERE Matricule=?', [Matricule], (error) => {
     if (error) {
         console.error(error);
         res.status(500).send("Erreur lors de la suppression de l'étudiant");
     } else {
         res.sendStatus(200); 
     }
 });
});
 app.listen(port,()=> {   
  console.log(`le serveur a démarré sur le port ${port}`);


   });


  
