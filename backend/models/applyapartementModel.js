const Application = require('../schemas/applyapartementSchema');
const Apartement = require('../schemas/apartementSchema');
const User = require('../schemas/userSchema');

exports.applyForApartment = async (req, res) => {
  const userId = req.userData.id;
  const { apartmentId } = req.body;

  // check if the user exists
  const userExists = await User.findById(userId);
  if (!userExists) {
    res.status(404).json({
      message: 'User not found'
    });
    return;
  }

  // check if the apartment exists
  const apartment = await Apartement.findById(apartmentId);
  if (!apartment) {
    res.status(404).json({
      message: 'Apartment not found'
    });
    return;
  }

  try {
    // check if the user has already applied for this apartment
    const existingApplication = await Application.findOne({ user: userId, apartment: apartmentId });
    if (existingApplication) {
      res.status(400).json({
        message: 'You have already applied for this apartment'
      });
      return;
    }

    const newApplication = new Application({
      user: userId,
      apartment: apartmentId,
      status: 'pending'
    });

    await newApplication.save();

    res.status(201).json({
      message: 'Application submitted successfully'
    });

  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
      err: err.message
    });
  }
}


exports.getAllApplicationsForUser = async (req, res) => {
  const userId = req.userData.id; 

  // Check if the user exists
  const userExists = await User.findById(userId);
  if (!userExists) {
    res.status(404).json({
      message: 'User not found'
    });
    return;
  }

  try {
    // Fetch applications for speci. user
    const userApplications = await Application.find({ user: userId }).populate('apartment'); 

    if (!userApplications || userApplications.length === 0) {
      res.status(404).json({
        message: 'No applications found for this user'
      });
      return;
    }

    res.status(200).json({
      message: 'Applications fetched successfully',
      applications: userApplications
    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
      err: err.message
    });
  }
}
