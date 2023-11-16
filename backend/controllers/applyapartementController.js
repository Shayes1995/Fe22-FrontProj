const router = require('express').Router();
const { applyForApartment, getAllApplicationsForUser, deleteOneApplication, getApplicationByIdForUser } = require('../models/applyapartementModel');
const verify = require('../authenticator/auth')


router.post('/apply', verify.verifyJwt, applyForApartment);
router.get('/all-applications', verify.verifyJwt, getAllApplicationsForUser);
router.get('/all-applications/:id', verify.verifyJwt, getApplicationByIdForUser);
router.delete('/delete-application/:id',  deleteOneApplication);


module.exports = router;