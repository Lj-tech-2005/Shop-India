const express = require('express');
const usercontactrouter = express.Router();
const usercontactController = require('../controllers/usercontactController');

usercontactrouter.post('/message', usercontactController.submitMessage);

module.exports = usercontactrouter;
