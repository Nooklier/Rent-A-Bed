const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json());

/*************************************************************** Security Middleware *************************************************************/

if (!isProduction) {
    app.use(cors());                                                            // enable cors only in development
  }
  
  app.use(                                                                      // helmet helps set a variety of headers to better secure your app
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );

  app.use(                                                                      // Set the _csrf token and create req.csrfToken method
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

/************************************************************************************************************************************************/

const routes = require('./routes');

// ...

app.use(routes);                                                               // Connect all the routes

module.exports = app;                                                          // Always at the bottom of app.js