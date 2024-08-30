const dotenv = require('dotenv');
const session = require('express-session');



const setupApp = (app) => {
  
  app.use(session({
    secret: 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
  }));
};

const verificarSesionMiddleware = (req, res, next) => {
  if (req.session.palabraSecreta) {
    next();
  } else {
    res.redirect('/?error=2');
  }
};

const validarPalabraMiddleware = (req, res, next) => {
  const palabraCorrecta = process.env.PALABRA_SECRETA || '';

  if (req.body.palabra === palabraCorrecta) {
    req.session.palabraSecreta = req.body.palabra;
    next();
  } else {
    res.redirect('/?error=1');
  }
}

 

module.exports = {
    validarPalabraMiddleware,
    verificarSesionMiddleware,
    setupApp,
  };