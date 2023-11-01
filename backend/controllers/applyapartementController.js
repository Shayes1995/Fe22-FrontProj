const router = require('express').Router();
const { applyForApartment, getAllApplicationsForUser } = require('../models/applyapartementModel');
const verify = require('../authenticator/auth')


router.post('/apply', verify.verifyJwt, applyForApartment);
router.get('/all-applications', verify.verifyJwt, getAllApplicationsForUser);



module.exports = router;