const path = require('path');

const express = require('express');

const userController = require('../controllers/userController');
const isAuth=require('../middleware/is-auth');

const router = express.Router();

router.get('/:user_id',isAuth, userController.getUserById);
router.post('/:user_id', userController.updateUser);
router.delete('/:user_id', userController.deleteUser);
router.get('', userController.getUsers);

module.exports = router;
