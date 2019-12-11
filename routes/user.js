const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/quiz', userController.getQuiz)

router.get('/next', userController.getNext)

router.post('/antwort', userController.postAntwort);

router.get('/', userController.getWelcome);

module.exports = router;
