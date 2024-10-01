const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  //get the token from the request headers
  const jwtToken = req.headers["authorization"];
  //split the token from the bearer
  const tokenExtract = jwtToken.split(" ")[1];

  try {
    // verify the token using the secret key
    const verifiedToken = jwt.verify(tokenExtract, process.env.SECRET_KEY);

    // attach the payload to the request object
    req.user = verifiedToken;

    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authenticateToken;
