// Snippets de código para poder componer el programa

//Usado?: 
  const middlewares = require('./middlewares');
//--- Explicación: importa los middlewares

// -------------------------------------------------------------------------------------

//Usado?: yes
const bodyParser = require('body-parser');
//--- Explicación: importa bpdy-parser,que es un middleware de express que convierte las soliccitudes http en un objeto accesible desde req.body

// -------------------------------------------------------------------------------------

//Usado?: yes 
const session = require('express-session');
//--- Explicación:es un middleware para manejar sesiones de usuario.

// -------------------------------------------------------------------------------------

//Usado?: Yes -
const express = require('express');
//--- Explicación: importa express

// -------------------------------------------------------------------------------------

//Usado?: 
const bodyParser = require('body-parser');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: 
const session = require('express-session');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: Yes 
const dotenv = require('dotenv');
//--- Explicación: importa el archivo .env que contiene la palabra secreta

// -------------------------------------------------------------------------------------

//Usado?: Yes 
const middlewares = require('./middlewares');
//--- Explicación:importa los middlewares,para usarlos en las rutas

// -------------------------------------------------------------------------------------

//Usado?: Yes 
const routes = require('./routes');
//--- Explicación:importa las rutas

// -------------------------------------------------------------------------------------

//Usado?: yes 
dotenv.config();
//--- Explicación:configura la variable  de entorno .env

// -------------------------------------------------------------------------------------

//Usado?: Yes 
const app = express();
//--- Explicación:llama al metodo express en una variables con nombre app

// -------------------------------------------------------------------------------------

//Usado?: Yes 
const PORT = 4000;
//--- Explicación:crea una variable del puerto y le da valor

// -------------------------------------------------------------------------------------

//Usado?:
const dotenv = require('dotenv');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?:
dotenv.config();
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?:yes
middlewares.setupApp(app);
//--- Explicación: configura la aplicacion express con los middlewares

// -------------------------------------------------------------------------------------

//Usado?:yes
routes.setup(app);
//--- Explicación: configura la aplicion express con las rutas

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
//--- Explicación: crea un middleware que verifica si la palabra ingresada coincide con la palabra secreta.Si lo es,guarda la palabra en la sesion,y si no,redirige con un mensaje de error


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
//--- Explicación: crea la ruta principal "/".Muestra un mensaje de error si hay un "1" y redirige al perfil si la sesion está activa.


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
//--- Explicación: envia la respuesta con un html que contiene un formulario para ingresar la palabra y muestra un mensaje de error si es necesario.


// -------------------------------------------------------------------------------------

//Usado?:yes
const setupAPP = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
  }));
};
//--- Explicación:configura la aplicacion para poder usar bodyparser y express-session

// -------------------------------------------------------------------------------------

//Usado?:yes
app.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: crea la ruta "/profile" que muestra el perfil si la palabra es correcta.Y crea un boton de cerrar la sesion.

// -------------------------------------------------------------------------------------

//Usado?: yes
app.use(bodyParser.urlencoded({ extended: true }));

//--- Explicación: usa el middleware bodyParser  para que todas las solicitudes puedan procesar datos del cuerpo de la solicitud.

// -------------------------------------------------------------------------------------

//Usado?:yes
app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));

//--- Explicación: configura el middleware de sesion,para que no se guarden sesiones que no sean la correcta,ni se pueda modificar.

// -------------------------------------------------------------------------------------

//Usado?: Yes 
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
//--- Explicación: arranca el servidor con el puerto,y mete en consola el mensaje con la dirrecion.

// -------------------------------------------------------------------------------------

//Usado?:yes
const verificarSesionMiddleware = (req, res, next) => {
  if (req.session.palabraSecreta) {
    next();
  } else {
    res.redirect('/?error=2');
  }
};
//--- Explicación: crea una middleware para verificar si la sesion esta activa,y si no lo está,redirige con un mensaje de error.

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
//--- Explicación: crea la ruta "/profile" para mostrar la pagina del perfil.Utiliza el verificarSesionMiddleware.Incluye un boton para cerrar sesion.

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
//--- Explicación: configura la ruta "/logout" para borrar los datos de sesion y volver a la pagina de inicio.

// -------------------------------------------------------------------------------------

//Usado?: Yes 
module.exports = {
  setup,
};
//--- Explicación:exporta la funcion setup del archivo routes,js

// -------------------------------------------------------------------------------------

//Usado?: yes 
module.exports = {
  validarPalabraMiddleware,
  verificarSesionMiddleware,
  setupAPP,
};
//--- Explicación:exporta los middlewares

// -------------------------------------------------------------------------------------

