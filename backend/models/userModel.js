const User = require('../schemas/userSchema');
const bcrypt = require('bcryptjs');
const auth = require('../authenticator/auth');

exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password, repeatPassword } = req.body;

  if (password !== repeatPassword) {
    res.status(400).json({
      message: 'Passwords do not match'
    })
    return;
  }
  try {
    const salt = bcrypt.genSaltSync(10);
    const passwordHasher = bcrypt.hashSync(password, salt);

    const newUserRegistration = new User({
      firstName,
      lastName,
      email,
      password: passwordHasher
    });

    await newUserRegistration.save();
    res.status(201).json({
      message: 'User created successfully'
    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
      err: err.message
    });
  }
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Authentication failed. User not found.'
      });
    }

    // check if password matches
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Authentication failed. Wrong password.'
      });
    }



    res.status(200).json({

      message: 'User logged in successfully',
      token: auth.createJwt(user),
      firstName: user.firstName,
      id: user._id

    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
      err: err.message
    });
  }
}
