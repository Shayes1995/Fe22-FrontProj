const router = require('express').Router();

const { registerUser, loginUser } = require('../models/registerModel');

router.post('/create', registerUser);
router.post('/login', loginUser );

module.exports = router;