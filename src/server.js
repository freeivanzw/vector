const express = require('express');
const { apiRoutes, pagesRoutes } = require('./routers');
const { PORT } = require('./config');
const setupMiddleware = require('./middleware');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();


const app = express();

setupMiddleware(app);

app.use('/api', apiRoutes);

app.use('/', pagesRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('The server started on port: ' + PORT);
});
