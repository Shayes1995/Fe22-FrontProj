const Payment = require('../schemas/paymentSchema');
const Application = require('../schemas/applyapartementSchema');
const User = require('../schemas/userSchema');
const Apartement = require('../schemas/apartementSchema');
const Resident = require('../schemas/residentSchema');


exports.postPayment = async (req, res) => {
  const userId = req.userData.id;
  const { applicationId, amount } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    const checkPayment = await Payment.findOne({ application: applicationId });
    if (checkPayment) { // If payment already exists
      return res.status(400).json({
        message: 'Payment already exists'
      });

    }

    // Check if the application exists and retrieve the associated apartment
    const application = await Application.findById(applicationId).populate('apartement');
    if (!application) {
      return res.status(404).json({
         message: 'Application not found' 
        });
    }

    // Create and save the new payment
    const newPayment = new Payment({
      application: applicationId,
      user: userId,
      apartement: application.apartement, // Retrieve apartment ID from the application
      amount: amount
    });

    await newPayment.save();

    // create new collection for resident
    const newResident = new Resident({
      user: userId,
      apartement: application.apartement._id,
      payment: newPayment._id
    });

    await newResident.save();


    Application.deleteMany({ user: userId });

    res.status(201).json({
      message: 'Payment created successfully',
      paymentId: newPayment._id,
      residentId: newResident._id
    });

  } catch (err) {
    res.status(500).json({
      message: 'Failed to create payment',
      error: err.message
    });
  }
};



// GET model for fetching payment by ID for a specific user with apartment details

exports.getResident = async (req, res) => {
  const userId = req.userData.id; // Extracted from the token

  try {
    const residents = await Resident.find({ user: userId })
      .populate('user')
      .populate('apartement')
      .populate('payment');

    if (!residents.length) {
      return res.status(404).json({ message: 'No resident found for this user' });
    }

    res.status(200).json({
      message: 'Resident retrieved successfully',
      residents: residents
    });

  } catch (err) {
    res.status(500).json({
      message: 'Failed to retrieve resident',
      error: err.message
    });
  }
};


