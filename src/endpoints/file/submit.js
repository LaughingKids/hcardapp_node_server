const express                  = require('express');
const SubmitEndpointFileRouter = express.Router();
const path                     = require('path');

SubmitEndpointFileRouter.post('/',function(req,res,next){
  var fs = require('fs');
  var directory = path.join(__dirname,'../../storage/profile.json');
  var profile = JSON.stringify(req.body);
  fs.writeFile(directory, profile, function(err) {
      if(err) {
          return console.log(err);
      } else {
        console.log("The profile was saved!");
        res.redirect('/');
      }
  });
});

module.exports = SubmitEndpointFileRouter;
