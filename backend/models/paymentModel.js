const Payment = require('../schemas/paymentSchema');
const Application = require('../schemas/applyapartementSchema');
const User = require('../schemas/userSchema');
const Apartement = require('../schemas/apartementSchema');


// POST model for my payment 
exports.postPayment = async (req, res) => {
  const userId = req.userData.id;
  const { applicationId, amount,} = req.body;

  // check to see if the user exists
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User was not found' });
  }

  // cheeck if the application exists for this user
  const application = await Application.findOne({ _id: applicationId, user: userId });
  if (!application) {
    return res.status(404).json({ message: 'This application is not yours' });
  }

  // checking if a there is a payment for this application
  const existingPayment = await Payment.findOne({ application: applicationId });
  if (existingPayment) {
    return res.status(400).json({ message: 'A payment is already payed' });
  }

  try {
    // creating new payment
    const newPayment = new Payment({
      user: userId,
      application: applicationId,
      amount: amount,
    });

    await newPayment.save();

    // deleting all applications for this user
    await Application.deleteMany({ user: userId });

    res.status(201).json({
      message: 'Payment payed successfully',
      paymentId: newPayment._id
    });

  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message
    });
  }
};

