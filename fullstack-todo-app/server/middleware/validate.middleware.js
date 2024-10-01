const validateUser = (req, res, next) => {
  // check if content type is json
  if (req.headers["content-type"] !== "application/json") {
    return res.status(400).json({
      message: "Invalid content type , please use json",
    });
  }

  const { email } = req.body;
  // checking if the email ends with "@gmail.com"
  if (!email || !email.includes("@gmail.com")) {
    return res.status(400).json({
      message: "Email is required , please enter a valid email",
    });
  }

  next();
};

module.exports = validateUser;
