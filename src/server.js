/* Import all required dependencies */
const express   = require('express');
const path      = require('path');
const domServer = require('react-dom/server');
const React     = require('react');
global.React    = React;
/* Import Components */

/* Define const virables */
const port      = 0621;
const hCard     = require('./public/main.js').default;
const template  = require('./template.js');
/* create Server*/
var server      = express();
/* serving the static file path */
server.use('/css',express.static(path.join(__dirname,'./public/css')));
server.use('/js',express.static(path.join(__dirname,'./public/')));
server.use('/img',express.static(path.join(__dirname,'./public/img')));

/**
 * Endpoint 1:  /
 * Action: GET
 * Render the react application and return the static html
 */
server.get('/',(req,res,next) => {
  const hCardElement = React.createElement(hCard);
  const body         = domServer.renderToString(hCardElement);
  const title        = 'Live hCard Preview';
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(template(body,title));
});

server.listen(port);

console.log(`Serving at http://localhost:${port}`);
