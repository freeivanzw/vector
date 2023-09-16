const { Router } = require('express');
const VectorController = require('./controllers/api/vector');
const MainPageController = require('./controllers/pages/commonPages');

const apiRoutes = Router();

apiRoutes.post('/vector', VectorController.add);
apiRoutes.delete('/vector', VectorController.remove);

const pagesRoutes = Router();

pagesRoutes.get('/', MainPageController.homePage);

module.exports = {
  apiRoutes,
  pagesRoutes,
};