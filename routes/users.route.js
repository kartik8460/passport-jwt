var express = require('express');
var router = express.Router();
var userController = require('./../controllers/user.controller');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create-user', userController.createUser);
router.get('/user-details/:email', userController.getUserDetails);
router.post('/login', userController.login)

module.exports = router;
