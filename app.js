const express = require('express');
const app = express();
const dotenv = require('dotenv');
const routes = require('./routes');
const middlewares = require('./middlewares');
const bodyParser = require('body-parser');
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));

middlewares.setupApp(app) 

routes.setup(app); //utilizando setup 

const PORT = 4000;


app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
  });

