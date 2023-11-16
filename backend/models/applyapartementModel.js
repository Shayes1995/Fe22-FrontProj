const Application = require('../schemas/applyapartementSchema');
const Apartement = require('../schemas/apartementSchema');
const User = require('../schemas/userSchema');

exports.applyForApartment = async (req, res) => {
  const userId = req.userData.id;
  const { apartementId } = req.body;

  // check if the user exists
  const userExists = await User.findById(userId);
  if (!userExists) {
    res.status(404).json({
      message: 'User not found'
    });
    return;
  }

  // check if the apartment exists
  const apartement = await Apartement.findById(apartementId);
  if (!apartement) {
    res.status(404).json({
      message: 'Apartment not found'
    });
    return;
  }

  try {
    // check if the user has already applied for this apartment
    const existingApplication = await Application.findOne({ user: userId, apartement: apartementId });
    if (existingApplication) {
      res.status(400).json({
        message: 'You have already applied for this apartment'
      });
      return;
    }

    const newApplication = new Application({
      user: userId,
      apartement: apartementId,
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

  // check if the user exists
  const userExists = await User.findById(userId);
  if (!userExists) {
    res.status(404).json({
      message: 'User not found'
    });
    return;
  }

  try {
    // fetch applications for speci. user
    const userApplications = await Application.find({ user: userId }).populate('apartement');

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

exports.getApplicationByIdForUser = async (req, res) => {
  const userId = req.userData.id; 
  const { id: applicationId } = req.params; 

  try {
    const application = await Application.findOne({ _id: applicationId, user: userId }).populate('apartement');

    if (!application) {
      return res.status(404).json({
        message: 'Application not found or you do not have permission to view this application'
      });
    }

    res.status(200).json({
      message: 'Application fetched successfully',
      application: application
    });

  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
      err: err.message
    });
  }
};



exports.deleteOneApplication = async (req, res) => {
  const { id: applicationId } = req.params; 

  try {
    // find the application by ID
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        message: 'Application not found'
      });
    }

    // del the application
    const result = await Application.deleteOne({ _id: applicationId });
    if (result.deletedCount === 0) {
      return res.status(400).json({
        message: 'No application was deleted, please check the application ID'
      });
    }

    res.status(200).json({
      message: 'Application deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred during the deletion process',
      error: err.message
    });
  }
};
