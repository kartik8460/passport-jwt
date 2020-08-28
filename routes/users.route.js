var express = require('express');
var router = express.Router();
var userController = require('./../controllers/user.controller');
var passportAuthenticationMiddleware = require('./../middleware/passport.middleware')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/create-user', userController.createUser);
router.get('/user-details/:email', passportAuthenticationMiddleware, userController.getUserDetails);
router.post('/login', userController.login)

module.exports = router;
