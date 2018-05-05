const express                  = require('express');
const SubmitEndpointFileRouter = express.Router();
const path                     = require('path');
const fs = require('fs');

SubmitEndpointFileRouter.post('/',function(req,res,next){
  var profile = JSON.parse(JSON.stringify(req.body));
  var directory = path.join(__dirname,'../../storage/profile.json');
  var user = JSON.parse(fs.readFileSync(directory, 'utf8'));
  /* update edited property only */
  var updatedUser = Object.assign({},user,profile);
  var newUser = JSON.stringify(updatedUser);
  fs.writeFile(directory, newUser, function(err) {
      if(err) {
          return console.log(err);
      } else {
        console.log("The file was updated!");
        res.redirect('/');
      }
  });
});

module.exports = SubmitEndpointFileRouter;
