const express = require('express');
const { registerBoarder, loginBoarder } = require('../controllers/boarderController');

const router = express.Router();

// Route for registering a boarder
router.post('/register', registerBoarder);

// Route for logging in a boarder
router.post('/login', loginBoarder);

module.exports = router;
