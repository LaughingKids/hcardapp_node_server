var mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema({
  givenName: {type: String},
  surname: {type: String},
  email: {type: String},
  phone: {type: String},
  houseNumber: {type: String},
  street: {type: String},
  suburb: {type: String},
  state: {type: String},
  postcode: {type: String},
  country: {type: String},
  submitTime : {type: Date, default: Date.now}
});

module.exports = mongoose.model('Profile',ProfileSchema);
