const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');
const routes = require('./routes');


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

/*************************************************************** Errors Middleware ***************************************************************/

app.use(routes);                                                               // Connect all the routes

app.use((_req, _res, next) => {                                                // Catch unhandled requests and forward to error handler.
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
  });


app.use((err, _req, _res, next) => {                                           // Process sequelize errors
  
    if (err instanceof ValidationError) {                                      // check if error is a Sequelize error:
      let errors = {};
      for (let error of err.errors) {
        errors[error.path] = error.message;
      }
      err.title = 'Validation error';
      err.errors = errors;
    }
    next(err);
  });

 
app.use((err, _req, res, _next) => {                                           // Error formatter
    res.status(err.status || 500);
    console.error(err);
    res.json({
      title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      stack: isProduction ? null : err.stack
    });
  });

module.exports = app;                                                          // Always at the bottom of app.js
