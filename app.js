const bodyparser= require('body-parser');
const express=require('express');
const app = express();
const cors=require('cors');
const port=3000;
const mysql=require('mysql')

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
   console.log(`le serveur a demarré sur le port $(port)`);
   });


  
