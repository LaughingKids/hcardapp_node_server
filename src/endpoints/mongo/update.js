const express = require('express');
const UpdateEndpointMongoRouter = express.Router();
const Profile = require('../../models/profile');

UpdateEndpointMongoRouter.post('/',function(req,res,next){
  const userId = global.userId;
  Profile.findByIdAndUpdate(userId,{$set:req.body},function(err,profile){
    if(err) return next(err);
    res.redirect('/');
  });
});

module.exports = UpdateEndpointMongoRouter;
