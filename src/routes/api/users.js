var express = require('express');
var router = express.Router();
const usersApiController=require('../../controllers/api/userApiController');

/* GET users listing. */
// Lista de usuarios
router.get('/', usersApiController.list);
//Procesar el registro
router.post('/register', usersApiController.create);


module.exports = router;
