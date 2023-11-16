const router = require('express').Router();

const { postPayment } = require('../models/paymentModel');
const verify = require('../authenticator/auth')

router.post('/pay-now', verify.verifyJwt, postPayment);

module.exports = router;





