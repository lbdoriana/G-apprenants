const { connection } = require('../app');

/**
 * @swagger
 * /etudiants:
 *   get:
 *     summary: Récupère la liste des étudiants.
 *     description: Endpoint pour récupérer tous les étudiants.
 *     responses:
 *       200:
 *         description: Succès de la récupération des étudiants.
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 { id: 1, nom: 'Nom1', prenom: 'Prenom1', ... },
 *                 { id: 2, nom: 'Nom2', prenom: 'Prenom2', ... },
 *                 // ...
 *               ]
 *       500:
 *         description: Erreur lors de la récupération des données.
 *         content:
 *           application/json:
 *             example:
 *               { error: "Récupération de données impossible" }
 */
exports.getEtudiants = (req, res) => {
  connection.query('SELECT * FROM etudiants', (error, data) => {
    if (error) {
      res.status(500).json({ error: "Récupération de données impossible" });
    } else {
      res.json(data).status(200);
    }
  });
};



/**
 * @swagger
 * /etudiants/{id}:
 *   get:
 *     summary: Récupère un étudiant par son Matricule.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant Matricule de l'étudiant.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Succès de la récupération de l'étudiant.
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 { id: 1, nom: 'Nom1', prenom: 'Prenom1', ... },
 *               ]
 *       500:
 *         description: Erreur lors de la récupération des données.
 *         content:
 *           application/json:
 *             example:
 *               { error: "Récupération de données impossible" }
 */

exports.getEtudiantsById = (req, res) => {
  connection.query('SELECT * FROM etudiants WHERE Matricule = ?', [req.params.id], (error, data) => {
    if (error) {
      res.status(500).json({ error: "recupération de données impossible" });
    } else {
      res.json(data).status(200);
    }
  });
};





/**
 * @swagger
 * /etudiants:
 *   post:
 *     summary: Ajoute un nouvel étudiant.
 *     requestBody:
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
 *         description: Succès de l'ajout de l'étudiant.
 *         content:
 *           application/json:
 *             example:
 *               { message: 'post réussi' }
 *       500:
 *         description: Erreur lors de l'ajout de l'étudiant.
 *         content:
 *           application/json:
 *             example:
 *               { error: "post échoué" }
 */
exports.postEtudiants = (req, res) => {
  const { Nom, Prenoms, sexe, Date_de_naissance, Adresse_mail, Num_tel, Filiere, Niveau, Activite_extrascolaire } = req.body;
  connection.query('INSERT INTO etudiants (Nom, Prenoms, sexe, Date_de_naissance, Adresse_mail, Num_tel, Filiere, Niveau, Activite_extrascolaire) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [Nom, Prenoms, sexe, Date_de_naissance, Adresse_mail, Num_tel, Filiere, Niveau, Activite_extrascolaire], (error) => {
    if (error) {
      console.error(error);
      res.status(500).send("post echoué");
    } else {
      res.status(200).json({ message: 'post réussi' });
    }
  });
};


/**
 * @swagger
 * /etudiants/{id}:
 *   put:
 *     summary: Met à jour les informations d'un étudiant.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant Matricule de l'étudiant à mettre à jour.
 *         schema:
 *           type: integer
 *     requestBody:
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
 *         description: Succès de la mise à jour de l'étudiant.
 *       500:
 *         description: Erreur lors de la mise à jour des données.
 *         content:
 *           application/json:
 *             example:
 *               { error: "Mise à jour échouée" }
 */

exports.putEtudiants = (req, res) => {
  const Matricule = req.params.id;
  const { Adresse_mail, Filiere } = req.body;
  connection.query('UPDATE etudiants SET Adresse_mail = ?, Filiere = ? WHERE Matricule = ?', [Adresse_mail, Filiere, Matricule], (error) => {
    if (error) {
      console.error(error);
      res.status(500).send("Mise à jour échouée");
    } else {
      res.sendStatus(200).send("Modification effectuée avec succès");
    }
  });
};

/**
 * @swagger
 * /etudiants/{id}:
 *   delete:
 *     summary: Supprime un étudiant par son Matricule.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant Matricule de l'étudiant à supprimer.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Succès de la suppression de l'étudiant.
 *       500:
 *         description: Erreur lors de la suppression de l'étudiant.
 *         content:
 *           application/json:
 *             example:
 *               { error: "Erreur lors de la suppression de l'étudiant" }
 */

exports.deleteEtudiants = (req, res) => {
  const Matricule = req.params.id;
  connection.query('DELETE FROM etudiants WHERE Matricule = ?', [Matricule], (error) => {
    if (error) {
      console.error(error);
      res.status(500).send("Erreur lors de la suppression de l'étudiant");
    } else {
      res.sendStatus(200);
    }
  });
};
