const admin = require("firebase-admin");

module.exports = async (req, res, next) => {
  // Get token from header
  const idToken = req.header("Authorization");

  let decodedToken;

  try {
    // Verify token
    decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
  } catch (error) {
    res.status(401).send({ error: error });
  }

  next();
};
