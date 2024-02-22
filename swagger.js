const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mon API',
      version: '1.0.0',
      description: "Documentation de l'API utilisant Swagger",
    },
  },
  apis: ['app.js', './controllers/etudiantController.js' ],  // Spécifiez le chemin vers vos fichiers de routes
};



const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;