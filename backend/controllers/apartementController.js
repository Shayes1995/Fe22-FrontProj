const router = require('express').Router();
const { addApartement, getApartements, getApartementById } = require('../models/apartementModel');

router.post('/add', addApartement);
router.get('/', getApartements);
router.get('/:id', getApartementById);


module.exports = router;