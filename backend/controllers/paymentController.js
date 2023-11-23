const router = require('express').Router();

const { postPayment, getPayment, getResident } = require('../models/paymentModel');
const verify = require('../authenticator/auth')

router.post('/pay-now', verify.verifyJwt, postPayment);
router.get('/my-payment', verify.verifyJwt, getResident);

module.exports = router;





