const { Router } = require('express');
const VectorController = require('./controllers/api/vector');
const MainPageController = require('./controllers/pages/commonPages');

const apiRoutes = Router();

apiRoutes.post('/vector', VectorController.add);
apiRoutes.delete('/vector', VectorController.remove);
// apiRoutes.get('/vector/:id', VectorController.getById);
apiRoutes.get('/vector', VectorController.getAll);

const pagesRoutes = Router();

pagesRoutes.get('/', MainPageController.homePage);
apiRoutes.get('/vector/:id', MainPageController.detailsPage);

module.exports = {
  apiRoutes,
  pagesRoutes,
};