const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
config()

const mySecret = process.env.SECRET_KEY;

exports.createJwt = (user) => {
  const token = jwt.sign({ id: user._id, email: user.email }, mySecret, { expiresIn: '1h' });
  return token;
}

exports.verifyJwt = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, mySecret);
    req.userData = decodedToken;
    next();
  }
  catch {
    res.status(401).json({
      message: 'Authentication failed'
    });
  }
}