const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // searching for the user in the database
    const existingUser = await User.findOne({ email });

    // if the user does not exist return status code 404
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // checking if the password is correct
    const correctPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    // if the password is incorrect return status code 404
    if (!correctPassword) {
      return res.status(404).json({ message: "Invalid password" });
    }

    // creating a JWT token
    const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, {
      algorithm: "HS256",
    });

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occurred on the server while login" });
  }
};

module.exports = login;
