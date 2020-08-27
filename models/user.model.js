var mongoose = require('mongoose');

const User = mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String
});

module.exports = mongoose.model('user', User);