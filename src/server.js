/* Import all required dependencies */
const express   = require('express');
const path      = require('path');
const session   = require('express-session');
const bodyParser= require("body-parser");
const mongoose  = require('mongoose');
const domServer = require('react-dom/server');
const React     = require('react');
global.React    = React;
global.userId   = null;

/* Import Components */
var connection;
if (process.argv.length != 3) {
  console.log('Usage: node server.js $storage [1.mongo;2.file]');
  process.exit();
} else {
  switch (process.argv[2]) {
    case '1':
      connection = 'mongo';
      // import mongo db
      mongoose.Promise = global.Promise;
      mongoose.connect("mongodb://localhost/hCard")
              .then(() => {
                console.log('Connection built');
              })
              .catch((err)=> {
                console.log('Usage: node server.js $storage [1.mongo;2.file]');
                console.log('Connection build failed please make sure mongo server is running');
                console.log('run mongod server on your machine');
                process.exit();
              });
      break;
    case '2':
      connection = 'file';
      break;
    default:
      console.log('Usage: node server.js $storage [1.mongo;2.file]');
      process.exit();
  }
}

/* Define const virables */
const port        = 3000;
const hCard       = require('./public/main.js').default;
const template    = require('./template.js');
const hCardProps  = {
      givenName: 'Sam',
      surname: 'Fairfax',
      email: 'sam.fairfax@fairfaxmedia.com.au',
      phone: '0292822833',
      houseNumber: '100',
      street: 'Harris Street',
      suburb: 'Pyrmont',
      state: 'NSW',
      postcode: '2009',
      country: 'Australia'
};
/* create Server and use session */
var server      = express();
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());
/* initialize session */
server.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
/* serving the static file path */
server.use('/css',express.static(path.join(__dirname,'./public/css')));
server.use('/js',express.static(path.join(__dirname,'./public/')));
server.use('/img',express.static(path.join(__dirname,'./public/img')));

/**
 * Endpoint 1:  /
 * Action: GET
 * Render the react application and return the static html
 */
server.get('/',(req,res) => {
  /* detect session */
  const initProps    = req.session.hCardProps ? req.session.hCardProps : hCardProps;
  const hCardElement = React.createElement(hCard,initProps);
  const body         = domServer.renderToString(hCardElement);
  const title        = 'Live hCard Preview';
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(template(body,title));
});

/**
 * middleware for all post request
 * keep user input into session before push into database or file
 */
server.post('/*',(req,res,next) => {
  /* detect session */
  if(req.is('application/x-www-form-urlencoded')){
    if(req.url == '/submit' || req.url == '/update') {
      var updatedSession = Object.assign({},req.session.hCardProps,req.body);
      req.session.hCardProps = updatedSession;
    }
    next();
  } else {
    const error = {
      type: 'CONTENT-TYPE ERROR',
      message: 'post request should set Content-Type to application/x-www-form-urlencoded'
    }
    res.status(500);
    res.send(error);
  }
});

// loading routes
var submitEndpointAPIRouter = require('./endpoints/mongo/submit');
var updateEndpointAPIRouter = require('./endpoints/mongo/update');
if(connection == 'file') {
  submitEndpointAPIRouter = require('./endpoints/file/submit');
  updateEndpointAPIRouter = require('./endpoints/file/update');
}

/**
 * Endpoint 2:  /submit
 * Action: POST
 * Save user profile object into backend
 */
server.use('/submit',submitEndpointAPIRouter);
/**
 * Endpoint 3:  /update
 * Action: POST
 * Update user profile object into backend
 */
server.use('/update',updateEndpointAPIRouter);

server.listen(port);

console.log(`Serving at http://localhost:${port}`);
