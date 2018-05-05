const express = require('express');
const SubmitEndpointMongoRouter = express.Router();
const Profile = require('../../models/profile');

SubmitEndpointMongoRouter.post('/',function(req,res,next){
  Profile.create(req.body,function(err,profile){
    if(err) return next(err);
    global.userId = profile.id;
    res.redirect('/');
  });
});

module.exports = SubmitEndpointMongoRouter;
