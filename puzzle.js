// Snippets de código para poder componer el programa

//Usado?: 
  const middlewares = require('./middlewares');
//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: yes - app.js
const bodyParser = require('body-parser');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: yes - routes.js
const session = require('express-session');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: Yes - app.js
const express = require('express');
//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: 
const bodyParser = require('body-parser');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: yes - middleware
const session = require('express-session');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: Yes - middleware
const dotenv = require('dotenv');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: Yes - app.js
const middlewares = require('./middlewares');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: Yes - app.js
const routes = require('./routes');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: yes - routes
dotenv.config();
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: Yes - app.js
const app = express();
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: Yes - app.js
const PORT = 4000;
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: yes - routes
const dotenv = require('dotenv');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?:
dotenv.config();
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?:
middlewares.setupApp(app);
//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?:
routes.setup(app);
//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?:yes
const validarPalabraMiddleware = (req, res, next) => {
  const palabraCorrecta = process.env.PALABRA_SECRETA || '';

  if (req.body.palabra === palabraCorrecta) {
    req.session.palabraSecreta = req.body.palabra;
    next();
  } else {
    res.redirect('/?error=1');
  }
};
//--- Explicación: 


// -------------------------------------------------------------------------------------


//Usado?: Yes - app.js
const setup = (app) => {
  app.get('/', (req, res) => {
    const mensajeError = req.query.error
      ? (req.query.error === '1' ? 'Palabra incorrecta, inténtalo de nuevo.' : 'No estás logado.')
      : '';
    if (req.session.palabraSecreta) {
      return res.redirect('/profile');
    }
  //Aquí va código dentro
})}
//--- Explicación: 


// -------------------------------------------------------------------------------------


//Usado?:yes
res.send(`
  <html>
    <body>
      <h1>Página de Inicio</h1>
      <p>${mensajeError}</p>
      <form method="post" action="/profile">
        <label for="palabra">Introduce la palabra:</label>
        <input type="text" name="palabra" required>
        <button type="submit">Enviar</button>
      </form>
    </body>
  </html>
`);
//--- Explicación: 


// -------------------------------------------------------------------------------------


const setupAPP = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
  }));
};

//Usado?:yes
app.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?:
app.use(bodyParser.urlencoded({ extended: true }));

//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?:
app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));

//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: Yes - app.js
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?:yes
const verificarSesionMiddleware = (req, res, next) => {
  if (req.session.palabraSecreta) {
    next();
  } else {
    res.redirect('/?error=2');
  }
};
//--- Explicación: 

// -------------------------------------------------------------------------------------


//Usado?: yes
app.get('/profile', middlewares.verificarSesionMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil (Sesión activa)</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: 

// -------------------------------------------------------------------------------------


//Usado?:yes
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/');
  });
});
//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: Yes - routes.js
module.exports = {
  setup,
};
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: yes - middleware
module.exports = {
  validarPalabraMiddleware,
  verificarSesionMiddleware,
  setupAPP,
};
//--- Explicación:

// -------------------------------------------------------------------------------------

